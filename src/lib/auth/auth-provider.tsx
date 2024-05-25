import Spinner from "@/components/shared/spinner";
import cookie from "js-cookie";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface IAuthProviderProps {}

interface IAuthContext {
  initialized: boolean;
  session: Session;
}
interface UserData {
  id: string;
  email: string;
  name: string;
  phoneNumber?: string | null; // Optional property
  profileImg?: string | null; // Optional property
}


interface SessionData {
  user: UserData;
  expires: Date;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  const result = useContext(AuthContext);
  if (!result?.initialized) {
    throw new Error("Auth context must be used within a AuthProvider!");
  }
  return result;
}

const publicPageList = ["/login"];

const isPublicPage = (pathname: string) => {
  return publicPageList.includes(pathname);
};

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");
  const [initializedSession, setInitializedSession] = useState<Session | null>(session);

  useEffect(() => {
    if (!loading) {
      const token = cookie.get('token');
      if (token) {
        // 여기서 서버에 토큰 검증 API를 호출하여 세션 데이터를 받아와 설정
        const verifyToken = async () => {
          try {
            const res = await fetch('http://localhost:8000/auth/verify-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
              }
            });
            const data = await res.json();

            if (res.status === 200) {
              
              const sessionData: SessionData = {
                user: {
                  id: data.payload.id,
                  email: data.payload.email,
                  name: data.payload.name,
                  phoneNumber: data.payload.phone_number,
                  profileImg: data.payload.profile_img,
                },
                expires: new Date(data.payload.exp * 1000) // Convert seconds to milliseconds
              };
              
              setInitializedSession(sessionData);
            } else {
              router.push('/login');
            }
          } catch (error) {
            console.error('Token verification failed:', error);
            router.push('/login');
          } finally {
            setLoading(false);
          }
        };

        verifyToken();
      } else {
        router.push('/login');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [loading, router]);

  useEffect(() => {
    if (loading || initializedSession === null) {
      return;
    }

    if (initializedSession && isPublicPage(router.pathname)) {
      router.push("/");
    } else if (!initializedSession && !isPublicPage(router.pathname)) {
      router.push("/login");
    }
  }, [loading, router, initializedSession]);

  if (loading || (initializedSession && isPublicPage(router.pathname))) {
    return <Spinner />;
  }

  if (isPublicPage(router.pathname)) {
    return <>{children}</>;
  }

  if (!initializedSession?.user) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={{ initialized: true, session: initializedSession }}>{children}</AuthContext.Provider>;
};

export default React.memo(AuthProvider);

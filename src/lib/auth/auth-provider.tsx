import Spinner from "@/components/shared/spinner";
import cookie from "js-cookie";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface IAuthProviderProps {}

interface IAuthContext {
  initialized: boolean;
  session: Session | null;
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

const isPublicPage = (pathname: string) => publicPageList.includes(pathname);

const AuthProvider = ({ children }: PropsWithChildren<IAuthProviderProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(status === "loading");
  const [initializedSession, setInitializedSession] = useState<Session | null>(session);

  useEffect(() => {
    const token = cookie.get('token');

    if (token) {
      const verifyToken = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`, {
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
            cookie.remove('token');
            router.push('/login');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          cookie.remove('token');
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
  }, [router]);

  useEffect(() => {
    if (!loading && initializedSession && isPublicPage(router.pathname)) {
      router.push("/");
    } else if (!loading && !initializedSession && !isPublicPage(router.pathname)) {
      router.push("/login");
    }
  }, [loading, router, initializedSession]);

  if (loading || (!initializedSession && !isPublicPage(router.pathname))) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ initialized: true, session: initializedSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default React.memo(AuthProvider);

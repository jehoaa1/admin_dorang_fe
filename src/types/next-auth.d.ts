/* @see https://authjs.dev/getting-started/typescript#extend-default-interface-properties */
/**
 * name, email, image 외에 추가 속성을 정의
 */
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      phoneNumber?: string | null;
      profileImg?: string | null;
    }; 
    expires: Date; // expires 속성을 Date 타입으로 변경
  }
}

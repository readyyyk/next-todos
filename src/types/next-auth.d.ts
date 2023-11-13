import type IUser from '@/types/user';
import {DefaultJWT} from 'next-auth/jwt';


declare module 'next-auth' {
    interface Session {user: IUser}
    interface User extends IUser {}
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {user: IUser}
}

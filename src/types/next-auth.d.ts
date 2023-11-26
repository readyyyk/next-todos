import {DefaultJWT} from 'next-auth/jwt';


declare module 'next-auth' {
    interface Session {
        user: {
            id: number,
            image: string,
            username: string,
            accessToken: string,
            refreshToken: string,
        }
    }
    interface User {
        id: number,
        image: string,
        username: string,
        accessToken: string,
        refreshToken: string,
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {user: {
            id: number,
            image: string,
            username: string,
            accessToken: string,
            refreshToken: string,
        }}
}

// TODO: Type {next-auth.User} must be inherited from IUser
/* eslint-disable @typescript-eslint/ban-ts-comment */

import Credentials from 'next-auth/providers/credentials';
import backendAPI from '@/backendAPI';
import {NextAuthOptions} from 'next-auth';


const options: NextAuthOptions = {
    providers: [
        // eslint-disable-next-line new-cap
        Credentials({
            name: 'credentials',
            credentials: {
                id: {type: 'text'},
            },
            // @ts-ignore
            async authorize(credentials) {
                const {queryFn} = backendAPI.getUser(Number(credentials?.id));
                const res = await queryFn();

                if (res.success) {
                    return res.data;
                } else {
                    console.log(res.error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({token, user}) => {
            // @ts-ignore
            user && (token.user = user);
            return token;
        },
        session: ({session, token}) => {
            session.user = token.user;
            return session;
        },
    },
};

export default options;

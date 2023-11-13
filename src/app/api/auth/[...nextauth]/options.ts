// TODO: Type {next-auth.User} must be inherited from IUser
import Credentials from 'next-auth/providers/credentials';
import backendAPI from '@/backendAPI';
import {NextAuthOptions, User} from 'next-auth';
import {JWT} from 'next-auth/jwt';


const options: NextAuthOptions = {
    providers: [
        // eslint-disable-next-line new-cap
        Credentials({
            name: 'credentials',
            credentials: {
                id: {type: 'text'},
            },
            async authorize(credentials) {
                const res = await backendAPI.getUser(
                    Number(credentials?.id) || 0);

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
        jwt: ({token, user}: {token: JWT, user: User}) => {
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

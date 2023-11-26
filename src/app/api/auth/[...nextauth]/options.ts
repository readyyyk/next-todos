import Credentials from 'next-auth/providers/credentials';
import backendAPI from '@/backendAPI';

import {NextAuthOptions} from 'next-auth';
import {parseJwt} from '@/lib/utils';
import {axiosInst, serverAuthedAxiosInst} from '@/backendAxios';


const options: NextAuthOptions = {
    pages: {
        signIn: '/auth/signin',
        error: '/error',
    },
    providers: [
        // eslint-disable-next-line new-cap
        Credentials({
            name: 'credentials',
            credentials: {
                username: {type: 'text'},
                password: {type: 'text'},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const tokens = await backendAPI.login(credentials, axiosInst);
                if (!tokens.success) throw new Error(tokens.data.detail);

                const authedInstance = await serverAuthedAxiosInst({
                    accessToken: tokens.data.access_token,
                    refreshToken: tokens.data.refresh_token,
                });
                const {queryFn} = backendAPI.getMe(null, authedInstance);
                const res = await queryFn();

                if (res.success) {
                    return {
                        ...res.data,
                        accessToken: tokens.data.access_token,
                        refreshToken: tokens.data.refresh_token,
                    };
                } else {
                    console.error(res.error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
                const parsed = parseJwt(user.accessToken);
                token.user = {
                    image: user.image,
                    username: user.username,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    id: parsed.subject.id,
                };
            }
            return token;
        },
        session: ({session, token}) => {
            session.user = token.user;
            return session;
        },
    },
};

export default options;

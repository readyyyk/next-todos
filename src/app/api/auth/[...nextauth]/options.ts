import Credentials from 'next-auth/providers/credentials';
import backendAPI from '@/backendAPI';

import {NextAuthOptions} from 'next-auth';
import {parseJwt} from '@/lib/utils';
import {axiosInst, serverAuthedAxiosInst} from '@/backendAxios';

import {signupResultSuccessSchema} from '@/types/signUp';


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

                const tokens = await backendAPI.signin(credentials, axiosInst);
                if (!tokens.success) {
                    throw new Error(JSON.stringify(tokens.data.detail));
                }

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
        // eslint-disable-next-line new-cap
        Credentials({
            id: 'signup_auth',
            credentials: {},
            authorize(credentials) {
                if (!credentials || !('data' in credentials)) return null;
                const data =
                    signupResultSuccessSchema.safeParse(
                        JSON.parse(credentials.data as string),
                    );
                if (!data.success) {
                    throw new Error(JSON.stringify(data.error.message));
                }
                return data.success ? {
                    ...data.data,
                    accessToken: data.data.tokens.access_token,
                    refreshToken: data.data.tokens.refresh_token,
                } : null;
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
            token && (session.user = token.user);
            return session;
        },
    },
};

export default options;

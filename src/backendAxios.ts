import axios, {AxiosError, AxiosInstance} from 'axios';
import {getServerSession, User} from 'next-auth';
import backendAPI from '@/backendAPI';
import options from '@/app/api/auth/[...nextauth]/options';


export const axiosInst = axios.create({
    baseURL: process.env.BACKEND_URL,
});

interface Tokens {accessToken: string, refreshToken: string}
interface createAuthedAxiosInstProps {
    (user: User | Tokens): AxiosInstance
}
export const createAuthedAxiosInst:createAuthedAxiosInstProps =
    (user) => {
        const authedAxiosInst = axios.create({
            baseURL: process.env.BACKEND_URL,
        });
        authedAxiosInst.interceptors.request.use((cfg) => {
            if (!cfg.headers.getAuthorization()) {
                cfg.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return cfg;
        });
        authedAxiosInst.interceptors.response.use(
            (response) => response,
            async (error: AxiosError) => {
                if (error.response?.status !== 401 || error.config?.headers.get('IsRepeated')) {
                    return Promise.reject(error);
                }
                console.log('\n\tTrying to update access token');
                const cfg = error.config;
                if (!cfg) throw new Error('Runtime error - No config\n(createAuthedAxiosInst.interceptors.response)');

                const resp = await backendAPI
                    .refreshTokens(user.refreshToken, axiosInst);
                if (!resp.success) {
                    throw Error(resp.data.detail);
                }
                const {
                    access_token: updatedAccessToken,
                    refresh_token: updatedRefreshToken,
                } = resp.data;
                user.accessToken = updatedAccessToken;
                user.refreshToken = updatedRefreshToken;

                cfg.headers.Authorization = `Bearer ${updatedAccessToken}`;
                cfg.headers.IsRepeated = true;
                return authedAxiosInst.request(cfg);
            },
        );
        return authedAxiosInst;
    };

export const serverAuthedAxiosInst = async (tokens?: Tokens) => {
    const session = await getServerSession(options);
    if (!session) {
        if (!tokens) throw new Error('serverAuthedAxiosInst\nEither provide pair of tokens or make sure Session is available');
        return createAuthedAxiosInst(tokens);
    }
    return createAuthedAxiosInst(session.user);
};

import axios, {AxiosError, AxiosInstance} from 'axios';
import {
    ITaskListSafeResult,
    ITaskWithOwnerSafeResult,
    TaskListScheme,
    TaskWithOwnerScheme,
} from '@/types/task';
import {IUserSafeResult, UserScheme} from '@/types/user';
import {
    tokensSchema,
} from '@/types/jwt';
import {
    ISignUpScheme,
    signupResultError,
    signupResultErrorSchema,
    signupResultSuccess,
    signupResultSuccessSchema,
} from '@/types/signUp';
import {
    SignIn,
    signinResultError,
    signinResultErrorSchema,
    signinResultSuccess,
} from '@/types/signIn';


interface cachedApiRouteResult<B> {
    queryFn(this: void): Promise<B>,
    queryKey: string,
}
interface cachedApiRoute<A, B> {
    (cacheKey: A, instance: AxiosInstance): cachedApiRouteResult<B>
}
interface IBackendAPI {
    signin(data: SignIn, instance: AxiosInstance):
        Promise<signinResultError | signinResultSuccess>,
    signup(data: ISignUpScheme, instance: AxiosInstance):
        Promise<signupResultError | signupResultSuccess>,
    refreshTokens(refreshToken: string, instance: AxiosInstance):
        Promise<signinResultError | signinResultSuccess>,
    getTodos: cachedApiRoute<number, ITaskListSafeResult>,
    getMe: cachedApiRoute<null, IUserSafeResult>,
    getUser: cachedApiRoute<number, IUserSafeResult>,
    getTodoWithOwner: cachedApiRoute<number, ITaskWithOwnerSafeResult>,
}

const backendAPI: IBackendAPI = {
    async signin(data: { username: string, password: string }, instance) {
        try {
            const a = await instance.post('/auth/login', data);
            return {
                data: tokensSchema.parse(a.data),
                success: true,
            };
        } catch (e) {
            if (!axios.isAxiosError(e)) {
                console.error(e);
                throw e;
                // throw new Error('Runtime error (backendAPI.login)');
            }
            const err = e as AxiosError;
            return {
                data: signinResultErrorSchema.parse(err.response).data,
                success: false,
            };
        }
    },
    async signup(data, instance) {
        try {
            const a = await instance.post('/users/create', data);
            return {
                data: signupResultSuccessSchema.parse(a.data),
                success: true,
            };
        } catch (e) {
            if (!axios.isAxiosError(e)) {
                console.error(e);
                throw new Error('Runtime error (backendAPI.signup)');
            }
            const err = e as AxiosError;
            return {
                data: signupResultErrorSchema.parse(err.response).data,
                success: false,
            };
        }
    },

    async refreshTokens(token, instance) {
        try {
            const a = await instance.post('/auth/refresh-tokens',
                {}, {headers: {'Authorization': `Bearer ${token}`}});
            return {
                data: tokensSchema.parse(a.data),
                success: true,
            };
        } catch (e) {
            if (!axios.isAxiosError(e)) {
                console.error(e);
                throw new Error('Runtime error (backendAPI.refreshTokens)');
            }
            const err = e as AxiosError;
            return {
                ...signinResultErrorSchema.parse(err.response?.data),
                success: false,
            };
        }
    },
    /*
    async signup(data: {username: string}) {
        return this.axios.post('/auth/signup', {data});
    },
    */

    getTodos(userId, instance) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get('/todos/my');
                return TaskListScheme.safeParse(res?.data);
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return TaskListScheme.safeParse(null);
            }
        };
        const queryKey = `todo-array-${userId}`;
        return {
            queryFn,
            queryKey,
        };
    },
    getMe(_, instance) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get('/users/me');
                return UserScheme.safeParse(res?.data);
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return UserScheme.safeParse(null);
            }
        };
        const queryKey = `user-me`;
        return {
            queryFn,
            queryKey,
        };
    },
    getUser(userId, instance) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get('/users/'+userId);
                return UserScheme.safeParse(res?.data);
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return UserScheme.safeParse(null);
            }
        };
        const queryKey = `user-${userId}`;
        return {
            queryFn,
            queryKey,
        };
    },
    getTodoWithOwner(todoId, instance) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get(`/todos/${todoId}/with-owner`);
                return TaskWithOwnerScheme.safeParse(res?.data);
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return TaskWithOwnerScheme.safeParse(null);
            }
        };
        const queryKey = `todo-with-owner-${todoId}`;
        return {
            queryFn,
            queryKey,
        };
    },
};

export default backendAPI;

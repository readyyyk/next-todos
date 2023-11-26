import axios, {AxiosError, AxiosInstance} from 'axios';
import {
    ITaskListSafeResult,
    ITaskWithOwnerSafeResult,
    TaskListScheme,
    TaskWithOwnerScheme,
} from '@/types/task';
import {IUserSafeResult, UserScheme} from '@/types/user';
import {
    loginResultError,
    loginResultErrorSchema,
    loginResultSuccess,
    loginResultSuccessSchema,
} from '@/types/jwt';


interface cachedApiRouteResult<B> {
    queryFn(this: void): Promise<B>,
    queryKey: string,
}
interface cachedApiRoute<A, B> {
    (cacheKey: A, instance: AxiosInstance): cachedApiRouteResult<B>
}
interface IBackendAPI {
    login(data: { username:string, password:string }, instance: AxiosInstance):
        Promise<loginResultError | loginResultSuccess>,
    refreshTokens(refreshToken: string, instance: AxiosInstance):
        Promise<loginResultError | loginResultSuccess>,
    // signup(data: { username: string, password: string }): unknown,
    getTodos: cachedApiRoute<number, ITaskListSafeResult>,
    getMe: cachedApiRoute<null, IUserSafeResult>,
    getUser: cachedApiRoute<number, IUserSafeResult>,
    getTodoWithOwner: cachedApiRoute<number, ITaskWithOwnerSafeResult>,
}

const backendAPI: IBackendAPI = {
    async login(data: { username: string, password: string }, instance) {
        try {
            const a = await instance.post('/auth/login', data);
            return {
                data: loginResultSuccessSchema.parse(a.data),
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
                data: loginResultErrorSchema.parse(err.response).data,
                success: false,
            };
        }
    },

    async refreshTokens(token, instance) {
        try {
            const a = await instance.post('/auth/refresh-tokens',
                {}, {headers: {'Authorization': `Bearer ${token}`}});
            return {
                data: loginResultSuccessSchema.parse(a.data),
                success: true,
            };
        } catch (e) {
            if (!axios.isAxiosError(e)) {
                console.error(e);
                throw new Error('Runtime error (backendAPI.refreshTokens)');
            }
            const err = e as AxiosError;
            return {
                ...loginResultErrorSchema.parse(err.response?.data),
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

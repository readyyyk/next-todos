import axios, {AxiosError, AxiosInstance} from 'axios';
import {
    ITaskCreateScheme,
    ITaskListSafeResult,
    ITaskSchemeSafeResult,
    ITaskWithOwnerSafeResult,
    TaskListScheme, TaskScheme,
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
import {errorSchema} from '@/types/error';


// TODO: only query function requires instance, but wrapper only keyed value
interface cachedApiRouteResult<B> {
    queryFn(this: void): Promise<B>,
    queryKey: string[],
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
    getTasksByUser: cachedApiRoute<number, ITaskListSafeResult>,
    getMe: cachedApiRoute<null, IUserSafeResult>,
    getUser: cachedApiRoute<number, IUserSafeResult>,
    getTaskWithOwner: cachedApiRoute<number, ITaskWithOwnerSafeResult>,

    createTask(data:ITaskCreateScheme, instance:AxiosInstance):
        Promise<ITaskSchemeSafeResult>,

    deleteTask(id: number, instance:AxiosInstance):
        Promise<{success: true} | {success: false, detail: string}>,
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

    getTasksByUser(userId, instance) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get('/todos/my');
                return TaskListScheme.safeParse(res?.data);
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return TaskListScheme.safeParse(null);
            }
        };
        const queryKey = [`todo-array-${userId}`];
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
        const queryKey = [`user-me`];
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
        const queryKey = [`user-${userId}`];
        return {
            queryFn,
            queryKey,
        };
    },

    getTaskWithOwner(todoId, instance) {
        const queryKey = [`todo-with-owner-${todoId}`, `todo-${todoId}`];
        const queryFn = async ()=> {
            try {
                const res = await instance.get(`/todos/${todoId}/with-owner`);
                const result = TaskWithOwnerScheme.safeParse(res?.data);
                result.success && queryKey.push(`user-${result.data.owner_id}`);
                return result;
            } catch (e) {
                console.error('\n --[X]--: ', String(e));
                return TaskWithOwnerScheme.safeParse(null);
            }
        };
        return {
            queryFn,
            queryKey,
        };
    },

    async createTask(data, instance) {
        try {
            const res = await instance.post(`/todos/create`, data);
            return TaskScheme.safeParse(res?.data);
        } catch (e) {
            console.error('\n --[X]--: ', String(e));
            return TaskWithOwnerScheme.safeParse(null);
        }
    },
    async deleteTask(id, instance) {
        try {
            console.log(instance);
            await instance.delete(`/todos/${id}/delete`);
            return {success: true};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const err = e as AxiosError;
                return {
                    detail: errorSchema.parse(err.response?.data).detail,
                    success: false,
                };
            }
            console.error('\n --[X]--: ', String(e));
            return {success: false, detail: String(e)};
        }
    },
};

export default backendAPI;

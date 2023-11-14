import axios from 'axios';
import {
    ITaskListSafeResult,
    ITaskWithOwnerSafeResult,
    TaskListScheme,
    TaskWithOwnerScheme,
} from '@/types/task';
import {IUserSafeResult, UserScheme} from '@/types/user';


const instance = axios.create({
    baseURL: process.env.BACKEND_URL, //  as string,
});


interface cachedApiResult<B> {
    queryFn(this: void): Promise<B>,
    queryKey: string,
}
interface cachedApiRoute<A, B> {
    (cacheKey: A): cachedApiResult<B>
}
interface IBackendAPI {
    // signin(data: { username: string, password: string }): unknown,
    // signup(data: { username: string, password: string }): unknown,
    getTodos: cachedApiRoute<number, ITaskListSafeResult>,
    getUser: cachedApiRoute<number, IUserSafeResult>,
    getTodoWithOwner: cachedApiRoute<number, ITaskWithOwnerSafeResult>,
}

const backendAPI: IBackendAPI = {
    /*
    async signup(data: { username: string, password: string }) {
        return this.axios.post('/auth/signin', {data});
    },
    async signup(data: {username: string}) {
        return this.axios.post('/auth/signup', {data});
    },
    */

    getTodos(userId) {
        const queryFn = async ()=> {
            try {
                const res = await instance.get('/todos/by-owner/' + userId);
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
    getUser(userId) {
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
    getTodoWithOwner(todoId) {
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

import axios from 'axios';
import {TaskListScheme, TaskWithOwnerScheme} from '@/types/task';
import {UserScheme} from '@/types/user';


const instance = axios.create({
    baseURL: process.env.BACKEND_URL as string,
});


const backendAPI = {
    axios: instance,

    async signin(data: { username: string, password: string }) {
        return this.axios.get('/auth/signin', {data});
    },
    async signup(data: {username: string}) {
        return this.axios.get('/auth/signup', {data});
    },
    async getTodos(userId: number) {
        try {
            const res = await this.axios.get('/todos/by-owner/'+userId);
            return TaskListScheme.safeParse(res?.data);
        } catch (e) {
            console.error('\n --[X]--: ', String(e));
            return TaskListScheme.safeParse(null);
        }
    },
    async getUser(userId: number) {
        try {
            const res = await this.axios.get('/users/'+userId);
            return UserScheme.safeParse(res?.data);
        } catch (e) {
            console.error('\n --[X]--: ', String(e));
            return UserScheme.safeParse(null);
        }
    },
    async getTodoWithOwner(todoId: number) {
        try {
            const res = await this.axios.get(`/todos/${todoId}/with-owner`);
            return TaskWithOwnerScheme.safeParse(res?.data);
        } catch (e) {
            console.error('\n --[X]--: ', String(e));
            return TaskWithOwnerScheme.safeParse(null);
        }
    },
};


export default backendAPI;

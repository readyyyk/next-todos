import {z} from 'zod';


export default z
    .object({
        username: z.string().min(3, {message: 'Username must be atleast 3 characters'}),
        password: z.string().min(6, {message: 'Password must be atleast 6 characters'}),
    });

import {z} from 'zod';


export default z
    .object({
        username: z.string().min(3, {message: 'Username must be atleast 3 characters'}),
        password: z.string().min(6, {message: 'Password must be atleast 6 characters'}),
        confirmPassword: z.string().min(1, {message: 'Confirm Password is required'}),
        firstName: z.string().min(1, {message: 'Firstname is required'}),
        lastName: z.string().min(1, {message: 'Lastname is required'}),
        image: z.string().url({message: 'Image should be passed as url'}).optional(),
    })
    .refine((data) => {
        return data.password === data.confirmPassword;
    }, {
        path: ['confirmPassword'],
        message: 'Passwords don\'t match',
    });

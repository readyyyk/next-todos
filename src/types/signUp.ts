import {z} from 'zod';
import {tokensSchema} from '@/types/jwt';
import {UserScheme} from '@/types/user';


const signUpScheme = z
    .object({
        username: z.string().min(3, {message: 'Username must be atleast 3 characters'}),
        password: z.string().min(6, {message: 'Password must be atleast 6 characters'}),
        confirmPassword: z.string().min(1, {message: 'Confirm Password is required'}),
        firstname: z.string().trim().min(1, {message: 'Firstname is required'}),
        lastname: z.string().trim().min(1, {message: 'Lastname is required'}),
        image: z.string().url({message: 'Image should be passed as url'}).optional(),
    })
    .refine((data) => {
        return data.password === data.confirmPassword;
    }, {
        path: ['confirmPassword'],
        message: 'Passwords don\'t match',
    });

export const signupResultSuccessSchema = UserScheme.extend({
    tokens: tokensSchema,
});
interface signupResultSuccess {
    data: z.infer<typeof signupResultSuccessSchema>
    success: true,
}

export const signupResultErrorSchema = z.object({
    data: z.object({
        detail: z.string(),
    }),
});
interface signupResultError extends z.infer<typeof signupResultErrorSchema> {
    success: false,
}

export {
    type signupResultError,
    type signupResultSuccess,
};
export type ISignUpScheme = z.infer<typeof signUpScheme>;
export default signUpScheme;

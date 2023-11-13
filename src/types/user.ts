import {z} from 'zod';


export const UserScheme = z.object({
    id: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    image: z.string().url(),
});

type User = z.infer<typeof UserScheme>;

export default User;

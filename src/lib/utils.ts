import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {jwtPayloadSchema} from '@/types/jwt';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const parseJwt = (token: string) => {
    return jwtPayloadSchema.parse(
        JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()),
    );
};

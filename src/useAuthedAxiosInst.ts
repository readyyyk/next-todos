'use client';

import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {AxiosInstance} from 'axios';
import {createAuthedAxiosInst} from '@/backendAxios';


export const useAuthedAxiosInst = () => {
    const {data: session} = useSession();

    const [inst, setInst] = useState<null | AxiosInstance>(null);

    useEffect(()=>{
        if (session) {
            setInst(createAuthedAxiosInst(session.user));
        }
    }, [session]);
    return inst;
};

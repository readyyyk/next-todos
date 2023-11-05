'use client';

import {FC, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {twMerge} from 'tailwind-merge';


interface Props {
    isDone: boolean
    className?: string
}

const ActionsBar:FC<Props> = ({isDone, className}) => {
    const [value, setValue] = useState(isDone ? 'Done' : 'Active');
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className={twMerge(value==='Done' ? 'bg-green-300 dark:bg-green-800' : 'bg-blue-300 dark:bg-blue-800', className)}>
                <Button variant="outline">{value}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel> State </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={value} onValueChange={setValue} className={'flex flex-col gap-1'}>
                    <DropdownMenuRadioItem value="Done" className={'bg-green-300 dark:bg-green-800'}> Done </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Active" className={'bg-blue-300 dark:bg-blue-800'}> Active </DropdownMenuRadioItem>
                    {/* <DropdownMenuRadioItem value="passive"> Passive </DropdownMenuRadioItem>*/}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsBar;

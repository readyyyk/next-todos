'use client';

import {FC, SetStateAction, Dispatch} from 'react';
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
import {TaskState} from '@/types/task';


interface Props {
    selectedState: TaskState
    setSelectedState: Dispatch<SetStateAction<TaskState>>,
    className?: string
}

const variants = {
    [TaskState.DONE]: 'bg-green-300 dark:bg-green-800',
    [TaskState.ACTIVE]: 'bg-blue-300 dark:bg-blue-800',
    [TaskState.PASSIVE]: 'bg-gray-300 dark:bg-gray-800',
    [TaskState.IMPORTANT]: 'bg-yellow-300 dark:bg-yellow-800',
};

const ActionsBar:FC<Props> = ({selectedState, setSelectedState, className}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={twMerge(variants[selectedState], className)}
                asChild
            >
                <Button variant="outline">{selectedState}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenuLabel> State </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={selectedState}
                    onValueChange={(v) => setSelectedState(v as TaskState)}
                    className={'flex flex-col gap-1'}
                >
                    {
                        Object.values(TaskState).map((state) => (
                            <DropdownMenuRadioItem
                                key={`set-state-${state}`}
                                value={state}
                                className={variants[state]}
                            >
                                {state}
                            </DropdownMenuRadioItem>
                        ))
                    }
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionsBar;

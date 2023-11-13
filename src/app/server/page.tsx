import {FC} from 'react';
import {redirect} from 'next/navigation';

interface Props {}

const Temp:FC<Props> = ({}) => {
    redirect('/');
    return (<> </>);
};

export default Temp;

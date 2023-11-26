'use client';

import {FC} from 'react';
import Image, {ImageProps} from 'next/image';


interface LoaderParams {
    src: string,
    width: number,
    quality?: number,
}

const imageLoader = ({src, width}:LoaderParams) => {
    return src+`&size=${width}`;
};

const ClientImage:FC<ImageProps> = (props) => {
    return <Image
        loader={imageLoader}
        {...props}
        alt={'avatar' || props.alt}
    />;
};

export default ClientImage;

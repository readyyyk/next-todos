'use client';

import {FC} from 'react';
import Image, {ImageProps} from 'next/image';


interface LoaderParams {
    src: string,
    width?: number,
    quality?: number,
}

const imageLoader = ({src}:LoaderParams) => {
    return src;
};

const ClientImage:FC<ImageProps> = (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image
        loader={imageLoader}
        {...props}
    />;
};

export default ClientImage;

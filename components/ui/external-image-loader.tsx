import Image, { ImageLoader, ImageLoaderProps, ImageProps } from "next/image";

// type ImageLoaderProps = {
//   src: string;
//   width: number;
//   height: number;
//   quality: number;
//   alt: string;
// };

const myLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const loaderUrl = `https://res.cloudinary.com/hajiudin/image/fetch/w_${width},q_${
    quality || 75
  }/${src}`;
  return loaderUrl;
};
const ExternalImageLoader = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      loader={myLoader}
      {...props}
      // width={props.width}
      // height={props.height}
    />
  );
};

export default ExternalImageLoader;

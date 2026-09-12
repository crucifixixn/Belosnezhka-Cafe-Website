import React from "react";

export interface ImageAsset {
    src: string;
    webp?: string;
    avif?: string;
    width?: number;
    height?: number;
    aspectRatio?: string;
}

export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
    image?: ImageAsset | string;
    src?: string;
    avifSrc?: string;
    webpSrc?: string;
    srcSetAvif?: string;
    srcSetWebp?: string;
    srcSetJpg?: string;
    sizes?: string;
    aspectRatio?: string;
    wrapperClassName?: string;
    wrapperStyle?: React.CSSProperties;
    fetchPriority?: "high" | "low" | "auto";
}

export default function ResponsiveImage({
    image,
    src: explicitSrc,
    avifSrc,
    webpSrc,
    srcSetAvif,
    srcSetWebp,
    srcSetJpg,
    sizes,
    alt = "",
    width: explicitWidth,
    height: explicitHeight,
    aspectRatio: explicitAspectRatio,
    className = "",
    style,
    loading = "lazy",
    decoding = "async",
    fetchPriority,
    wrapperClassName,
    wrapperStyle,
    ...props
}: ResponsiveImageProps) {
    const isObj = image && typeof image === "object";
    const src = explicitSrc || (isObj ? image.src : (image as string | undefined)) || "";
    const avif = avifSrc || (isObj ? image.avif : undefined);
    const webp = webpSrc || (isObj ? image.webp : undefined);
    const width = explicitWidth || (isObj ? image.width : undefined);
    const height = explicitHeight || (isObj ? image.height : undefined);
    const aspectRatio = explicitAspectRatio || (isObj ? image.aspectRatio : undefined);

    const imgStyle: React.CSSProperties = {
        ...style,
        ...(aspectRatio ? { aspectRatio } : {}),
    };

    return (
        <picture className={wrapperClassName} style={wrapperStyle}>
            {/* AVIF Source */}
            {(srcSetAvif || avif) && (
                <source
                    type="image/avif"
                    srcSet={srcSetAvif || avif}
                    sizes={sizes}
                />
            )}
            {/* WebP Source */}
            {(srcSetWebp || webp) && (
                <source
                    type="image/webp"
                    srcSet={srcSetWebp || webp}
                    sizes={sizes}
                />
            )}
            {/* Fallback Image */}
            <img
                src={src}
                srcSet={srcSetJpg}
                sizes={sizes}
                alt={alt}
                width={width}
                height={height}
                loading={loading}
                decoding={decoding}
                // @ts-expect-error React 18/19 fetchpriority attribute
                fetchpriority={fetchPriority}
                className={className}
                style={imgStyle}
                {...props}
            />
        </picture>
    );
}

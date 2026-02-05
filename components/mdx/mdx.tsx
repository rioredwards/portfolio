import { ImageOverlay } from "@/components/image-overlay/image-overlay";
import { LightboxGallery } from "@/components/lightbox-image/lightbox-gallery";
import { LightboxImage } from "@/components/lightbox-image/lightbox-image";
import { LightboxVideo } from "@/components/lightbox-image/lightbox-video";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import React, { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import { HeadingLink } from "./mdx-heading-link";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/\&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove non-word characters except -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children?: React.ReactNode }) => {
    const slug = slugify(children?.toString() ?? "");
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
      <Tag id={slug} className="group relative scroll-mt-24">
        <HeadingLink slug={slug}>{children}</HeadingLink>
      </Tag>
    );
  };
  HeadingComponent.displayName = `Heading${level}`;
  return HeadingComponent;
}

function Code({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  const codeString = children?.toString() ?? "";
  // Only highlight if it looks like code (has some content)
  if (!codeString.trim()) {
    return <code {...props}>{children}</code>;
  }
  const codeHTML = highlight(codeString);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function CustomLink({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  // Handle anchor links
  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  // Handle internal links (starting with /)
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  // External links
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function RoundedImage(props: ImageProps) {
  const { alt, ...rest } = props;
  return (
    <Image className={cn("rounded-lg", props.className)} alt={alt} {...rest} />
  );
}

interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function Blockquote({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic">
      {children}
    </blockquote>
  );
}

function Hr() {
  return <hr className="my-8 border-border" />;
}

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
}

export function Figure({ src, alt, caption, credit, creditUrl }: FigureProps) {
  return (
    <figure className="my-6 w-full">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full rounded-lg"
      />
      {(caption || credit) && (
        <figcaption className="mt-2 w-full text-center text-sm text-muted-foreground">
          {caption}
          {caption && credit && " — "}
          {credit &&
            (creditUrl ? (
              <a
                href={creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {credit}
              </a>
            ) : (
              credit
            ))}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  code: Code,
  Image: RoundedImage,
  img: RoundedImage as typeof Image,
  Table,
  blockquote: Blockquote,
  hr: Hr,
  Figure,
  LightboxImage,
  LightboxGallery,
  ImageOverlay,
  LightboxVideo,
};

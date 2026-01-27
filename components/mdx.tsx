import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";
import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const HeadingComponent = ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    const slug = slugify(children?.toString() ?? "");
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
      <Tag id={slug} className="group scroll-mt-24">
        <a
          href={`#${slug}`}
          className="anchor absolute -ml-6 opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
        >
          #
        </a>
        {children}
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
  return <Image className={cn("rounded-lg", props.className)} {...props} />;
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
    <blockquote className="border-primary border-l-4 pl-4 italic">
      {children}
    </blockquote>
  );
}

function Hr() {
  return <hr className="border-border my-8" />;
}

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
}

function Figure({ src, alt, caption, credit, creditUrl }: FigureProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="rounded-lg"
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
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
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...mdxComponents, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
        ...props.options,
      }}
    />
  );
}

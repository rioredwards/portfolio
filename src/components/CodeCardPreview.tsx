import ContentfulImage from '@/lib/contentful-image';

interface CodeCardPreviewProps {
  title: string;
  gifUrl: string;
  pngStr: string;
}

const CodeCardPreview: React.FC<CodeCardPreviewProps> = async ({ title, gifUrl, pngStr }) => {
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none border">
      <ContentfulImage
        width={400}
        height={260}
        alt={title}
        className="block group-hover:hidden z-10 inset-0 object-cover w-full h-full"
        src={gifUrl}
      />
      <ContentfulImage
        width={10}
        height={10}
        alt={title}
        className="hidden group-hover:block blur-sm inset-0 object-cover w-[101%] h-[101%]"
        src={pngStr}
      />
    </div>
  );
};

export default CodeCardPreview;

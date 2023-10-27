import ContentfulImage from '@/lib/contentful-image';

interface CodeCardPreviewProps {
  title: string;
  gifUrl: string;
}

const CodeCardPreview: React.FC<CodeCardPreviewProps> = async ({ title, gifUrl }) => {
  return (
    <div className="w-full h-full overflow-hidden pointer-events-none border">
      <ContentfulImage
        width={400}
        height={260}
        alt={title}
        className="block z-10 inset-0 object-cover w-full h-full"
        src={gifUrl}
      />
    </div>
  );
};

export default CodeCardPreview;

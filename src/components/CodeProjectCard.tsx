import ContentfulImage from '@/lib/contentful-image';

interface CodeProjectCardProps {
  title: string;
  preview: {
    url: string;
    title: string;
  };
  tags: string[];
}

const CodeProjectCard: React.FC<CodeProjectCardProps> = ({ title, preview, tags }) => {
  return (
    <section>
      <h3 className="text-lg font-bold">{title}</h3>
      <ContentfulImage
        alt={preview.title}
        className="object-cover h-full rounded-s-sm"
        height={480}
        width={480}
        src={preview.url}
      />
      <ul className="list-disc">
        {tags.map((tag, idx) => (
          <li key={idx}>{tag}</li>
        ))}
      </ul>
    </section>
  );
};

export default CodeProjectCard;

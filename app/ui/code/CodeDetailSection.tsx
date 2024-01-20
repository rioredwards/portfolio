import { RichTextContent } from '@/lib/api';
import { Markdown } from '@/lib/markdown';

interface Props {
  name: string;
  content: RichTextContent;
}

const CodeDetailSection: React.FC<Props> = ({ name, content }) => {
  return (
    <div>
      <h2>{name}</h2>
      <Markdown content={content} />
    </div>
  );
};

export default CodeDetailSection;

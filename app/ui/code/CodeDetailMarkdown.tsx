import { RichTextContent } from '@/lib/api';
import { Markdown } from '@/ui/code/Markdown';

interface Props {
  name?: string;
  content: RichTextContent;
}

const CodeDetailMarkdown: React.FC<Props> = ({ name, content }) => {
  return (
    <div>
      {name && (
        <div className="flex justify-center mb-2 mt-4">
          <h2 className="font-bold text-2xl text-gray-600 mb-1">{name}</h2>
        </div>
      )}
      <Markdown content={content} />
    </div>
  );
};

export default CodeDetailMarkdown;

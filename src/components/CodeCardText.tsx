import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface Props {
  title: string;
  bodyText: Document;
  tags: string[];
}

function scaleFontSizeToFit(text: string) {
  if (text.length < 24) return 'text-2xl';
  if (text.length < 32) return 'text-xl';
  if (text.length < 40) return 'text-lg';
  if (text.length < 48) return 'text-base';
}

const CodeCardText: React.FC<Props> = ({ title, bodyText, tags }) => {
  const titleFontSize = scaleFontSizeToFit(title);

  return (
    <div className="hidden group-hover:flex z-30 flex-col items-center justify-between p-2 md:p-4 text-white absolute w-full h-full">
      <div className="h-16 w-full">
        <h1 className={titleFontSize}>
          <a className="block no-underline font-extrabold text-center" href="#">
            {title}
          </a>
        </h1>
        <div className="h-[1px] w-full mt-2 bg-white" />
      </div>
      <div className="text-lg text-center">{documentToReactComponents(bodyText)}</div>
      <div className="flex w-3/4 mt-4 items-center justify-center flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-sm font-semibold text-gray-200 bg-gray-700 mx-3 px-3 py-1 mt-2 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CodeCardText;

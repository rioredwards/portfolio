import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { getCodeBlockContent } from '@/lib/api';
import cssStyles from '@/ui/code/Markdown.module.css';
import { draftMode } from 'next/headers';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Asset, RichTextContent } from '@/lib/dataTypes';

const EmbeddedImage = ({ id, assets }: { id: string; assets: Asset[] | undefined }) => {
  if (!assets) throw new Error('embedded-asset-block in markdown has no assets');

  const image = assets?.find((asset) => asset.sys.id === id);

  if (image?.url) {
    return (
      <Image src={image.url} alt={image.title} width={800} height={800} className="rounded-md" />
    );
  }

  return null;
};

const EmbeddedCodeBlock = async ({ id }: { id: string }) => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeBlockContent(draftModeIsEnabled, id);

  // has newLines
  const hasNewLines = codeCardsContent?.content?.includes('\n');

  if (codeCardsContent?.content) {
    return (
      <div className={cssStyles.embeddedCodeBlock}>
        <SyntaxHighlighter
          language={codeCardsContent.language}
          style={vs}
          showLineNumbers={hasNewLines}
          lineNumberStyle={{ color: '#9CA3AF' }}
        >
          {codeCardsContent.content}
        </SyntaxHighlighter>
      </div>
    );
  }

  return null;
};

export function Markdown({ content }: { content: RichTextContent }) {
  return (
    <div className={cssStyles.markdown}>
      {documentToReactComponents(content.json as any, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
            <EmbeddedImage id={node.data.target.sys.id} assets={content.links?.assets?.block} />
          ),
          [BLOCKS.EMBEDDED_ENTRY]: (node: any) => (
            <EmbeddedCodeBlock id={node.data.target.sys.id} />
          ),
        },
      })}
    </div>
  );
}

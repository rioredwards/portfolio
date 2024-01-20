import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Asset, RichTextContent, getCodeBlockContent } from '@/lib/api';
import cssStyles from '@/ui/code/Markdown.module.css';
import { draftMode } from 'next/headers';

const EmbeddedImage = ({ id, assets }: { id: string; assets: Asset[] | undefined }) => {
  if (!assets) throw new Error('embedded-asset-block in markdown has no assets');

  const image = assets?.find((asset) => asset.sys.id === id);

  if (image?.url) {
    return <Image src={image.url} alt={image.title} width={800} height={800} />;
  }

  return null;
};

const EmbeddedCodeBlock = async ({ id }: { id: string }) => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeBlockContent(draftModeIsEnabled, id);

  if (codeCardsContent?.content) {
    return (
      <div className={cssStyles.embeddedCodeBlock}>
        <code>
          <pre>{`${codeCardsContent.content}`}</pre>
        </code>
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

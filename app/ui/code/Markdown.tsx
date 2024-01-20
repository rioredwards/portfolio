import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Asset, RichTextContent } from '../../lib/api';
import cssStyles from '@/ui/code/Markdown.module.css';

function RichTextAsset({ id, assets }: { id: string; assets: Asset[] | undefined }) {
  if (!assets) throw new Error('embedded-asset-block in markdown has no assets');

  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} alt={asset.title} width={800} height={800} />;
  }

  return null;
}

export function Markdown({ content }: { content: RichTextContent }) {
  return (
    <div className={cssStyles.markdown}>
      {documentToReactComponents(content.json as any, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
            <RichTextAsset id={node.data.target.sys.id} assets={content.links?.assets?.block} />
          ),
        },
      })}
    </div>
  );
}

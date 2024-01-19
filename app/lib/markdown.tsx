import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Asset, RichTextContent } from './api';

function RichTextAsset({ id, assets }: { id: string; assets: Asset[] | undefined }) {
  if (!assets) throw new Error('embedded-asset-block in markdown has no assets');

  const asset = assets?.find((asset) => asset.sys.id === id);

  if (asset?.url) {
    return <Image src={asset.url} layout="fill" alt={asset.title} />;
  }

  return null;
}

export function Markdown({ content }: { content: RichTextContent }) {
  return documentToReactComponents(content.json as any, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <RichTextAsset id={node.data.target.sys.id} assets={content.links?.assets?.block} />
      ),
    },
  });
}

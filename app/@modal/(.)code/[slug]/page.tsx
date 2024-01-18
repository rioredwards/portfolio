import { Modal } from './modal';

export default function CodeModal({
  params: { slug: codeCardSlug },
}: {
  params: { slug: string };
}) {
  return <Modal>{codeCardSlug}</Modal>;
}

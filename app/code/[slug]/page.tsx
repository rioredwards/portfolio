import { draftMode } from 'next/headers';
import { getCodeDetailContent } from '@/lib/api';
import CodeDetail from '@/ui/code/CodeDetail';

export default async function CodeModal({
  params: { slug: codeCardSlug },
}: {
  params: { slug: string };
}) {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeDetailContent(draftModeIsEnabled, codeCardSlug);

  return (
    <div className="mt-24 px-4 w-full lg:w-4/5 mx-auto">
      <CodeDetail content={codeCardsContent} renderContext="page" />
    </div>
  );
}

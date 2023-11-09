import { getHeroContent } from '@/lib/api';
import { MobileHeader } from '@/ui/header/mobile/MobileHeader';
import { draftMode } from 'next/headers';

export const Header = async () => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  return <MobileHeader avatar={heroContent.avatar} />;
};

export default Header;

import { getHeroContent } from '@/lib/api';
import { MobileHeader } from '@/ui/header/mobile/MobileHeader';
import { draftMode } from 'next/headers';
import DesktopHeader from '@/ui/header/DesktopHeader';

export const Header = async () => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  return (
    <section id="home">
      <MobileHeader className="flex md:hidden" avatar={heroContent.avatar} />
      <DesktopHeader className="hidden md:flex" />
    </section>
  );
};

export default Header;

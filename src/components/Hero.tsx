import Avatar from './Avatar';

interface HeroProps {
  PrimaryText: string;
  SecondaryText: string;
  AvatarURL: string;
}

const Hero: React.FC<HeroProps> = ({ PrimaryText, SecondaryText, AvatarURL }) => {
  return (
    <section>
      <h1>Rio Edwards</h1>
      <h2>{PrimaryText}</h2>
      <h3>{SecondaryText}</h3>
      <Avatar name="Avatar" url={AvatarURL} />
    </section>
  );
};

export default Hero;

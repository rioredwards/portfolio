import Avatar from "./Avatar";

interface HeroProps {
  PrimaryText: string;
  SecondaryText: string;
  AvatarURL: URL;
}

const Hero: React.FC<HeroProps> = ({ PrimaryText, SecondaryText, AvatarURL }) => {
  return (
    <section>
      <h1>Rio Edwards</h1>
      <h2>{PrimaryText}</h2>
      <h3>{SecondaryText}</h3>
      <Avatar URL={AvatarURL} />
    </section>
  );
};

export default Hero;

interface AvatarProps {
  URL: URL;
}

const Avatar: React.FC<AvatarProps> = ({ URL }) => {
  return <div>{URL.toString()}</div>;
};

export default Avatar;

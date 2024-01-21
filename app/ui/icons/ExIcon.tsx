interface Props {
  className?: string;
}

const ExIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 23 23"
      className={className}
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    >
      <path d="M 3 16.5 L 17 2.5" />
      <path d="M 3 2.5 L 17 16.346" />
    </svg>
  );
};

export default ExIcon;

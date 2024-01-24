import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

interface Props {
  showSuccess?: boolean;
}

export const SubmitButton: React.FC<Props> = ({ showSuccess }) => {
  const { pending } = useFormStatus();

  const state = showSuccess ? 'Sent!' : pending ? 'Sending...' : 'Send';

  const classes = clsx(
    // Send
    { 'bg-red-400': state === 'Send' },
    // Sending...
    { 'bg-purple-400 opacity-70 pointer-events-none': pending },
    // Sent!
    { 'bg-emerald-400': state === 'Sent!' },
    // defaults
    'col-start-3 row-start-3 w-32 place-self-end bg-gradient-to-r text-white font-bold py-2 px-4 rounded-md',
    // transition
    'transition-all duration-[1000ms] ease-in-out'
  );

  return (
    <button type="submit" className={classes} disabled={pending}>
      {state}
    </button>
  );
};

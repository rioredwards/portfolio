import clsx from 'clsx';
import { useFormStatus } from 'react-dom';

interface ContactFormInputProps {
  displayText: string;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  errorMessages?: string[];
  placeholder?: string;
  value: string;
  setInput: Function;
}

const ContactFormInput: React.FC<ContactFormInputProps> = ({
  displayText,
  name,
  type,
  errorMessages,
  placeholder,
  value,
  setInput,
}) => {
  const { pending } = useFormStatus();

  const cssClasses = clsx(
    { 'disabled pointer-events-none bg-gray-100': pending },
    'border border-gray-300 rounded-lg p-2'
  );

  return (
    <>
      <label htmlFor={name} className="text-gray-600 text-xl font-bold mb-2">
        {displayText}
      </label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className={cssClasses}
          rows={5}
          value={value}
          onChange={(e) => setInput(e.target.value)}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          className={cssClasses}
          value={value}
          onChange={(e) => setInput(e.target.value)}
        />
      )}
      <div
        id={`${name}-error`}
        aria-live="polite"
        className="mt-1 h-[1.25rem] text-sm text-red-500"
      >
        {!!errorMessages?.length &&
          errorMessages.map((error: string) => <p key={error}>{error}</p>)}
      </div>
    </>
  );
};

export default ContactFormInput;

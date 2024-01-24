import { useFormStatus } from 'react-dom';

interface ContactFormInputProps {
  displayText: string;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'] | 'textarea';
  errorMessages?: string[];
  placeholder?: string;
  value: string;
  setInput: (value: string) => void;
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
          className="border border-gray-300 rounded-md p-2"
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
          className="border border-gray-300 rounded-md p-2"
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

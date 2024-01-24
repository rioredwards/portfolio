'use client';

import MotionGradientText from '../GradientText';
import { useFormState } from 'react-dom';
import { State, handleEmailSubmit } from '@/lib/actions';
import { SubmitButton } from './SubmitButton';
import SocialIcons from './SocialIcons';
import ContactFormInput from './ContactFormInput';
import { useEffect, useState } from 'react';

const ContactForm: React.FC = () => {
  const initialState: State = {};
  const [state, dispatch] = useFormState(handleEmailSubmit, initialState);
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    if (state.success) {
      setNameInput('');
      setEmailInput('');
      setMessageInput('');
    }
  }, [state]);

  return (
    <>
      <div className="flex justify-center items-center">
        <MotionGradientText
          elementType="h1"
          direction="to bottom right"
          colors={['#FED237', '#FEAD2A']}
          className="mt-12 text-4xl md:text-5xl mb-8 md:mb-12 font-black leading-loose"
          offset={{ x: 0, y: -1 }}
          shadowColor="#245B5C40"
        >
          SAY HI
        </MotionGradientText>
      </div>
      <form
        className="container px-4 mx-auto max-w-[60rem] grid grid-cols-[auto_1fr_1fr] grid-rows-[repeat(3,_auto)]"
        action={dispatch}
      >
        <div className="col-start-1 row-span-2 self-end max-w-min flex flex-col items-center justify-between gap-8 mb-6 mr-16">
          <SocialIcons />
        </div>
        <div className="col-start-2 flex flex-col mr-4">
          <ContactFormInput
            displayText="Full Name"
            name="name"
            type="text"
            errorMessages={state.errors?.name}
            placeholder="Appa Suki"
            value={nameInput}
            setInput={setNameInput}
          />
        </div>
        <div className="col-start-3 flex flex-col">
          <ContactFormInput
            displayText="Email"
            name="email"
            type="email"
            errorMessages={state.errors?.email}
            placeholder="appasuki@avatar.com"
            value={emailInput}
            setInput={setEmailInput}
          />
        </div>
        <div className="col-start-2 col-span-2 flex flex-col">
          <ContactFormInput
            displayText="Message"
            name="message"
            type="textarea"
            errorMessages={state.errors?.message}
            placeholder="Hi Rio..."
            value={messageInput}
            setInput={setMessageInput}
          />
        </div>
        <div className="col-start-2 text-xl flex items-center">
          <a href="Rio_Edwards-Resume.pdf" target="_blank">
            My Resume
          </a>
        </div>
        <SubmitButton showSuccess={state.success} />
      </form>
    </>
  );
};

export default ContactForm;

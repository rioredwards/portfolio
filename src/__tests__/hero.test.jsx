import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/components/Hero';
import { describe } from 'node:test';
// import { fetch } from 'react-testing-library/fetch';

const mockHeroContent = {
  title: 'Cool Guy',
  secondaryText: 'Software Engineer',
  url: 'https://avatars.githubusercontent.com/u/10982878?v=4',
};

describe('Hero', () => {
  test('displays my name', async () => {
    // ARRANGE
    const { title, secondaryText, url } = mockHeroContent;
    render(<Hero PrimaryText={title} SecondaryText={secondaryText} AvatarURL={url} />);

    // ACT
    const myNameElement = await screen.findByText(/rio edwards/i);

    // ASSERT
    expect(myNameElement).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/ui/hero/Hero';
import { describe } from 'node:test';
// import { fetch } from 'react-testing-library/fetch';

const mockHeroContent = {
  title: 'My Name Is Rio',
  secondaryText: "I'm an Artist and Web-Developer.",
  avatar: { url: 'https://avatars.githubusercontent.com/u/10982878?v=4' },
};

describe('Hero', () => {
  test('displays my name', async () => {
    // ARRANGE
    render(<Hero {...mockHeroContent} />);

    // ACT
    const myNameElement = await screen.findByText(/rio/i);

    // ASSERT
    expect(myNameElement).toBeInTheDocument();
  });
});

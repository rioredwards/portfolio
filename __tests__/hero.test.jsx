import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '@/ui/Hero';
import { describe } from 'node:test';
// import { fetch } from 'react-testing-library/fetch';

const mockHeroContent = {
  primaryText: 'Rio Edwards',
  secondaryText: 'Software Engineer',
  avatarURL: 'https://avatars.githubusercontent.com/u/10982878?v=4',
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

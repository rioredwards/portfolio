import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "@/components/Hero";

test("displays my name", async () => {
  // ARRANGE
  render(<Hero />);

  // ACT
  const myNameElement = await screen.findByText(/rio edwards/i);

  // ASSERT
  expect(myNameElement).toBeInTheDocument();
});

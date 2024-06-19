import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer.jsx";

describe("Footer component tests", () => {
  test("renders footer correctly", () => {
    // Assign & Act
    render(<Footer />);
    // Assert
    expect(screen.getByText(/© 2024 DFCorp/)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import LoginModal from "../../src/components/LoginModal.jsx";

describe("LoginModal component tests", () => {
  test("renders modal correctly", () => {
    // Assign & Act
    render(<LoginModal />);
    // Assert
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(
      screen.getByText("Login to manage your favourite locations!")
    ).toBeInTheDocument();
  });
});

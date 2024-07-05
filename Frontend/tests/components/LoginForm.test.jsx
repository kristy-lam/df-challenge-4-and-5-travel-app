import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../../src/components/LoginForm";

describe("LoginForm tests", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  test("updates userEmail state on input change", () => {
    // Assign
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const invalidMessage = "The email address you inputted is invalid.";
    // Act
    fireEvent.change(emailInput, { target: { value: "invalid@email" } });
    // Assert
    expect(screen.queryByText(invalidMessage)).toBeInTheDocument();
    expect(emailInput.value).toBe("invalid@email");
  });

  test("updates userPassword state on input change", () => {
    // Assign
    const passwordInput = screen.getByPlaceholderText("Enter your password...");
    const invalidMessage =
      "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.";
    // Act
    fireEvent.change(passwordInput, { target: { value: "Password" } });
    // Assert
    expect(screen.queryByText(invalidMessage)).toBeInTheDocument();
    expect(passwordInput.value).toBe("Password");
  });

  test("applies 'is-invalid' class to input fields with invalid values", () => {
    // Assign
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getByPlaceholderText("Enter your password...");
    // Act
    fireEvent.change(emailInput, { target: { value: "hello@world" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    // Assert
    expect(emailInput).toHaveClass("is-invalid");
    expect(passwordInput).toHaveClass("is-invalid");
  });
});

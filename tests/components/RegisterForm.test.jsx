import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "../../src/components/RegisterForm";

describe("RegisterForm tests", () => {
  beforeEach(() => {
    render(<RegisterForm />);
  });

  test("updates isRegEmailValid state on input change", () => {
    // Assign
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const invalidMessage = "The email address you inputted is invalid.";
    // Act
    fireEvent.change(emailInput, { target: { value: "invalid-email@" } });
    // Assert
    expect(screen.queryByText(invalidMessage)).toBeInTheDocument();
    expect(emailInput.value).toBe("invalid-email@");
  });

  test("updates isRegPasswordValid state on input change", () => {
    // Assign
    const passwordInput = screen.getByPlaceholderText("Enter a password...");
    const invalidMessage =
      "The password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.";
    // Act
    fireEvent.change(passwordInput, { target: { value: "invalid-password" } });
    // Assert
    expect(screen.queryByText(invalidMessage)).toBeInTheDocument();
    expect(passwordInput.value).toBe("invalid-password");
  });

  test("updates isRegConfirmPasswordValid state on input change", () => {
    // Assign
    const passwordInput = screen.getByPlaceholderText("Enter a password...");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm the password..."
    );
    const invalidMessage = "Your password inputs do not match.";
    // Act
    fireEvent.change(passwordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password1!" },
    });
    // Assert
    expect(screen.queryByText(invalidMessage)).toBeInTheDocument();
    expect(passwordInput.value).toBe("Password123!");
    expect(confirmPasswordInput.value).toBe("Password1!");
  });

  test("applies 'is-invalid' class to input fields with invalid values", () => {
    // Assign
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getByPlaceholderText("Enter a password...");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm the password..."
    );
    // Act
    fireEvent.change(emailInput, { target: { value: "hello@world" } });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "123" } });
    // Assert
    expect(emailInput).toHaveClass("is-invalid");
    expect(passwordInput).toHaveClass("is-invalid");
    expect(confirmPasswordInput).toHaveClass("is-invalid");
  });
});

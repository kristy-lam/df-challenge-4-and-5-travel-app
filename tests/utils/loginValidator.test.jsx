import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../src/components/LoginForm";

describe("Login Component Tests", () => {
  it("applies 'is-invalid' class to input fields with invalid values", () => {
    // Assign
    render(<LoginForm />);
    const loginEmailInput = screen.getByLabelText("User Email");
    const loginPasswordInput = screen.getByLabelText("User Password");

    // Act
    userEvent.type(loginEmailInput, "hello@world");
    userEvent.type(loginPasswordInput, "12345678");

    // Assert
    expect(loginEmailInput).toHaveClass("is-invalid");
    expect(loginPasswordInput).toHaveClass("is-invalid");
  });
});

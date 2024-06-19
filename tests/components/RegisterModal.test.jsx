import { render, screen } from "@testing-library/react";
import RegisterModal from "../../src/components/RegisterModal.jsx";

describe("RegisterModal component tests", () => {
  test("renders modal correctly", () => {
    // Assign & Act
    render(<RegisterModal />);
    // Assert
    expect(screen.getByText("Welcome to DF Travel!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Register to enjoy adding a location to your favourites!"
      )
    ).toBeInTheDocument();
  });
});

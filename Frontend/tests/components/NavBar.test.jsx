import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { useUser } from "../../src/context/context.js";
import NavBar from "../../src/components/NavBar";

describe("NavBar tests", () => {
  beforeEach(() => {
    vi.mock("../../src/context/context.js", () => ({
      useUser: vi.fn(),
    }));
  });

  test("renders 'Home', 'Register' and 'Login' buttons but not 'Logout' button when user is not logged in", () => {
    // Arrange
    useUser.mockReturnValue({ isLoggedIn: false });
    // Act
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    const registerButton = screen.getByRole("button", { name: "Register" });
    expect(registerButton).toBeInTheDocument();
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
    const logoutButton = screen.queryByRole("button", { name: "Logout" });
    expect(logoutButton).not.toBeInTheDocument();
  });

  test("renders 'Home' and 'Logout' buttons but not 'Register' and 'Login' buttons when user is logged in", () => {
    // Arrange
    useUser.mockReturnValue({
      isLoggedIn: true,
      favs: [{ city: "testCity1" }, { city: "testCity2" }],
      updateFavs: vi.fn(),
    });
    // Act
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    // Assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
    const registerButton = screen.queryByRole("button", { name: "Register" });
    expect(registerButton).not.toBeInTheDocument();
    const loginButton = screen.queryByRole("button", { name: "Login" });
    expect(loginButton).not.toBeInTheDocument();
  });
});

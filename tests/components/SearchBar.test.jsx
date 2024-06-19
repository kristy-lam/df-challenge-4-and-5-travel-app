import { render, screen } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}));

describe("SearchBar component tests", () => {
  it("renders search input box correctly", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Location name...")).toBeInTheDocument();
  });
});

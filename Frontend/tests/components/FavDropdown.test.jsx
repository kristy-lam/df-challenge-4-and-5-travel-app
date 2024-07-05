import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { useUser } from "../../src/context/context.js";
import FavDropdown from "../../src/components/FavDropdown";

vi.mock("../../src/context/context.js", () => ({
  useUser: vi.fn(),
}));

describe("FavDropdown component tests", () => {
  test("renders dropdown items when there are favourites", () => {
    // Assign
    const testFavs = [{ city: "testCity1" }, { city: "testCity2" }];
    useUser.mockReturnValue({ favs: testFavs });
    // Act
    render(
      <MemoryRouter>
        <FavDropdown />
      </MemoryRouter>
    );
    // Assert
    const testCity1 = screen.getByText("testCity1");
    const testCity2 = screen.getByText("testCity2");
    expect(testCity1).toBeInTheDocument();
    expect(testCity2).toBeInTheDocument();
  });
});

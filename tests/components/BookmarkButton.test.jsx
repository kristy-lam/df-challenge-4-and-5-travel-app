import { render, screen } from "@testing-library/react";
import { useUser } from "../../src/context/context.js";
import BookmarkButton from "../../src/components/BookmarkButton";

describe("BookmarkButton component tests", () => {
  vi.mock("../../src/context/context.js", () => ({
    useUser: vi.fn(),
  }));

  beforeEach(() => {
    const testFavs = [{ city: "testCity1" }, { city: "testCity2" }];
    useUser.mockReturnValue({ user: true, favs: testFavs });
  });

  test("renders remove bookmark button when city is already bookmarked", () => {
    // Act
    render(<BookmarkButton city="testCity1" />);
    // Assert
    expect(screen.getByText("Remove from favourites")).toBeInTheDocument();
  });

  test("renders add bookmark button when city is not bookmarked", () => {
    // Act
    render(<BookmarkButton city="testCity3" />);
    // Assert
    expect(screen.getByText("Click to add to favourites")).toBeInTheDocument();
  });
});

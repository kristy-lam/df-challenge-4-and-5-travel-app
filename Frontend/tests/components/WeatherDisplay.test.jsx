import { screen, render } from "@testing-library/react";
import WeatherDisplay from "../../src/components/WeatherDisplay";

describe("WeatherDisplay component tests", () => {
  test("renders weather data correctly", () => {
    // Assign
    const testForecast = {
      date: "testDate",
      desc: "testDesc",
      temp: "testTemp",
    };
    // Act
    render(<WeatherDisplay forecast={testForecast} />);
    // Assert
    expect(screen.getByText("testDate")).toBeInTheDocument();
    expect(screen.getByText("testDesc")).toBeInTheDocument();
    expect(screen.getByText("testTemp")).toBeInTheDocument();
  });
});

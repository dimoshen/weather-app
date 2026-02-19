import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CitySearchForm from "./CitySearchForm";
import { searchCities } from "@/lib/api/searchCities";

jest.mock("@/lib/api/searchCities");

describe("CitySearchForm", () => {
  it("adds a new city", async () => {
    const queryClient = new QueryClient();
    const setCities = jest.fn();

    (searchCities as jest.Mock).mockResolvedValue([
      {
        name: "Paris",
        country: "FR",
        lat: 0,
        lon: 0,
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <CitySearchForm cities={[]} setCities={setCities} />
      </QueryClientProvider>,
    );

    const input = screen.getByPlaceholderText("Enter city name");

    fireEvent.change(input, {
      target: { value: "Par" },
    });

    const suggestion = await screen.findByText("Paris, FR");

    fireEvent.click(suggestion);

    const button = screen.getByText("Add");

    fireEvent.click(button);

    await waitFor(() => {
      expect(setCities).toHaveBeenCalled();
    });
  });
});

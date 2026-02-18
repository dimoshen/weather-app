import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityCard from "./CityCard";


const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe("CityCard", () => {
  it("renders city name", () => {
    renderWithClient(
      <CityCard
        id="1"
        city="Paris"
        country="FR"
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("Paris, FR")).toBeInTheDocument();
  });
});

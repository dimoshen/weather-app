import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

import CityCard from "./CityCard";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}));

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe("CityCard", () => {
  const mockedUseQuery = useQuery as jest.Mock;

  beforeEach(() => {
    mockedUseQuery.mockReturnValue({
      data: {
        main: { temp: 20 },
        weather: [{ description: "clear sky", icon: "01d" }],
      },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders city name", () => {
    renderWithClient(
      <CityCard id="1" city="Paris" country="FR" onDelete={() => {}} />
    );

    expect(screen.getByText("Paris, FR")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDeleteMock = jest.fn();

    renderWithClient(
      <CityCard id="123" city="Paris" country="FR" onDelete={onDeleteMock} />
    );

    fireEvent.click(screen.getByLabelText("Delete"));

    expect(onDeleteMock).toHaveBeenCalledWith("123");
  });

  it("renders Details link with correct href", () => {
    renderWithClient(
      <CityCard
        id="1"
        city="Paris"
        country="FR"
        onDelete={() => {}}
      />
    );

    const link = screen.getByRole("link", { name: /details/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/city/Paris-FR"
    );
  });
});

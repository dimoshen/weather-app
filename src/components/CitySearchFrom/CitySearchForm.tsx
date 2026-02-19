"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { searchCities } from "@/lib/api/searchCities";
import { formatCityName } from "@/lib/utils/formatCityName";
import { City } from "@/types/City";
import { CitySuggestion } from "@/types/CitySuggestion";

import styles from "./CitySearchForm.module.scss";


interface Props {
  cities: City[];
  setCities: Dispatch<SetStateAction<City[]>>;
}

export const CitySearchForm = ({ cities, setCities }: Props) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CitySuggestion | null>(null);

  const { data } = useQuery<CitySuggestion[]>({
    queryKey: ["citySearch", input],
    queryFn: async () => {
      const result = await searchCities(input);

      return result.filter(
        (city: CitySuggestion, index: number, self: CitySuggestion[]) =>
          index === self.findIndex((c) => c.name === city.name && c.country === city.country),
      );
    },
    enabled: input.length > 2,
  });

  const addCity = () => {
    if (!input.trim()) return;

    const parts = input.split(",");
    if (parts.length < 2) return;

    const cityName = formatCityName(parts[0].trim());
    const countryCode = parts[1].trim().toUpperCase();

    if (
      cities.some(
        (c) =>
          c.city.toLowerCase() === cityName.toLowerCase() &&
          c.country.toLowerCase() === countryCode.toLowerCase(),
      )
    ) {
      setSelectedCity(null);
      toast.error("City already exists");
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      city: cityName,
      country: countryCode,
    };

    setCities((prev) => [...prev, newCity]);
    setInput("");
    setShowSuggestions(false);
    setSelectedCity(null);

    toast.success(`${cityName}, ${countryCode} added`);
  };

  return (
    <div className={styles["search-form"]}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && selectedCity) {
            e.preventDefault();
            addCity();
          }
        }}
        placeholder="Enter city name"
        className={styles["search-form__input"]}
      />
      {showSuggestions && data && data.length > 0 && (
        <ul className={styles["search-form__suggestions"]}>
          {data.map((city: CitySuggestion) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => {
                setInput(`${city.name}, ${city.country}`);
                setShowSuggestions(false);
                setSelectedCity(city);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
      {selectedCity && (
        <button onClick={addCity} className={styles["search-form__button"]}>
          Add
        </button>
      )}
    </div>
  );
};

export default CitySearchForm;

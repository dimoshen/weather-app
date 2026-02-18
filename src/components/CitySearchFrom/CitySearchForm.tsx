"use client"

import { Dispatch, SetStateAction } from "react";
import styles from "@/components/CitySearchFrom/CitySearchForm.module.scss";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {searchCities} from "@/lib/api/getCitiesList";
import {formatCityName} from "@/lib/utils/formatCityName";
import {City} from "@/types/City";
import {CitySuggestion} from "@/types/CitySuggestion";

interface Props {
  cities: City[];
  setCities: Dispatch<SetStateAction<City[]>>;
}

export const CitySearchForm = ({ cities, setCities }: Props) => {
  const [input, setInput] = useState("");

  const { data } = useQuery<CitySuggestion[]>({
    queryKey: ["citySearch", input],
    queryFn: () => searchCities(input),
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
          c.country.toLowerCase() === countryCode.toLowerCase()
      )
    ) {
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      city: cityName,
      country: countryCode,
    };

    setCities((prev) => [...prev, newCity]);
    setInput("");
  };

  return (
    <div className={styles["search-form"]}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city name"
        className={styles["search-form__input"]}
      />
      {data && data.length > 0 && (
        <ul className={styles["search-form__suggestions"]}>
          {data.map((city: CitySuggestion) => (
            <li
              key={`${city.lat}-${city.lon}`}
              onClick={() => {
                setInput(`${city.name}, ${city.country}`);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={addCity}
        className={styles["search-form__button"]}
      >
        Add
      </button>
    </div>
  )
}

export default CitySearchForm;

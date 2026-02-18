"use client";

import { useState, useEffect } from "react";
import { City } from "@/types/City";
import CityCard from "@/components/CityCard/CityCard";
import {formatCityName} from "@/lib/utils/formatCityName";

import styles from "./page.module.scss";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [input, setInput] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      setCities(JSON.parse(saved));
    }
    setIsInitialized(true);
    console.log(localStorage.getItem("cities"));
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities, isInitialized]);

  const addCity = () => {
    if (!input.trim()) return;

    const formattedName = formatCityName(input);

    if (
      cities.some(
        (c) => c.name.toLowerCase() === formattedName.toLowerCase()
      )
    ) {
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      name: formattedName,
    };

    setCities((prev) => [...prev, newCity]);
    setInput("");
  };


  const removeCity = (id: string) => {
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  return (
    <main className={styles.home}>
      <div className={styles["home__container"]}>
        <h1 className={styles["home__title"]}>Weather App</h1>

        <div className={styles["home__form"]}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter city name"
            className={styles["home__input"]}
          />
          <button
            onClick={addCity}
            className={styles["home__button"]}
          >
            Add
          </button>
        </div>

        <div className={styles["home__cards"]}>
          {cities.map(({ id, name }) => (
            <CityCard
              key={id}
              id={id}
              name={name}
              onDelete={removeCity}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

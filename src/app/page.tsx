"use client";

import { useState, useEffect } from "react";
import CityCard from "@/components/CityCard/CityCard";
import CitySearchForm from "@/components/CitySearchFrom/CitySearchForm";
import { City } from "@/types/City";

import styles from "./page.module.scss";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      // This effect runs once
      setCities(JSON.parse(saved));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities, isInitialized]);

  const removeCity = (id: string) => {
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  return (
    <main className={styles.home}>
      <div className={styles["home__container"]}>
        <h1 className={styles["home__title"]}>Weather App</h1>

        <CitySearchForm cities={cities} setCities={setCities} />

        {cities.length > 0 ? (
          <div className={styles["home__cards"]}>
            {cities.map(({ id, city, country }) => (
              <CityCard key={id} id={id} city={city} country={country} onDelete={removeCity} />
            ))}
          </div>
        ) : (
          <h2 className={styles["home__subtitle"]}>Pick a city to see the forecast 🌤️</h2>
        )}
      </div>
    </main>
  );
}

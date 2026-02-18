"use client";

import { useState, useEffect } from "react";
import { City } from "@/types/City";
import CityCard from "@/components/CityCard/CityCard";

import styles from "./page.module.scss";
import CitySearchForm from "@/components/CitySearchFrom/CitySearchForm";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
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

  const removeCity = (id: string) => {
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  return (
    <main className={styles.home}>
      <div className={styles["home__container"]}>
        <h1 className={styles["home__title"]}>Weather App</h1>

        <CitySearchForm
          cities={cities}
          setCities={setCities}
        />

        <div className={styles["home__cards"]}>
          {cities.map(({ id, city, country }) => (
            <CityCard
              key={id}
              id={id}
              city={city}
              country={country}
              onDelete={removeCity}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { City } from "@/types/City";
import CityCard from "@/components/CityCard/CityCard";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("cities");
    if (saved) {
      setCities(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const addCity = () => {
    if (!input.trim()) return;

    if (cities.some((c) => c.name.toLowerCase() === input.trim().toLowerCase())) {
      return;
    }

    const newCity = {
      id: crypto.randomUUID(),
      name: input.trim(),
    };

    setCities((prev) => [...prev, newCity]);
    setInput("");
  };

  const removeCity = (id: string) => {
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  return (
    <main>
      <h1>Weather App</h1>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={addCity}>Add</button>
      </div>

      <ul>
        {cities.map(({ id, name }) => (
          <CityCard key={id} id={id} name={name} onDelete={removeCity} />
        ))}
      </ul>
    </main>
  );
}

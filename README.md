# 🌦 Weather App (Next.js)

Single Page Application for viewing weather in selected cities.

---

## 🚀 Live Demo

👉 Deployed on Vercel  
https://weather-app-dimoshens-projects.vercel.app/

---

## 📌 Features

### 🏙 Cities List

- Display cities as weather cards
- Short weather info (temperature, description, icon)
- Refresh button per card (updates only that city)
- Delete city
- Navigation to detailed page

---

### 🔎 Add City

- Autocomplete suggestions (OpenWeather Geocoding API)
- Duplicate prevention
- Toast notifications
- LocalStorage persistence

---

### 📄 Detailed Page

- Current weather info
- Hourly temperature forecast (next 24h)
- Temperature chart using Recharts

---

### 🧪 Testing

- Jest + Testing Library
- Covers:
    - Rendering
    - Button interactions
    - Delete logic
    - Navigation
    - Basic UI states

---

## 🛠 Tech Stack

- Next.js 16
- React 19
- TypeScript
- TanStack Query
- SCSS (Sass)
- Recharts
- Lucide React
- React Hot Toast
- Jest + Testing Library

---

## 📦 Installation

```bash
git clone <repo-url>
cd weather-app
npm install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key
```

Get your API key from:  
https://openweathermap.org/

---

## 🧑‍💻 Available Scripts

### Development

```bash
npm run dev
```

Runs the app at:

```
http://localhost:3000
```

---

### Build

```bash
npm run build
```

---

### Production Start

```bash
npm run start
```

---

### Lint

```bash
npm run lint
```

---

### Format

```bash
npm run format
```

---

### Run Tests

```bash
npm run test
```

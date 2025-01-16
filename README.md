# Weather App

This is a simple and interactive weather application built with **ReactJS** that provides users with real-time weather information based on their location or a city they input. It fetches data from a weather API and displays the current weather, temperature, humidity, and more.

# Features

- Search for a city to get the current weather data.
- Displays current weather information including temperature, humidity, wind speed, and weather description.
- Shows an icon representing the weather condition (e.g., clear, cloudy, rain, snow).
- Handles errors gracefully, providing user-friendly messages if a city is not found or if there's an issue fetching data.
- Clean and responsive user interface.

# Demo
You can view the demo of the application by visiting the live demo ().

# Technologies Used

**ReactJS:** JavaScript library for building user interfaces.
**OpenWeatherMap API:** API service used to fetch current weather data.
**CSS:** Styling and layout, including responsive design.
**JavaScript (ES6):** For the functionality of the app.

# Functionality

**Search for City:** The app allows users to type the name of any city and press "Enter" or click the search icon to fetch the weather information for that city.

**Weather Details:** The app displays:
- Current temperature in Celsius (°C).
- City and country name.
- A weather icon that changes based on the current weather conditions.
- Weather Description (e.g., sunny, cloudy, rainy)
- Latitude and longitude coordinates.
- Humidity percentage.
- Wind speed.

**Error Handling:** If the city is not found, or if there's an issue fetching the data, the app will display a relevant error message.

**Weather Description:** A description of the current weather (e.g., "Sunny", "Cloudy", "Rainy") will be shown.

# Troubleshooting

- **Invalid API Key:** If you encounter issues with the API key, ensure that your key is correctly inserted in App.js. If it still doesn't work, check the key validity on your OpenWeatherMap account.

- **City Not Found:** If a city is not found, ensure the city name is spelled correctly. The OpenWeatherMap API requires the city name to be accurate.

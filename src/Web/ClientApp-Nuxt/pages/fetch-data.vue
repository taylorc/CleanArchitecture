<script setup lang="ts">
import { WeatherForecast, WeatherForecastsClient } from "~/web-api-client";

const forecasts = ref<WeatherForecast[]>([]);
const loading = ref(true);

const populateWeatherData = async () => {
  let client = new WeatherForecastsClient();
  const data = await client.getWeatherForecasts();
  forecasts.value = data;
  loading.value = false;

  console.log(data);
};

populateWeatherData();

//   async populateWeatherDataOld() {
//     const response = await fetch('weatherforecast');
//     followIfLoginRedirect(response);
//     const data = await response.json();
//     this.setState({ forecasts: data, loading: false });
//   }
</script>
<template>
  <div>
    <table className="table table-striped" aria-labelledby="tableLabel">
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="forecast in forecasts" :key="forecast.date?.toDateString()">
        <td>{new Date(forecast.date).toLocaleDateString()}</td>
        <td>{forecast.temperatureC}</td>
        <td>{forecast.temperatureF}</td>
        <td>{forecast.summary}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

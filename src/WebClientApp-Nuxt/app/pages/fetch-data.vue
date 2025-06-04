
<script lang="ts" setup>
import type { WeatherForecast } from '~/models/WeatherForecast';
    const config = useRuntimeConfig();

const { data: weatherForecasts, error: error } = await useAPIFetch<WeatherForecast[]>("/api/WeatherForecasts");
</script>
<template>
            <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
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
            <tr v-for="forecast in weatherForecasts" :key="forecast.date">
              <td>{{ new Date(forecast.date).toLocaleDateString() }}</td>
              <td>{{ forecast.temperatureC }}</td>
              <td>{{ forecast.temperatureF }}</td>
              <td>{{ forecast.summary }}</td>
            </tr>
        </tbody>
      </table>
</template>
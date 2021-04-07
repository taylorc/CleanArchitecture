<template>
  <h1 id="tableLabel">Weather forecast</h1>

  <p>This component demonstrates fetching data from the server.</p>

  <p v-if="!forecasts"><em>Loading...</em></p>

  <table
    class="table table-striped"
    aria-labelledby="tableLabel"
    v-if="forecasts"
  >
    <thead>
      <tr>
        <th>Date</th>
        <th>Temp. (C)</th>
        <th>Temp. (F)</th>
        <th>Summary</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="forecast in forecasts" :key="forecast.date">
        <td>{{ forecast.date }}</td>
        <td>{{ forecast.temperatureC }}</td>
        <td>{{ forecast.temperatureF }}</td>
        <td>{{ forecast.summary }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { WeatherForecastClient } from "@/services/WebApiService";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const forecasts = ref([]);

    const forecastClient = new WeatherForecastClient();

    forecastClient
      .get()
      // eslint-disable-next-line prettier/prettier
      .then((result) => (forecasts.value = result))
      // eslint-disable-next-line prettier/prettier
      .catch((error) => {
        console.error(error);
      });

    return { forecasts };
  }
});
</script>

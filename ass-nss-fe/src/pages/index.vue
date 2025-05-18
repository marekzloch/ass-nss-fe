<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import Table from '@/components/Table.vue'
import Graph from '@/components/Graph.vue'
import CameraImages from '@/components/CameraImages.vue'
import { apiClient } from '@/api'
import type { Measurement } from '@/api/types'

const measurements = ref<Measurement[]>([])
const selectedMeasurement = ref<Measurement | null>(null)

function selectMeasurement (item: Measurement) {
  selectedMeasurement.value = item
};


async function fetchDemoMeasurements () {
  
  const res = await fetch('/demo/fakeMeasurements.json', {
    headers: { 'Cache-Control': 'no-cache' },
  });
  
  const d = await res.json();
  return d.data;

};

async function fetchMeasurements() {
  
  const res = await apiClient.get(`/measurements`);

  return res.data.measurements;  
};

onMounted(async () => {
  measurements.value = await fetchMeasurements();
});

const dateFrom = ref('');
const dateTo = ref('');

function toDayStart (dateStr: string): Date | null {
  return dateStr ? new Date(`${dateStr}T00:00:00`) : null;
};

function toDayEnd (dateStr: string): Date | null {
  return dateStr ? new Date(`${dateStr}T23:59:59`) : null;
};

const filteredMeasurements = computed(() => {

  return measurements.value.filter(m => {

    const measurementDate = new Date(m.created_at);

    const from = toDayStart(dateFrom.value);
    const to = toDayEnd(dateTo.value);

    const afterStart = !from || measurementDate >= from;
    const beforeEnd = !to || measurementDate <= to;

    return afterStart && beforeEnd;

  })
});


</script>

<template>
  <!-- Filtrovací pole pro datum -->
  <v-row class="mb-4 pt-8 justify-center">
    <v-col class="d-flex justify-space-between" cols="12" md="6" style="max-width: 800px;">
      <div style="width: 48%;">
        <label class="font-weight-medium mb-1">Datum od</label>
        <input
          v-model="dateFrom"
          class="filter-input"
          type="date"
        >
      </div>

      <div style="width: 48%;">
        <label class="font-weight-medium mb-1">Datum do</label>
        <input
          v-model="dateTo"
          class="filter-input"
          type="date"
        >
      </div>
    </v-col>
  </v-row>

  <v-container class="fill-height" max-width="1500">

    <!-- Tabulka + graf -->
    <v-row>
      <v-col cols="4">

        <Table
          :measurements="filteredMeasurements"
          :selectedMeasurement="selectedMeasurement"
          @select:measurement="selectMeasurement"
          />

      </v-col>

      <v-col>

        <Graph
          :measurements="filteredMeasurements"
          :selectedMeasurement="selectedMeasurement"
          />

        <CameraImages
          v-if="selectedMeasurement"
          :measurements="filteredMeasurements"
          :selectedMeasurement="selectedMeasurement"
          @select:measurement="selectMeasurement"
           />

      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.filter-input {
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}
</style>

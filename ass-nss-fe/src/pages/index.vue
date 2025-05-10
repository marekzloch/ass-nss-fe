<script lang="ts" setup>

export type Measurement = {
  id: string;
  created_at: string;
  acoustic: number;
  snapshot_rgb_camera: string;
  snapshot_hsi_camera: string;
};

const measurements = ref<Measurement[]>([]);

const selectedMeasurement = ref<Measurement | null>(null);

function selectMeasurement(item: Measurement) {
  selectedMeasurement.value = item;
};

async function fetchMeasurements() {

  const res = await fetch('/demo/fakeMeasurements.json', { headers: { 'Cache-Control': 'no-cache' } });
  const d = await res.json();

  return d.data;
};

onMounted(async () => {

  measurements.value = await fetchMeasurements();

});

</script>

<template>
  <v-container class="fill-height" max-width="1500">
    <v-row>
      <v-col cols="4">

        <Table
          :measurements="measurements"
          :selectedMeasurement="selectedMeasurement"
          @select:measurement="selectMeasurement"
          />

      </v-col>

      <v-col>

        <Graph
          :measurements="measurements"
          :selectedMeasurement="selectedMeasurement"
          />

        <CameraImages
          v-if="selectedMeasurement"
          @select:measurement="selectMeasurement"
          :measurements="measurements"
          :selectedMeasurement="selectedMeasurement"
           />

      </v-col>
    </v-row>
  </v-container>
</template>

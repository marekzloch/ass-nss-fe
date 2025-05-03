<template>
  <v-container class="fill-height" max-width="1200">
    <v-row>
      <v-col cols="4">
        <Table />
      </v-col>
      <v-col>
        <Graph :data="graphData" />
      </v-col>
    </v-row>

    {{ JSON.stringify(measurements) }}
  </v-container>
</template>

<script lang="ts" setup>
   async function fetchMeasurements () {
    const res = await fetch('/demo/fakeMeasurements.json', { headers: { 'Cache-Control': 'no-cache' } });
    const d = await res.json();
    return d.data;
  }

  const measurements = ref();
   const graphData = ref([])

  onMounted(async () => {
    measurements.value = await fetchMeasurements();
    measurements.value.forEach(measurement => {
      graphData.value.push({
        id: measurement.id,
        acoustic: measurement.acoustic,
        created_at: measurement.created_at
      })
    })
  });

</script>

<template>
 

  <v-container class="fill-height" max-width="1200">
    <Table />
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

  onMounted(async () => {
    measurements.value = await fetchMeasurements();
  });

</script>

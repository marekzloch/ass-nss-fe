<script setup lang="ts">
import { Chart, Grid, Line, Responsive, Tooltip } from 'vue3-charts'
import {computed} from "vue";

const props = defineProps(['data'])

function formatCzechDate(isoString) {
  const date = new Date(isoString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}. ${month}. ${year}`;
}

function formatCzechTime(isoString) {
  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

function xLabel(isoString){
  const date = new Date(isoString);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

const graphData = computed(()=>{
  return props.data.map( d => {
    return {
      acoustic: d.acoustic,
      date: formatCzechDate(d.created_at),
      time: formatCzechTime(d.created_at),
      timestamp: new Date(d.created_at).getTime()
    }
  })
})

const margin = ref({
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
})

const axis = ref({
  primary: {
  },
  secondary: {
    type: 'band',
    format: (val) => {
      return xLabel(val)
    }
  }
})

</script>

<template>
  <Responsive class="w-full">
    <template #main="{ width }">
  <Chart
    :size="{ width: width, height: 420 }"
    :data="graphData"
    :margin="margin"
    direction="vertical"
    :axis="axis"
  >

    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['acoustic', 'timestamp']" />
    </template>

    <template #widgets>
      <Tooltip
        borderColor="#48CAE4"
        :config="{
          timestamp: {color : 'transparent'}
        }"
      />
    </template>

  </Chart>
    </template>
  </Responsive>
</template>

<style scoped>

</style>

<script setup lang="ts">
import { Chart, Grid, Line, Responsive, Tooltip } from 'vue3-charts'
import {computed} from "vue";
import type { Measurement } from '@/pages/index.vue';
import { formatCzechDate, formatCzechTime } from '@/helpers/stringFormatters';

type Props = {
  measurements: Measurement[];
  selectedMeasurement: Measurement | null;
}

const props = defineProps<Props>();

function xLabel(isoString: string) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const graphData = computed(() => {
  return props.measurements.map(d => {
    return {
      id: d.id,
      acoustic: d.acoustic,
      date: formatCzechDate(d.created_at),
      time: formatCzechTime(d.created_at),
      timestamp: new Date(d.created_at).getTime(),
    }
  })
})

const margin = ref({
  left: 0,
  top: 10,
  right: 0,
  bottom: 0
})

const axis = ref({
  primary: {
    type: 'band',
    format: (val: string) => {
      return xLabel(val)
    }
  },
  secondary: {
  }
})

// Function to calculate x-position for the vertical line
function getXPosition(selectedMeasurement: Measurement | null, data: typeof graphData.value, width: number) {
  if (!selectedMeasurement || !data.length) return 0;
  const index = data.findIndex(d => d.id === selectedMeasurement.id);
  if (index === -1) return 0;
  // Use exact x-value for first band and step size for others
  const firstX = parseFloat(document.querySelector('circle').getAttribute('cx') || '0'); // Exact x-value for index 0
  const secondX = parseFloat(document.querySelectorAll('circle')[1]?.getAttribute('cx') || '0');
  const stepSize = secondX - firstX; // Step size between band centers
  // Calculate x-position: firstX + index * stepSize
  const xPosition = firstX + index * stepSize;
  // Ensure xPosition is within chart bounds
  const minX = margin.value.left;
  const maxX = width - margin.value.right;
  const clampedX = Math.max(minX, Math.min(maxX, xPosition));
  // Log for debugging
  console.log({ index, xPosition, clampedX, width });
  return clampedX;
}
</script>

<template>
  <Responsive class="w-full">
    <template #main="{ width, scales }">

      <Chart
        :size="{ width: width, height: 420 }"
        :data="graphData"
        :margin="margin"
        direction="horizontal"
        :axis="axis">

        <template #layers>
            <Grid strokeDasharray="2,2" />
            <Line :dataKeys="['timestamp', 'acoustic']" />
            <!-- Vertical line for selected measurement -->
            <line
              v-if="props.selectedMeasurement && graphData.length"
              :x1="getXPosition(props.selectedMeasurement, graphData, width)"
              :x2="getXPosition(props.selectedMeasurement, graphData, width)"
              :y1="0"
              :y2="420 - margin.top - margin.bottom"
              stroke="#3333FF"
              stroke-width="2"
              stroke-dasharray="4,4"
            />
          </template>

        <template #widgets>

          <Tooltip
            borderColor="#48CAE4"
            :config="{
              timestamp: { color: 'transparent' },
              id: { color: 'transparent' },
              acoustic: {
                label: 'Akustická emise',
                format: (val) => `${val.toFixed(1)}`
              },
              time: { label: 'Čas' },
              date: { label: 'Datum' }
            }" />

        </template>

      </Chart>
    </template>
  </Responsive>
</template>

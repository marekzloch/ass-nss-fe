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
          <!-- the point associated with the item you click on (in the table) cannot be highlighted through the basic vue3-charts functionality (wed have to edit code)
          WE could draw it using the cx, cy coordinates but there is no association between them and the graph values
          -->
          <!--
          <circle
            v-if="props.selectedMeasurement && graphData.length"
            getLabelForValue: function(d.id) {}
            :cx="scales.x(graphData.find(d => d.id === props.selectedMeasurement.id)?.timestamp ?? 0)"
            :cy="scales.y(graphData.find(d => d.id === props.selectedMeasurement.id)?.acoustic ?? 0)"
            r="6"
            fill="#FF5722"
            stroke="#FFFFFF"
            stroke-width="2"
          />
        -->

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

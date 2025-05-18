<script lang="ts" setup>
import type { Measurement } from '@/api/types';


type Props = {
  measurements: Measurement[];
  selectedMeasurement: Measurement;
};

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'select:measurement', item: Measurement): void
  }>();

const currentIndex = computed(() => {
  return props.measurements.findIndex(m => m.id === props.selectedMeasurement?.id) || 0;
});

const isFirstMeasurement = computed(() => currentIndex.value === 0);
const isLastMeasurement = computed(() => currentIndex.value === props.measurements.length - 1);

function switchToPrevious() {
  const currentIndex = props.measurements.findIndex(m => m.id === props.selectedMeasurement.id);
  if (currentIndex > 0) {
    const selectedMeasurement = props.measurements[currentIndex - 1];
    emit('select:measurement', selectedMeasurement);
  }
}

function switchToNext() {
  const currentIndex = props.measurements.findIndex(m => m.id === props.selectedMeasurement.id);
  if (currentIndex < props.measurements.length - 1) {
    const selectedMeasurement = props.measurements[currentIndex + 1]
    emit('select:measurement', selectedMeasurement);
  }
}
</script>

<template>

  <v-row class="h-50 d-flex justify-center align-center h">

    <v-col cols="1" class="d-flex justify-end">
      <v-btn
        v-if="!isFirstMeasurement"
        icon
        @click="switchToPrevious"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-col>

    <v-col>

      <h1>RGB Camera</h1>

      <v-img :src="props.selectedMeasurement.snapshot_rgb_camera" />

    </v-col>

    <v-col>

      <h1>HSI Camera</h1>

      <v-img :src="props.selectedMeasurement.snapshot_hsi_camera" />

    </v-col>

    <v-col cols="1" class="d-flex justify-start">
      <v-btn
        v-if="!isLastMeasurement"
        icon
        @click="switchToNext"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>

  </v-row>


</template>

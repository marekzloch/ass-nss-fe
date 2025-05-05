<script lang="ts" setup>
import type { Measurement } from '@/pages/index.vue';

type Props = {
  selectedMeasurement: Measurement;
};

const props = defineProps<Props>();

//TODO - add emits for navigation buttons 

</script>

<template>

  <v-row class="h-50 d-flex justify-center align-center h">

    <v-col cols="1" class="d-flex justify-end">
      <v-btn icon>
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
      <v-btn icon>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-col>

  </v-row>


</template>
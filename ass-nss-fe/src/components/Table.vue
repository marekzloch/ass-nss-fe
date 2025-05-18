<script lang="ts" setup>
import type { Config, Measurement } from '@/api/types';
import { formatCzechDate, formatCzechTime } from '@/helpers/stringFormatters';
import { configStore } from '@/stores/configStore';
import { ref } from 'vue'

type Props = {
  measurements: Measurement[];
  selectedMeasurement: Measurement | null;
};

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'select:measurement', item: Measurement): void
}>();

const dialog = ref(false);
const selectedRow = ref<Measurement | null>(null);
//stores the page thats displayed upon accessing webapp
const currentPage = ref(1);
//can be changed
const itemsPerPage = 15;


const totalPages = computed(() => {
  return Math.ceil(props.measurements.length / itemsPerPage);
});

// Compute paginated measurements
const paginatedMeasurements = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return props.measurements.slice(start, end);
});

function selectRow(item: Measurement) {
  selectedRow.value = item;
  emit('select:measurement', item);
}

watch(() => props.selectedMeasurement, (newMeasurement) => {
  selectedRow.value = newMeasurement;
}, { immediate: true });

async function onConfigDetailPressed(configId: number) {
  
  selectedConfig.value = await configStore.fetchConfigById(configId);

  if(selectedConfig.value === null) {
    
    return;

  } else {

    dialog.value = true;

  }
};

const selectedConfig = ref<Config | null>(null);

</script>

<template>
    <v-table style="width: 100%;">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Čas</th>
          <th>Měření</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="item in paginatedMeasurements"
        :key="item.id"
        :class="{
          'hoverable-row': true,
          'selected-row': selectedRow?.id === item.id,
        }"
        @click="selectRow(item)"
      >
          <td>{{ formatCzechDate(item.created_at) }}</td>
          <td>{{ formatCzechTime(item.created_at) }}</td>
          <td>{{ item.acustic }}</td>
          <td>
            <v-icon
              icon="mdi-information-outline"
              color="black"
              size="20"
              class="cursor-pointer"
              @click.stop="onConfigDetailPressed(item.config_id)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination Controls -->
  <v-row class="mt-4" align="center">
    <v-col cols="12" class="d-flex justify-center">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="7"
        density="comfortable"
      ></v-pagination>
    </v-col>
  </v-row>

    <v-dialog v-model="dialog" width="auto" @click:outside="dialog = false">
      <v-card
        min-width="400"
        prepend-icon="mdi-cog"
        title="Nastavení konfigurace"
      >
        <v-card-text>
            <p>Interval: {{ selectedConfig?.interval_value }} sekund</p>
            <p>Frekvence: {{ selectedConfig?.frequency }} Hz</p>
            <p>Datum: {{`${formatCzechTime(selectedConfig?.created_at!)} - ${formatCzechDate(selectedConfig?.created_at!)}`}}</p> 
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </template>


<style scoped>
.hoverable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.hoverable-row:hover {
  background-color: #f0f0f0;
}
.selected-row {
  background-color: #E8F5E9; /* light green */
}
</style>

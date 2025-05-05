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
          v-for="item in props.measurements"
          :key="item.id"
          :class="{
            'hoverable-row': true,
            'selected-row': selectedRow?.id === item.id,
          }"
          @click="selectRow(item)"
        >
          <td>{{ formatCzechDate(item.created_at) }}</td>
          <td>{{ formatCzechTime(item.created_at) }}</td>
          <td>{{ item.acoustic }}</td>
          <td>
            <v-icon
              icon="mdi-information-outline"
              color="black"
              size="20"
              class="cursor-pointer"
              @click.stop="dialog = true"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  
    <v-dialog v-model="dialog" width="auto">
      <v-card
        min-width="400"
        prepend-icon="mdi-cog"
        title="Nastavení konfigurace"
      >
        <v-card-text>
            <p>Interval: </p>
            <p>Frekvence: </p>
            <p>Datum: </p>
        </v-card-text>
        <template v-slot:actions>
          <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </template>
  
  <script lang="ts" setup>
  import { formatCzechDate, formatCzechTime } from '@/helpers/stringFormatters';
  import type { Measurement } from '@/pages/index.vue'
  import { ref } from 'vue'
  
  type Props = {
    measurements: Measurement[];
  };

  const props = defineProps<Props>();

  const emit = defineEmits<{
    (e: 'select:measurement', item: Measurement): void
  }>();

  const dialog = ref(false);
  const selectedRow = ref<Measurement | null>(null);
  
  function selectRow(item: Measurement) {
    selectedRow.value = item;
    emit('select:measurement', item);
  }
  </script>
  
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
  
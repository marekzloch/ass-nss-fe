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
          v-for="item in dummy_data"
          :key="item.id"
          :class="{
            'hoverable-row': true,
            'selected-row': selectedRow?.id === item.id,
          }"
          @click="selectRow(item)"
        >
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
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
  import { ref } from 'vue'
  
  interface Dummy {
    id: number
    date: string
    time: string
    acoustic: number
  }
  
  const dummy_data: Dummy[] = [
    { id: 1, date: '12. 5. 2025', time: '14:15', acoustic: 15.9 },
    { id: 2, date: '12. 5. 2025', time: '14:30', acoustic: 23.7 },
    { id: 3, date: '12. 5. 2025', time: '15:00', acoustic: 26.2 },
    { id: 4, date: '12. 5. 2025', time: '15:15', acoustic: 30.5 },
    { id: 5, date: '12. 5. 2025', time: '15:30', acoustic: 35.6 },
    { id: 6, date: '12. 5. 2025', time: '15:45', acoustic: 37.5 },
  ]
  
  const dialog = ref(false)
  const selectedRow = ref<Dummy | null>(null)
  
  function selectRow(item: Dummy) {
    selectedRow.value = item
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
  
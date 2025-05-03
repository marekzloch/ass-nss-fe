<template>
  <v-app>
    <v-app-bar color="#2D9346" :elevation="0">
      <template v-slot:prepend>
        <img style="height: 50px; padding-left: 1em" src="./assets/app-bar-icon.svg" />
      </template>

      <v-app-bar-title>Broskvičky</v-app-bar-title>
    </v-app-bar>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>

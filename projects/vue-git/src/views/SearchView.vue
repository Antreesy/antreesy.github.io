<script setup>
import SearchBar from "../components/SearchBar.vue";
import Table from "../components/Table.vue";
import { store } from "../store";
import { computed } from "vue";

const tableKeys = computed(() => store.getters.TABLE_KEYS);
const tableData = computed(() => store.getters.TABLE_DATA);
</script>

<template>
  <div class="wrapper">
    <SearchBar />
    <Table :propKeys="tableKeys" :propData="tableData" />
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  width: 60%;
  background-color: #b6d2dd;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
}
</style>

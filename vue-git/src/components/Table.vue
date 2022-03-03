<script setup>
const props = defineProps({
  propKeys: Object,
  propData: Object,
})
</script>

<template>
  <div class="tableWrapper">
    <table class="table">
      <thead>
        <tr class="tr">
          <th class="th" v-for="cell in props.propKeys" :key="cell.id">
            {{ cell.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr" v-for="row in props.propData" :key="row.region_fias_id">
          <td class="td" v-for="cell in props.propKeys" :key="cell.id">
            {{ row.data[cell.value] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 4px;
  color: #333;
  border: none;
  padding: 8px;
  border-radius: 0 0 16px 16px;
  font-size: inherit;
}

.th {
  padding: 5px;
  color: #0a463c;
  font-weight: 700;
}

.td {
  background: #eee;
  padding: 5px;
  height: 2rem;
}

.tr:first-child .td:first-child {
  border-top-left-radius: 8px;
}
.tr:first-child .td:last-child {
  border-top-right-radius: 8px;
}
.tr:last-child .td:first-child {
  border-bottom-left-radius: 8px;
}
.tr:last-child .td:last-child {
  border-bottom-right-radius: 8px;
}
</style>

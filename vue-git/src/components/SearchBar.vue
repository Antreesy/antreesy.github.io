<script>
import { store } from "../store";
export default {
  data() {
    return {
      inputValue: "",
    };
  },

  methods: {
    searchFromInput() {
      const url = store.getters.URL;
      const token = store.getters.TOKEN;
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token,
        },
        body: JSON.stringify({ query: this.inputValue, count: 20 }),
      };

      fetch(url, options)
        .then((response) => response.text())
        .then((result) => {
          const fetchTable = JSON.parse(result).suggestions;
          store.commit("SET_TABLE", fetchTable);
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<template>
  <div class="searchWrapper">
    <input
      class="searchInput"
      v-on:keyup.enter="searchFromInput"
      v-model="inputValue"
      placeholder="Введите адрес"
    />
    <button class="searchButton" v-on:click="searchFromInput">Search</button>
  </div>
</template>

<style scoped>
.searchWrapper {
  display: flex;
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: #fceec7;
  overflow: hidden;
  border-bottom: 2px solid #0a463c;
  border-radius: 8px 8px 0 0;
  font-weight: bold;
  font-size: inherit;
}

.searchInput {
  width: 100%;
  height: 42px;
  padding: 0 0 0 15px;
  border: none;
  outline: none;
  background: transparent;
  color: #333;
  font-weight: bold;
  font-size: inherit;
}

.searchInput:hover,
.searchInput:focus {
  background-color: #fff;
}

.searchButton {
  cursor: pointer;
  color: #f9f0da;
  border: none;
  padding: 4px 16px;
  border-radius: 0 8px 0 0;
  outline: none;
  font-weight: bold;
  font-size: inherit;
  background: #0a463c;
}

.searchButton:hover,
.searchButton:focus {
  background-color: #259086;
}
</style>

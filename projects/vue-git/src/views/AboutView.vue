<script setup>
import SearchBar from "../components/SearchBar.vue";
import Table from "../components/Table.vue";
import { store } from "../store";
import { computed } from "vue";

const tableKeys = computed(() => store.getters.TABLE_KEYS);
const mockData = computed(() => store.getters.TABLE_MOCKDATA);
const libraries = computed(() => store.getters.LIBRARIES);
</script>

<template>
  <div>
    <div class="about-wrapper">
      <SearchBar />
      <Table :propKeys="tableKeys" :propData="mockData" />
      <div class="wrapper__hints">
        <button class="hints-button input-hint">
          ?
          <p class="hint-tooltip">Accepts any part of the address from the region to the apartment. Sends a request when Enter is pressed</p>
        </button>
        <button class="hints-button button-hint">
          ?
          <p class="hint-tooltip">Sends a request on mouse click</p>
</button>
      </div>
    </div>
    <div class="about-libraries">
      <p class="about-descr">
        After filling in the search bar and triggering the Submit event (clicking "Enter" or clicking on the Search button) the SearchBar component runs the method searchFromInput() , which takes the server url from the Vuex store and token for authorization, and from the filled field - a string value. The method then initiates via fetch a POST request to the specified server, and in if the response is successful, saves the data to the Vuex store.
      </p>
      <p class="about-descr">
        The Table element is reactively updated and when the object changes in the storage, it translates its contents in the required form. The setting of the displayed columns is also stored in the store, passed through props and, if necessary, can be modified for a specific table.
      </p>
      <h2 class="about__caption">Used Libraries:</h2>
      <ul class="about__list">
        <li class="library__item" v-for="item in libraries" :key="item.id">
          <div class="library__card">
            <img class="library__logo" :src="item.logo" alt="" />
            <h3 class="library__title">{{ item.name }}</h3>
          </div>
          <p>{{ item.descr }}</p>
          <p>
            Link to developer's page:
            <a :href="item.link" target="_blank">{{ item.link }}</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-wrapper {
  position: relative;
  margin: 0 auto;
  width: 40%;
  background-color: #b6d2dd;
  padding: 16px;
  border-radius: 8px;
  font-size: 12px;
}
.about-wrapper .searchWrapper,
.about-wrapper .tableWrapper {
  pointer-events: none;
}

.wrapper__hints {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: all;
}

.hints-button {
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 0;

  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  color: #fff;
  background-color: #e45149;
}
.hints-button:hover {
  background-color: #9b3631;
}

.input-hint {
  top: 10px;
  left: 120px;
}

.button-hint {
  top: 10px;
  left: 420px;
}

.hint-tooltip {
  position: absolute;
  top: 110%;
  padding: 8px;
  border-radius: 8px;
  background-color: #9b3631;
  min-width: 240px;
  transform: translateX(calc(10px - 50%));
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
}

.hints-button:hover .hint-tooltip {
  opacity: 1;
  visibility: visible;
}

.about-descr {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 1rem;
}

.about__caption {
  text-align: center;
  font-size: 48px;
}

.about-libraries {
  margin: 0 auto;
  width: 80%;
  padding: 16px;
  font-size: 14px;
}

.about__list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 60%;
  font-size: 12px;
}

.library__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  border: 2px solid #b6d2dd;
  padding: 8px;
  border-radius: 8px;
}

.library__card {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 0.5rem;
}

.library__title {
  font-size: 36px;
}

.library__logo {
  height: 60px;
  width: 60px;
}
</style>

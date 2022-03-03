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
      <SearchBar :isDisabled="true" />
      <Table :propKeys="tableKeys" :propData="mockData" />
      <div class="wrapper__hints">
        <button class="hints-button input-hint">
          ?
          <p class="hint-tooltip">Принимает любую часть адреса от региона до квартиры. Отправляет запрос при нажатии Enter</p>
        </button>
        <button class="hints-button button-hint">
          ?
          <p class="hint-tooltip">Отправляет запрос при клике мыши</p>
</button>
      </div>
    </div>
    <div class="about-libraries">
      <p class="about-descr">
        После заполнения строки поиска и инициирования события Submit (нажатие
        "Enter" или клик по кнопке Search) компонент SearchBar запускает метод
        searchFromInput(), который принимает из Vuex-хранилища url сервера и
        token для авторизации, а из заполненного поля - строковое значение.
        Затем метод инициирует через fetch POST-запрос на указанный сервер, и в
        случае успешного получения ответа сохраняет данные в Vuex-хранилище.
      </p>
      <p class="about-descr">
        Элемент Table реактивно обновляется и при изменении объекта в хранилище
        транслирует его содержимое в требуемом виде. Настройка отображаемых
        колонок также хранится в сторе, передается через props и при
        необходимости может быть модифицирована под конкретную таблицу.
      </p>
      <h2 class="about__caption">Использованные библиотеки:</h2>
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

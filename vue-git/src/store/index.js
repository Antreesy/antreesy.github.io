import { createStore } from "vuex";
export const store = createStore({
  state() {
    return {
      url: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      token: "d7f026f41c5bd20665f069bbd636d3725817d0a0",
      libraries: [
        {
          id: 1,
          logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Vue.png",
          name: "Vue.js",
          descr:
            "Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS and JavaScript, and provides a declarative and component-based programming model that helps you efficiently develop user interfaces, be it simple or complex.",
          link: "https://vuejs.org/",
        },
        {
          id: 2,
          logo: "https://user-images.githubusercontent.com/7110136/29002857-9e802f08-7ab4-11e7-9c31-604b5d0d0c19.png",
          name: "Vuex",
          descr: "Vuex is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.",
          link: "https://vuex.vuejs.org/",
        },
        {
          id: 3,
          logo: "https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png",
          name: "Vue Router",
          descr: "Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze.",
          link: "https://router.vuejs.org/",
        },
      ],
      table: {
        tableKeys: [
          { id: 1, name: "Индекс", value: "postal_code" },
          { id: 2, name: "Город", value: "city" },
          { id: 3, name: "Улица", value: "street" },
          { id: 4, name: "Дом", value: "house" },
          { id: 5, name: "Квартира", value: "flat" },
        ],
        tableData: [
          {
            data: {
              postal_code: " ",
              city: " ",
              street: " ",
              house: " ",
              flat: " ",
            },
          },
        ],
        tableEmptyData: [
          {
            data: {
              postal_code: " ",
              city: " ",
              street: " ",
              house: " ",
              flat: " ",
            },
          },
        ],
        tableMockData: [
          {
            data: {
              postal_code: "634034",
              city: "Томск",
              street: "Советская",
              house: "76",
              flat: "-",
            },
          },
        ],
      },
    };
  },
  getters: {
    PRODUCTS: (state) => {
      return state.products;
    },
    TABLE_KEYS: (state) => {
      return state.table.tableKeys;
    },
    TABLE_DATA: (state) => {
      return state.table.tableData;
    },
    TABLE_EMPTYDATA: (state) => {
      return state.table.tableEmptyData;
    },
    TABLE_MOCKDATA: (state) => {
      return state.table.tableMockData;
    },
    URL: (state) => {
      return state.url;
    },
    TOKEN: (state) => {
      return state.token;
    },
    LIBRARIES: (state) => {
      return state.libraries;
    },
  },
  mutations: {
    SET_PRODUCTS: (state, payload) => {
      state.products = payload;
    },
    SET_TABLE: (state, payload) => {
      state.table.tableData = payload.length
        ? payload
        : state.table.tableEmptyData;
    },
  },
});

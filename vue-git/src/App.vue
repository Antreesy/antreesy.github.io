<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header class="header">
      <nav class="nav header__nav">
        <RouterLink class="nav__link" to="/search">Address Search</RouterLink>
        <RouterLink class="nav__link" to="/about">About</RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import "@/assets/base.css";

body {
  background-color: #eee;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 15px;

  font-weight: normal;
}

.header {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  background-color: #b6d2dd;
}

.nav {
  padding: 0 1rem;
}

.nav__link {
  font-weight: 700;
  color: #0a463c;
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
}

.nav__link:not(:last-child) {
  margin-right: 1rem;
}

.nav__link.router-link-active {
  color: #e45149;
}

.nav__link:hover {
  color: #259086;
}

.main {
  padding-top: 3rem;
}
</style>

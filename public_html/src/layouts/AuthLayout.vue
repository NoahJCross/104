<template>
  <div id="app">
    <header>
      <div id="navbar">
        <div id="nav-belt">
          <nav class="navbar bg-dark">
            <div class="container-fluid">
              <a href="/" class="navbar-brand text-white">Noah's Shop</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <main class="root">
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup></script>

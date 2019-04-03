<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase">
        <router-link class="toolbar-title" to="/">
          <span class="font-weight-light">Mattias</span>
          <span>Smoothies</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/add-smoothie">
        <v-icon left>add</v-icon>
        <span>Create new receipe</span>
      </v-btn>
    </v-toolbar>
  </nav>
</template>
<script>
export default {};
</script>
<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>


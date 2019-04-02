<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Mattias</span>
        <span>Smoothies</span>
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

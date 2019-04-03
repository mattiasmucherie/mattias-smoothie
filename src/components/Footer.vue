<template>
  <v-footer dark height="auto">
    <v-card class="flex" flat tile>
      <v-card-title>
        <span class="subheading">Mattias Mucherie</span>

        <v-spacer></v-spacer>

        <v-btn
          v-for="link in links"
          :key="link.id"
          class="mx-3"
          dark
          icon
          :href="link.link"
          target="_blank"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          icon: "fas fa-globe",
          link: "https://mattiasmucherie.github.io/",
          id: "1"
        },
        {
          icon: "fab fa-github",
          link: "https://github.com/mattiasmucherie",
          id: "2"
        },
        {
          icon: "fab fa-linkedin",
          link: "https://www.linkedin.com/in/mattias-mucherie/",
          id: "3"
        }
      ]
      //
    };
  }
};
</script>

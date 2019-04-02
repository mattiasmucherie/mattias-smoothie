<template>
  <v-app dark>
    <Navbar/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
    <v-footer dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-title>
          <span class="subheading">
            Created by
            <strong>Mattias Mucherie</strong>
          </span>

          <v-spacer></v-spacer>

          <v-btn
            v-for="link in links"
            :key="link"
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
  </v-app>
</template>
         

          
<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      links: [
        {
          icon: "fas fa-sitemap",
          link: "https://mattiasmucherie.github.io/"
        },
        { icon: "fab fa-github", link: "https://github.com/mattiasmucherie" },
        {
          icon: "fab fa-linkedin",
          link: "https://www.linkedin.com/in/mattias-mucherie/"
        }
      ]
      //
    };
  }
};
</script>

<template>
  <v-layout justify-center v-if="smoothie">
    <v-flex xs10 sm8 md6 lg4>
      <h1>Edit {{smoothie.title}} Smoothie</h1>
      <v-form ref="form" v-model="valid">
        <v-text-field
          label="Smoothie Title"
          v-model="smoothie.title"
          :counter="30"
          :rules="titleRules"
          required
        ></v-text-field>
        <v-text-field
          label="Press ENTER after each ingredient"
          v-model="another"
          :counter="20"
          :rules="ingRules"
          @keydown.enter.prevent="addIng"
        ></v-text-field>
        <v-container>
          <h4>{{smoothie.ingredients.length > 0 ? `Ingredients:` : null}}</h4>
          <v-layout row wrap justify-start>
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index">
              <v-chip close @input="removeIng(ingredient)">{{ingredient }}</v-chip>
            </div>
          </v-layout>
        </v-container>
        <v-btn :disabled="!valid" @click="updateSmoothie">
          <v-icon left>local_drink</v-icon>
          <span>UPDATE SMOOTHIE</span>
        </v-btn>
        <v-alert
          :value="alert"
          type="error"
          transition="scale-transition"
          dismissible
        >You need at least on ingredient to make a smoothie</v-alert>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  data() {
    return {
      smoothie: null,
      title: null,
      another: null,
      valid: true,
      titleRules: [
        v => !!v || "Title is required",
        v => (v && v.length <= 30) || "Title must be less than 30 characters"
      ],
      ingRules: [
        v =>
          !v
            ? false
            : v.length <= 20 || "Ingredients must be less than 20 characters"
      ],
      alert: false
    };
  },
  created() {
    db.collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      })
      .catch(err => {
        console.log(err); // eslint-disable-line
      });
  },
  methods: {
    updateSmoothie() {
      if (this.smoothie.ingredients.length < 1) {
        this.alert = true;
      } else if (this.smoothie.title) {
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-;:@`´öåä¤%#£$€|]/g,
          lower: true
        });
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(this.$router.push({ name: "home" }))
          .catch(err => {
            console.log(err); // eslint-disable-line
          });
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
      }
    },
    removeIng(ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => {
        return ing !== ingredient;
      });
    }
  },
  watch: {
    another: function() {
      this.alert = false;
    }
  }
};
</script>

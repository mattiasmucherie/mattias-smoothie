<template>
  <v-container class="ma-4">
    <h1 class="headline mb-4">Add New Smoothie Recipe</h1>
    <v-form ref="form" v-model="valid">
      <v-text-field
        clearable
        label="Smoothie Title"
        v-model="title"
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
        <h4>{{ingredients.length > 0 ? `Ingredients:` : null}}</h4>
        <v-layout row wrap justify-start>
          <div v-for="(ingredient, index) in ingredients" :key="index">
            <v-chip close @input="removeIng(ingredient)">{{ingredient }}</v-chip>
          </div>
        </v-layout>
      </v-container>
      <v-btn :disabled="!valid" @click="addSmoothie">
        <v-icon left>local_drink</v-icon>
        <span>ADD SMOOTHIE</span>
      </v-btn>
      <v-alert
        :value="alert"
        type="error"
        transition="scale-transition"
        dismissible
      >You need at least on ingredient to make a smoothie</v-alert>
    </v-form>
  </v-container>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  data: () => ({
    title: null,
    another: null,
    ingredients: [],
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
    alert: false,
    slug: null
  }),
  methods: {
    addSmoothie() {
      if (this.ingredients.length < 1) {
        console.log("empty array!");
        this.alert = true;
      } else if (this.title) {
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-;:@`´öåä¤%#£$€|]/g,
          lower: true
        });
        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(this.$router.push({ name: "home" }))
          .catch(err => {
            console.log(err);
          });
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
      }
    },
    removeIng(ingredient) {
      this.ingredients = this.ingredients.filter(ing => {
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

<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="smoothie in smoothies" :key="smoothie.id">
        <v-card class="ma-3">
          <v-card-title primary-title>
            <div class="headline">{{smoothie.title}}</div>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap justify-start>
              <div v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <v-chip>{{ingredient}}</v-chip>
              </div>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-layout row justify-space-between wrap>
              <v-btn
                :loading="deleteLoading"
                flat
                small
                color="grey"
                @click="deleteSmoothie(smoothie.id)"
              >
                <v-icon small left>delete</v-icon>
                <span>Delete</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn flat small color="grey" :to="`/edit-smoothie/${smoothie.slug}`">
                <span>Edit</span>
                <v-icon small right>edit</v-icon>
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from "@/firebase/init";

export default {
  data: () => ({
    smoothies: [],
    deleteLoading: false
  }),
  methods: {
    deleteSmoothie(id) {
      this.deleteLoading = true;
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id !== id;
          });
          this.deleteLoading = false;
        });
    }
  },
  created() {
    db.collection("smoothies").onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          this.smoothies.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });

    // db.collection("smoothies")
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       let smoothie = doc.data();
    //       smoothie.id = doc.id;
    //       this.smoothies.push(smoothie);
    //     });
    //   });
  }
};
</script>

<style>
</style>

<template>
  <div>

    <v-row align="center" justify="center">
      <v-container>
        <v-form @submit.prevent>
          <v-text-field
          append-icon="mdi-send"
          @click:append="getMALList"
          @keydown.enter="getMALList"
          label="Enter your MAL username to filter"
          v-model="mal_username"
          :loading="loading"

          >
          </v-text-field>
        </v-form>
      </v-container>
    </v-row>

    <v-row align="center" justify="center">
        <v-card  max-width=245 >
          <v-img :src="this.selectedVA.va_image_url"></v-img>
          <v-card-actions>
            <v-card-text  class="font-weight-medium  text-body-1 pl-2 ">{{ this.selectedVA.va_name }}</v-card-text>
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon right v-on="on" v-bind="attrs">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>

              <v-card>

                <v-card-title class="headline grey lighten-1">
                  {{this.selectedVA.va_name}}
                </v-card-title>

                <v-card-text class="pt-4">Given name:
                  {{this.selectedVA.given_name}} <br/>
                  Family name: {{this.selectedVA.family_name}}
                </v-card-text>

                <v-card-text v-html="this.selectedVA.about"></v-card-text>
                <v-card-text>Webpage:
                  {{this.selectedVA.website_url}}
                </v-card-text>

              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
    </v-row>
  </div>
</template>

<script>

export default {
  props: {
    selectedVA: {

    },

  },

  data: function(){
    return{
      loading: false,
      mal_username: "",
      allAnimeMALID: [],
      results: [],
      dialog: false,

    }
  },
  methods: {
    getMALList: function(){

      this.loading = true;
      this.results = [];

      const jikanjs = require('jikanjs');
      //Get watching anime
      jikanjs.loadUser(this.mal_username, "animelist", "watching").then((response) => {
        response.anime.forEach(userAnime => {
          this.allAnimeMALID.push(userAnime.mal_id);
        });
      }).catch((err) => {
        console.log(err);
      });
      //Get completed anime
      jikanjs.loadUser(this.mal_username, "animelist", "completed").then((response) => {

        response.anime.forEach(userAnime => {

          this.allAnimeMALID.push(userAnime.mal_id);
        });
        this.$emit('processResults',this.allAnimeMALID);
        this.loading = false;
      }).catch((err) => {
        console.log(err);
      });
    },
  }

};
</script>

<style>
</style>

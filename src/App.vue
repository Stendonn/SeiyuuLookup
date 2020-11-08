<template>
  <v-app dark>

    <v-app-bar flat clipped-left app outline >

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <span class="deep-orange--text text--lighten-5 font-weight-bold">Seiyuu</span>
        <span class="font-weight-light text-primary">Lookup</span>
      </v-toolbar-title>
    </v-app-bar>


    <v-navigation-drawer  app mini-variant mini-variant-width="65" clipped v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon @click="something">mdi-fish</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon @click="something">mdi-fish</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>

      <v-stepper class="fill-height" v-model="e1">


      <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1" editable>Search for anime</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2" editable>Select a character</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 3" step="3" editable>Input MAL Username<small>Optional</small></v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="4">Results</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
          <v-stepper-content step="1">

            <animesearch :cards="cards" v-on:resetCards="resetCards($event)" @stepup="stepup"></animesearch>


          </v-stepper-content>

          <v-stepper-content step="2">
            <listchars  :selectedVA="selectedVA" :cards="cards"  @stepup="stepup" @vaFill="vaFill"/>


          </v-stepper-content>

          <v-stepper-content step="3">
            <varoles  :selectedVA="selectedVA" @stepup="stepup" @fillResults="fillResults" @allAnimeMALID="fillUserAnime" ></varoles>


          </v-stepper-content>

          <v-stepper-content step="4">
            <results  :results="results" :selectedVA="selectedVA"></results>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>

    </v-main>





    <v-footer app padless>
      <v-col class="text-center">
        © 2020
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AnimeSearch from "@/components/AnimeSearch.vue"
import ListChars from "@/components/ListChars.vue"
import VARoles from "@/components/VARoles.vue"
import Results from "@/components/Results.vue"

export default {
  name: 'App',
  components: {
    animesearch: AnimeSearch,
    listchars: ListChars,
    varoles: VARoles,
    results: Results,
  },

  data: function(){
    return{
      drawer: false,
      cards: [],
      roleCards: [],
      e1: 1,
      step: 1,
      selectedVA:{
        va_id: null,
        va_name: null,
        va_image_url: null,
        va_roles: [],
      },
      allUserAnime: [],
      results: [],

    }
  },
  methods:{
    something: function(){

    },
    resetCards:function(){

      this.cards = [];
      this.results = [];
    },
    stepup: function(step){
      this.e1 = step;
    },
    vaFill: function(va_id, va_name, va_image_url, va_roles){
      this.selectedVA.va_id = va_id;
      this.selectedVA.va_name = va_name;
      this.selectedVA.va_image_url = va_image_url;
      this.selectedVA.va_roles = va_roles;

    },
    fillUserAnime: function(allAnimeMALID){

      this.allUserAnime = allAnimeMALID;
    },
    fillResults: function(results){

      this.results = results;
    },


  },

};
</script>
<style>
.btn-toggle {
  flex-direction:column;
}
</style>

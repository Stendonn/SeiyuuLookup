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
            <v-btn icon @click="openGithub">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>

            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon @click="something">mdi-information-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-1">
                   About
                </v-card-title>
                <br/>
                <v-card-text>
                  This is a simple app (desktop/mobile) that I have created to test my knowledge of
                  programming while also having a tool to search up Seiyuu (voice actors/actresses)
                  whenever I occasionally need to. My intended audience for this app is mainly
                  myself and my friends. I have used Ali60351's Seiyuu Nostalgia and Ervie's
                  Seiyuu.moe before and they are both great apps that inspired me to make my own
                  one that can suit my personal needs. Be sure to take a look at their great apps.
                  I am a fairly new programmer, especially when it comes to more of the front-end stuff,
                  so there may be some bugs so you can contact me if you would like to.
                </v-card-text>

                <v-card-text>
                  Here are some planned features: <br/>
                  --Anilist user filter<br/>
                  --Seiyuu search<br/>
                  --Color scheme<br/>
                  --Results cards clickable<br/>
                  --Better error handling<br/>
                  --Improve design for inputting username<br/>
                  --Optimization<br/>
                  --Anilist pictures (maybe)<br/>
                  --Ultimately want expand to anime and games but no API for games<br/>
                </v-card-text>

                <v-card-text>
                  Contact me:<br/>
                  stendon12@gmail.com
                </v-card-text>

              </v-card>
 </v-dialog>
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
      e1: 1,
      step: 1,
      selectedVA:{
        va_id: null,
        va_name: null,
        va_image_url: null,
        va_roles: [],
        about: "",
        family_name: "",
        given_name: "",
        website_url: "",
      },
      allUserAnime: [],
      results: [],
      dialog: false,

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
    vaFill: function(va_id, va_name, va_image_url, va_roles, va_about, va_family_name, va_given_name, va_website_url){
      this.selectedVA.va_id = va_id;
      this.selectedVA.va_name = va_name;
      this.selectedVA.va_image_url = va_image_url;
      this.selectedVA.va_roles = va_roles;

      this.selectedVA.about = va_about;
      this.selectedVA.family_name = va_family_name;
      this.selectedVA.given_name = va_given_name;
      this.selectedVA.website_url = va_website_url;
      var temp = String(this.selectedVA.about).replace(/\\n/g, "<br/>");

      this.selectedVA.about = temp;

    },
    fillUserAnime: function(allAnimeMALID){

      this.allUserAnime = allAnimeMALID;
    },
    fillResults: function(results){

      this.results = results;
    },
    openGithub: function(){
      window.open("https://github.com/Stendonn/SeiyuuLookup", "_blank");
    },


  },

};
</script>
<style>

</style>

<template>
  <div>
    <v-container>
      <v-autocomplete
      prepend-icon="mdi-magnify"
      label="Search and select an ANIME e.g. Shingeki no Kyojin"
      :items="entries"
      item-text="title"
      :search-input.sync="searchedTitle"
      item-value="mal_id"
      no-filter
      :loading="loading"
      @input="cardifyChars"
      v-model="model"
      autofocus
      :hide-no-data="hideData"
      no-data-text="No results found"
      color="pink"
      >
        <template v-slot:item="data">
          <v-list-item-avatar >
            <v-img :src="data.item.image_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ data.item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{data.item.type}} | {{ data.item.year}}</v-list-item-subtitle>
        </template>
      </v-autocomplete>

    </v-container>

    <v-snackbar
      class="custom-width"
      v-model="loadingAnimeSearch"

      timeout="-1"

    >
      <span>Fetching the anime...</span>
      <template v-slot:action="{ attrs }">
        <v-progress-circular v-bind="attrs" size=28  color="pink" indeterminate />
      </template>

    </v-snackbar>
    <v-snackbar v-model="error" color="error" timeout=3000>
      {{errorMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="setLoadingAnimeError"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>



</template>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script>


export default {
  props:{
    loadingAnimeSearch: Boolean,
    loadingAnimeError: Boolean
  },

  data: function(){
    return{
      test: true,
      searchedTitle: "",
      entries: [],
      model: null, //holds the mal ID
      error: false,
      timeout: null,
      hideData: true,
      loading: false,
      errorMessage: "There was a problem. Please try again."
    }
  },
  computed:{

  },
  methods:{
    setLoadingAnimeError(){
      this.$emit("loadingAnimeError", false)
    },
    //process the selection
    cardifyChars: function(){
      this.$emit('cardifyChars', this.model, "step1")
    }

  },
  watch: {
    searchedTitle(title) {
      this.hideData = true
      this.error = false;

      this.entries = [];
      this.timeout = clearTimeout(this.timeout)
      const self = this
      if(title != null){
          if(title.length > 2){
            this.loading = true
            this.timeout = setTimeout(function() {
              const axios = require('axios')
              const url = 'https://api.jikan.moe/v4/anime?q=' + title
              axios.get(url)
              .then((response)=>{
                response.data.data.forEach(anime => {
                  const entry = {title: anime.title, mal_id: anime.mal_id, image_url: anime.images.jpg.image_url, year: anime.year, type: anime.type}
                  self.entries.push(entry)

                });
              })
              .catch((error)=>{
              })
              .finally(()=>{
                self.hideData = false
                self.loading = false
              })
            }, 800)
          }
      }


    },
    loadingAnimeError: function(){
      this.error = this.loadingAnimeError
    },
    error: function(){
      if(this.error == false){
        this.setLoadingAnimeError()
      }
    }
  }

};
</script>

<style>
.custom-width .v-snack__wrapper{
  min-width: 250px
}
</style>

<template>
  <div>
    <v-container>
      <v-autocomplete
      prepend-icon="mdi-magnify"
      label="Search and select an ANIME e.g. Shingeki no Kyojin"
      :items="entries"
      item-text="title"
      :search-input.sync="searchedTitle"
      item-value="al_id"
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

      const axios = require('axios')

      var data = JSON.stringify({
        query: `
          query ($search: String){
            Page(perPage: 25){
              media(search: $search, type: ANIME){
                title {
                  romaji
                }
                id
                format
                seasonYear
                coverImage {
                  extraLarge
                }
              }
            }
          }`,
        variables: {
          search: title
        }
      })
      var config = {
        method: 'post',
        url: 'https://graphql.anilist.co',
        headers: {
          'Content-Type': 'application/json',
        },
        data : data
      }
      this.timeout = clearTimeout(this.timeout)
      const self = this
      if(title != null){
        if(title.length > 2){
          this.loading = true
          this.timeout = setTimeout(function() {

            axios(config)
            .then((response)=>{

              response.data.data.Page.media.forEach(anime => {
                const entry = {
                  title: anime.title.romaji,
                  al_id: anime.id,
                  image_url: anime.coverImage.extraLarge,
                  year: anime.seasonYear,
                  type: anime.format
                }
                self.entries.push(entry)
              })

            })
            .catch((error)=>{
              console.log(error)

            })
            .finally(()=>{
              self.hideData = false
              self.loading = false
            })

          }, 800)
        }
        else{
          this.loading = false
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

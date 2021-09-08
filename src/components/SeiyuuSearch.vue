<template>
  <div>
    <v-container>

      <v-autocomplete
      prepend-icon="mdi-magnify"
      label="Search and select a SEIYUU e.g. Kana Hanazawa"
      :items="entries"
      item-text="name"
      :search-input.sync="searchedSeiyuu"
      item-value="mal_id"
      no-filter
      @input="allRoles"
      v-model="model"
      :loading="loading"
      autofocus
      :hide-no-data="hideData"
      no-data-text="No results found"
      :snackbar="snackbar"
      color="pink"
      >
        <template v-slot:item="data">
          <v-list-item-avatar >
            <v-img :src="data.item.image_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ data.item.name }}</v-list-item-title>
        </template>

      </v-autocomplete>

    </v-container>

    <v-snackbar
      v-model="loadingVASearch"
      class="custom-width"
      timeout=8000
    >
      Fetching the seiyuu...
      <template v-slot:action="{ attrs }">
            <v-progress-circular v-bind="attrs" size=28 class="justify-end align-end" color="pink" indeterminate />
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="error" timeout=3000>
      {{errorMessage}}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="setLoadingVAError"
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
    loadingVAError: Boolean,
    loadingVASearch: Boolean
  },
  data: function(){
    return{
      searchedSeiyuu: "",
      entries: [],
      model: null, //holds the mal ID
      loading: false,
      snackbar: false,
      error: false,
      timeout: null,
      searching: false,
      hideData: true,
      errorMessage: "There was a problem. Please try again.",

    }
  },
  methods:{
    allRoles(){
      this.$emit("selectVA", this.model)
    },
    setLoadingVAError: function(){
      this.$emit("setLoadingVAError", false)
    }
  },
  watch:{
    searchedSeiyuu(name){
      this.hideData = true
      this.error = false;
      this.entries = [];
      this.timeout = clearTimeout(this.timeout)
      const self = this
      this.timeout = setTimeout(function() {
        if(name != null){
          if(name.length > 2){
            const axios = require('axios')
            self.loading = true;

            const url = 'https://api.jikan.moe/v4/people?q=' + name + '&limit=10'
            axios.get(url)
            .then((response)=>{

              response.data.data.forEach(person => {

                self.entries.push(Object.assign({}, {name: person.name, mal_id: person.mal_id, image_url: person.images.jpg.image_url}));

              });
            })
            .catch(()=>{
              this.errorMessage = "There was a problem. Please try again."
              this.error = true
            })
            .finally(()=>{
              self.loading = false
              self.hideData = false
            })
          }
          else{
            self.loading = false;

          }
        }
      }, 800)
    },
    loadingVAError: function(){
      this.error = this.loadingVAError
    },
    error: function(){
      if(this.error == false){
        this.setLoadingVAError()
      }
    }
  },

};
</script>

<style>
  .custom-width .v-snack__wrapper{
    min-width: 250px
  }
</style>

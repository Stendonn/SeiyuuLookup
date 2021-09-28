<template>
  <div>
    <v-container>

      <v-autocomplete
      prepend-icon="mdi-magnify"
      label="Search and select a SEIYUU e.g. Kana Hanazawa"
      :items="entries"
      item-text="name"
      :search-input.sync="searchedSeiyuu"
      item-value="id"
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

      const axios = require('axios')

      var data = JSON.stringify({
        query: `
          query ($search: String){
            Page(perPage: 10){
              staff(search: $search){
                id
                image{
                  large
                }
                name{
                  full
                }
              }
            }
          }`,
        variables: {
          search: name
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
      if(name != null){
        if(name.length > 2){
          this.loading = true
          this.timeout = setTimeout(function() {

            axios(config)
            .then((response)=>{

              response.data.data.Page.staff.forEach(staff => {
                const entry = {
                  name: staff.name.full,
                  id: staff.id,
                  image_url: staff.image.large,
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

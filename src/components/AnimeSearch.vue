<template>
  <div>
    <v-container>

      <v-autocomplete
      prepend-icon="mdi-magnify"
      label="Search and select"
      :items="entries"
      item-text="title"
      :search-input.sync="searchedTitle"
      item-value="mal_id"
      no-filter
      @keyup="searching"
      @input="cardifyChars"
      v-model="model"
      :loading="loading"
      autofocus
      hide-no-data
      :snackbar="snackbar"
      >
        <template v-slot:item="data">
          <v-list-item-avatar >
            <v-img :src="data.item.image_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ data.item.title }}</v-list-item-title>
        </template>

      </v-autocomplete>

    </v-container>
    <v-snackbar
       v-model="snackbar"
     >
       Please enter more than 3 characters

       <template v-slot:action="{ attrs }">
         <v-btn
           color="pink"
           text
           v-bind="attrs"
           @click="snackbar = false"
         >
           Close
         </v-btn>
       </template>
     </v-snackbar>

  </div>

</template>

<script>

export default {
  props:{
    cards: Array,
  },

  data: function(){
    return{
      searchedTitle: "",
      entries: [],
      model: null, //holds the mal ID
      loading: false,
      snackbar: false,
      error: false,

    }
  },
  computed:{

  },
  methods:{

    searching: function(){
      this.error = false;
      this.loading = true;
      this.entries = [];

      try{
        if(this.searchedTitle.length > 2){

          const jikanjs = require('jikanjs');

          jikanjs.search("anime", this.searchedTitle,1,{limit:20}).then((response) => {

            response.results.forEach(anime => {

              this.entries.push(Object.assign({}, {title: anime.title, mal_id: anime.mal_id, image_url: anime.image_url}));

            });

            this.loading = false;

          }).catch((err) => {
            console.log(err);
          });
        }
        else{
          this.loading = false;

        }
      }
      catch(err){
        this.snackbar = true;
        this.loading = false;
        console.log(err);
      }

    },
    //process the selection
    cardifyChars: function(){

      this.$emit('resetCards');

      const jikanjs = require('jikanjs');

      jikanjs.loadAnime(this.model, "characters_staff").then((response) => {
        response.characters.forEach(char => {
          char.voice_actors.forEach(va => {

            if(va.language == 'Japanese'){

              this.cards.push(Object.assign({}, {name: char.name, image_url: char.image_url, role: char.role, va_id: va.mal_id, voice_actor: va.name, va_image_url: va.image_url}));
            }
          })

        });

        this.$emit('stepup', 2);
      })

    }

  },

};
</script>

<style>

</style>

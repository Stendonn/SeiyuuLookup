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
      >
        <template v-slot:item="data">
          <v-list-item-avatar >
            <v-img :src="data.item.image_url"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>{{ data.item.title }}</v-list-item-title>
        </template>

      </v-autocomplete>

    </v-container>


  </div>
</template>

<script>

export default {
  props:{
    cards: Array,
  },
  components: {
  },

  data: function(){
    return{
      searchedTitle: "",
      entries: [],
      model: null, //holds the mal ID
      loading: false,

    }
  },
  computed:{

  },
  methods:{

    searching: function(){
      this.loading = true;
      this.entries = [];


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

<template>
  <div>
    <v-btn
     v-scroll="onScroll"
     v-show="fab"
     fab
     light
     fixed
     bottom
     right

     @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-row >
      <v-col align="center">
        <v-container>
        <v-form @submit.prevent>
          <v-text-field
          append-icon="mdi-send"
          @click:append="getMALList"
          @keydown.enter="getMALList"
          label="Enter your MAL username to filter"
          v-model="mal_username"
          :loading="loading"
          autofocus
          ></v-text-field>
        </v-form>
       </v-container>
        <v-card  max-width=245 >

          <v-img :src="this.selectedVA.va_image_url"></v-img>
          <v-card-title>{{ this.selectedVA.va_name }}</v-card-title>


        </v-card>


      </v-col>

    </v-row>

    <v-row >
      <v-col v-for="(role, index) in selectedVA.va_roles" :key="index" xs=12 sm=6 lg=6>
        <v-card rounded>
          <v-list-item>
            <v-list-item-avatar size="125"  rounded>
              <v-img :src="role.character.image_url"></v-img>

            </v-list-item-avatar>
            <v-list-item-content>

              <v-list-item-title class="animename">{{ role.anime.name }}</v-list-item-title>
              <v-list-item-title class="charname">{{ role.character.name }}</v-list-item-title>

            </v-list-item-content>


          </v-list-item>

        </v-card>
      </v-col>

    </v-row>


  </div>
</template>

<script>

export default {
  props: {
    selectedVA:{

    },

  },

  data: function(){
    return{

      mal_username: null,
      allAnimeMALID: [],
      results: [],
      loading: false,
      fab: false,


    }
  },
  methods:{
    getMALList: function(){
      this.loading = true;
      this.results = [];

      const jikanjs = require('jikanjs');

      jikanjs.loadUser(this.mal_username, "animelist", "completed").then((response) => {


        response.anime.forEach(userAnime => {

          this.allAnimeMALID.push(userAnime.mal_id);
        });



        this.selectedVA.va_roles.forEach(role => {

          var i = 0;
          for(i = 0; i < this.allAnimeMALID.length; i++){
            if(role.anime.mal_id == this.allAnimeMALID[i]){

                this.results.push(Object.assign({}, {anime_title: role.anime.name, char_image_url: role.character.image_url, char_name: role.character.name}));
                break;
            }
          }
        });

        this.$emit('fillResults', this.results);
        this.$emit('stepup', 4);

        this.loading = false;

      });


    },
    onScroll (e) {
      if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
  },


};
</script>

<style>
.animename{
  font-size:110%;
}
.charname{
  color:gray;
}
</style>

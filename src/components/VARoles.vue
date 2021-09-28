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
    <v-lazy transition="fade-transition">
      <usernameentry @processResults="processResults($event)" :selectedVA="selectedVA"/>
    </v-lazy>
    <br/>

    <v-row>
      <v-col xs=12 sm=12 md=6 lg=4 v-for="(role, index) in selectedVA.va_roles" :key="index">
        <v-lazy transition="fade-transition">

          <v-card>
              <v-list-item :class="role.role === 'MAIN' ? 'mainChar' : 'sideChar'">

                <v-list-item-avatar size="125"  rounded>
                  <v-img  :src="role.media[0].coverImage.large">
                    <template v-slot:placeholder>
                      <v-row class="fill-height" align="center" justify="center">
                        <v-progress-circular size=50 color="pink" indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title @click="animeSelect(role.media[0].id)" class="animename">
                    <v-tooltip  top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          {{ role.media[0].title.romaji }}
                        </span>
                      </template>
                      <span>
                        {{role.media[0].title.romaji }}
                      </span>
                    </v-tooltip>
                  </v-list-item-title>

                  <v-list-item-title class="charname">
                    {{ role.node.name.full }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                v-if="isMobile == 'lg' || isMobile == 'md'"
                size="125"
                rounded
                >
                  <v-img :src="role.node.image.large">
                    <template v-slot:placeholder>
                      <v-row class="fill-height" align="center" justify="center">
                        <v-progress-circular size=50 color="pink" indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-list-item-avatar>
              </v-list-item>
          </v-card>
        </v-lazy>
      </v-col>


    </v-row>
    <v-snackbar
      v-model="loadingAnimeSearchS3"
      class="custom-width"
      timeout=8000
    >
      Fetching the anime...
      <template v-slot:action="{ attrs }">
        <v-progress-circular v-bind="attrs" size=28 class="justify-end align-end" color="pink" indeterminate />
      </template>
    </v-snackbar>
    <v-snackbar v-model="error" color="error" timeout=800>
      There was a problem. Please try again.
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="error = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import UsernameEntry from "@/components/UsernameEntry.vue"
export default {
  components:{
    usernameentry: UsernameEntry,
  },
  props: {
    selectedVA:{

    },
    loadingAnimeSearchS3: Boolean,
    loadingAnimeErrorS3: Boolean,
    isMobile: String

  },

  data: function(){
    return{
      allUserAnime: [],
      results: [],
      loading: false,
      fab: false,
      mal_username: "",
      error: false
    }
  },
  methods:{
    processResults: function(allAnimeMALID){
      this.loading = true;
      this.results = [];
      this.allUserAnime = allAnimeMALID;

      this.selectedVA.va_roles.forEach(role => {
        var i = 0;
        for(i = 0; i < this.allUserAnime.length; i++){
          if(role.media[0].idMal == this.allUserAnime[i]){
            this.results.push(Object.assign({},
              {
                anime_title: role.media[0].title.romaji,
                char_image_url: role.node.image.large,
                char_name: role.node.name.full,
                role: role.role
              }));
            break;
          }
        }
      });
      this.$emit('fillResults', this.results);
      this.$emit('stepup', 4);
      this.loading = false;
    },
    onScroll (e) {
      if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    animeSelect(mal_id){
      this.$emit("cardifyChars", mal_id, 'step3')
    },
    setLoadingAnimeError(){
      this.$emit("loadingAnimeErrorS3", false)
    }
  },
  watch:{
    error: function(){
      if(this.error == false){
        this.setLoadingAnimeError()
      }
    },
    loadingAnimeErrorS3: function(){
      this.error = this.loadingAnimeErrorS3
    }
  }


};
</script>

<style>
  .animename{
    font-size:110%;
  }
  .charname{
    color:gray;
  }
  .mainChar{
    border: 1px solid #ec407a;
  }
  .sideChar{
    border: 1px solid gray
  }
  .custom-width .v-snack__wrapper{
    min-width: 250px
  }
</style>

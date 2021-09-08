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

    <usernameentry @processResults="processResults($event)" :selectedVA="selectedVA"/>
    <br/>

    <v-row>
      <v-col xs=12 sm=12 md=6 lg=4 v-for="(role, index) in selectedVA.va_roles" :key="index">
        <v-lazy transition="fade-transition">
          <v-card>
              <v-list-item :class="role.role === 'Main' ? 'mainChar' : 'sideChar'">

                <v-list-item-avatar size="125"  rounded>
                  <v-img  :src="role.anime.image_url"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title @click="animeSelect(role.anime.mal_id)" class="animename">
                    <v-tooltip  top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          {{ role.anime.name }}
                        </span>
                      </template>
                      <span>
                        {{ role.anime.name }}
                      </span>
                    </v-tooltip>
                  </v-list-item-title>

                  <v-list-item-title class="charname">
                    {{ role.character.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar
                v-if="isMobile == 'lg' || isMobile == 'md'"
                size="125"
                rounded
                >
                  <v-img  :src="role.character.image_url"></v-img>
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
          if(role.anime.mal_id == this.allUserAnime[i]){
            this.results.push(Object.assign({},
              {
                anime_title: role.anime.name,
                char_image_url: role.character.image_url,
                char_name: role.character.name,
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
    border: 1px solid green
  }
  .sideChar{
    border: 1px solid gray
  }
  .custom-width .v-snack__wrapper{
    min-width: 250px
  }
</style>

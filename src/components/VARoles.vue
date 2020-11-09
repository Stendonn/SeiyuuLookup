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

    <usernameentry @processResults="processResults" :selectedVA="selectedVA"/>
    <br/>

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
import UsernameEntry from "@/components/UsernameEntry.vue"
export default {
  components:{
    usernameentry: UsernameEntry,
  },
  props: {
    selectedVA:{

    },

  },

  data: function(){
    return{

      allUserAnime: [],
      results: [],
      loading: false,
      fab: false,
      mal_username: "",

    }
  },
  methods:{
    processResults: function(allUserAnime){
      this.loading = true;
      this.results = [];
      this.allUserAnime = allUserAnime;
      this.selectedVA.va_roles.forEach(role => {

        var i = 0;
        for(i = 0; i < this.allUserAnime.length; i++){
          if(role.anime.mal_id == this.allUserAnime[i]){

            this.results.push(Object.assign({},
              {anime_title: role.anime.name,
                char_image_url: role.character.image_url,
                char_name: role.character.name}));
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

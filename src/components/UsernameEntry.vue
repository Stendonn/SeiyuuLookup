<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col>
          <v-card  max-width=245 >
            <v-img :src="this.selectedVA.va_image_url"></v-img>
            <v-card-actions>
              <v-card-text  class="font-weight-medium  text-body-1 pl-2 ">{{ this.selectedVA.va_name }}</v-card-text>
              <v-dialog
                v-model="dialog"
                width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon right v-on="on" v-bind="attrs">
                    <v-icon>mdi-information-outline</v-icon>
                  </v-btn>
                </template>

                <v-card>

                  <v-card-title class="headline grey lighten-1">
                    {{this.selectedVA.va_name}}
                  </v-card-title>

                  <v-card-text class="pt-4">Given name:
                    {{this.selectedVA.va_given_name}} <br/>
                    Family name: {{this.selectedVA.va_family_name}}<br/>
                    Birthday: {{this.selectedVA.va_birthday}}
                  </v-card-text>

                  <v-card-text class="pre-formatted" v-html="this.selectedVA.va_about"></v-card-text>
                  <v-card-text>
                    Webpage:
                    <a target="_blank" :href="this.selectedVA.va_website_url">{{this.selectedVA.va_website_url}}</a>

                  </v-card-text>

                </v-card>

              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-form @submit.prevent>

              <v-radio-group
                v-model="platform"
                row
                class="justify-center"
                mandatory
                dark
              >
                <v-radio value="mal" color="#01579B">
                  <template v-slot:label>
                    <div><strong class="light-blue--text text--darken-4">MyAnimeList</strong></div>
                  </template>
                </v-radio>
                <v-radio value="anilist" color="#29B6F6">
                  <template v-slot:label>
                    <div>
                      <strong class="white--text">ANI</strong>
                      <strong class="light-blue--text text--lighten-1">LIST</strong>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            <v-text-field
            append-icon="mdi-send"
            @click:append="platform == 'mal' ? getMALList() : getALList()"
            @keydown.enter="platform == 'mal' ? getMALList() : getALList()"
            :label="platform == 'mal' ? malLabel : anilistLabel"
            v-model="username"
            outlined
            dark
            :color="platform == 'mal' ? '#01579B' : '#29B6F6'"
            >
            </v-text-field>
          </v-form>
        </v-col>
      </v-row>

    </v-container>
    <v-snackbar
      v-model="error"
      color="error"
      >
        {{errorMessage}}
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
    <v-snackbar
      v-model="fetching"
      class="custom-width"
      timeout="-1"
    >
      Fetching your profile...
      <template v-slot:action="{ attrs }">
        <v-progress-circular v-bind="attrs" size=28  color="pink" indeterminate />
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  props: {
    selectedVA: {

    },

  },

  data: function(){
    return{
      loading: false,
      username: "",
      allAnimeMALID: [],
      results: [],
      dialog: false,
      error: false,
      errorMessage: "",
      platform: "",
      malLabel: "Enter your MyAnimeList username",
      anilistLabel: "Enter your AniList username",
      fetching: false

    }
  },
  methods: {
    getMALList: function(){
      this.fetching = true;
      this.results = [];
      this.allAnimeMALID = [];

      const axios = require('axios')


      const allAnimeUrl = 'https://api.jikan.moe/v3/user/'+ this.username +'/animelist'
      axios.get(allAnimeUrl)
      .then((response)=>{
        response.data.anime.forEach((anime)=>{
          if(anime.watching_status == 1 || anime.watching_status == 2){
            this.allAnimeMALID.push(anime.mal_id)
          }
        })
        this.$emit('processResults',this.allAnimeMALID);
      })
      .catch(()=>{
        this.error = true
        this.errorMessage = "There was a problem. Please try again."
      })
      .finally(()=>{
        this.fetching = false
      })

    },
    getALList(){
      this.fetching = true;
      this.results = [];
      this.allAnimeMALID = [];
      const axios = require('axios')

      var data = JSON.stringify({
        query: `
          query ($username: String){
            MediaListCollection(userName: $username, type:ANIME) {
          		user {
          		  id
          		}

          		lists {
                name
                entries {
                  media {
                    idMal
                  }
                }
          		}
            }
          }`,
        variables: {
          username: this.username
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

      axios(config)
      .then((response)=>{
        //get all completed and watching anime
        var allAnimeMedia = []
        response.data.data.MediaListCollection.lists.forEach((list)=>{
          if(list.name == "Completed" || list.name == "Watching"){
            allAnimeMedia = allAnimeMedia.concat(list.entries)
          }
        })
        allAnimeMedia.forEach((anime)=>{
          this.allAnimeMALID.push(anime.media.idMal)
        })

        this.$emit('processResults',this.allAnimeMALID);

      })
      .catch(()=>{
        this.error = true
        this.errorMessage = "There was a problem. Please try again."

      })
      .finally(()=>{
        this.fetching = false
      })
    },

  }

};
</script>

<style>
  .pre-formatted{
    white-space: pre-wrap
  }
  .custom-width .v-snack__wrapper{
    min-width: 250px
  }

</style>

<template>
  <v-app dark>

    <v-app-bar flat clipped-left app outline >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span class="pink--text  font-weight-bold">Seiyuu</span>
        <span class="font-weight-light text-primary">Lookup</span>
      </v-toolbar-title>
    </v-app-bar>


    <v-navigation-drawer  app mini-variant mini-variant-width="65" clipped v-model="drawer">
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-btn icon @click="openGithub">
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-1">
                   About
                </v-card-title>
                <br/>
                <v-card-text>
                  Seiyuu: voice actor or actress (radio, animation, etc.)<br><br>

                  An application to see what characters on your
                  MyAnimeList/AniList share the same seiyuu that has been
                  selected.<br><br>

                  You can start with searching an anime for a seiyuu or you can
                  directly search for the seiyuu.<br>
                  --------------------------------------------------------------
                  <br>
                  Green border - main character<br>
                  White border - side character
                </v-card-text>
                <v-card-text>
                  Planned features: <br/>
                  --Optimization<br/>
                  --Ultimately want expand to games<br/>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-stepper class="fill-height" v-model="e1">
        <v-stepper-header>

          <v-stepper-step
            color="pink"
            :complete="e1 > 1"
            step="1"
            :editable="showStep1"
          >
            Searching: {{radioGroup}}
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            color="pink"
            :complete="e1 > 2"
            step="2"
            :editable="showStep2"
          >
            <div :class="radioGroup=='seiyuu' ? 'text-decoration-line-through' : ''">
              Select a character
            </div>
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            color="pink"
            :complete="e1 > 3"
            step="3"
            :editable="showStep3"
          >
            Input your username
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step color="pink" step="4">Results</v-stepper-step>

        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-row justify="center">
              <v-col lg=8>
                <v-container >
                  <v-radio-group
                    v-model="radioGroup"
                    row
                    class="justify-center"
                    mandatory
                    dark
                  >
                    <v-radio
                      label="Anime Search"
                      value="anime"
                      color="pink"
                    />
                    <v-radio
                      label="Seiyuu Search"
                      value="seiyuu"
                      color="pink"
                    />
                  </v-radio-group>
                </v-container>

                <animesearch
                  v-if="radioGroup == 'anime'"
                  :cards="cards"
                  :loadingAnimeSearch="loadingAnimeSearch"
                  :loadingAnimeError="loadingAnimeError"
                  v-on:resetCards="resetCards($event)"
                  @cardifyChars="cardifyChars"
                  @stepup="stepup"
                  @loadingAnimeError="setLoadingAnimeError"
                />
                <seiyuusearch
                  v-if="radioGroup == 'seiyuu'"
                  :loadingVASearch="loadingVASearch"
                  :loadingVAError="loadingVAError"
                  @setLoadingVAError="setLoadingVAError"
                  @selectVA="selectVA"
                  @stepup="stepup"
                  @vaFill="vaFill"
                />

              </v-col>
            </v-row>
          </v-stepper-content>
          <v-stepper-content step="2">

            <listchars

              :cards="cards"
              :loadingVASearch="loadingVASearch"
              :loadingVAError="loadingVAError"
              @setLoadingVAError="setLoadingVAError"
              @stepup="stepup"
              @vaFill="vaFill"
              @selectVA="selectVA"

            />

          </v-stepper-content>
          <v-stepper-content step="3">

            <varoles
              :selectedVA="selectedVA"
              :loadingAnimeSearchS3="loadingAnimeSearchS3"
              :loadingAnimeErrorS3="loadingAnimeErrorS3"
              :isMobile="isMobile"
              @stepup="stepup"
              @fillResults="fillResults"
              @allAnimeMALID="fillUserAnime"
              @cardifyChars="cardifyChars"
              @setLoadingAnimeErrorS3="setLoadingAnimeErrorS3"
              >
            </varoles>

          </v-stepper-content>

          <v-stepper-content step="4">

            <results  :results="results" :selectedVA="selectedVA"></results>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>

    <v-footer app padless>
      <v-col class="text-center">
        © 2020
      </v-col>
    </v-footer>

  </v-app>
</template>

<script>
import AnimeSearch from "@/components/AnimeSearch.vue"
import ListChars from "@/components/ListChars.vue"
import VARoles from "@/components/VARoles.vue"
import SeiyuuSearch from "@/components/SeiyuuSearch.vue"
import Results from "@/components/Results.vue"


export default {
  name: 'App',
  components: {
    animesearch: AnimeSearch,
    listchars: ListChars,
    varoles: VARoles,
    results: Results,
    seiyuusearch: SeiyuuSearch,
  },

  data: function(){
    return{
      drawer: false,
      cards: [],
      e1: 1,
      step: 1,
      selectedVA:{
        // va_id: null,
        // va_name: null,
        // va_image_url: null,
        // va_roles: [],
        // va_about: "",
        // va_family_name: "",
        // va_given_name: "",
        // va_website_url: "",
        // va_birthday: ""
      },
      allUserAnime: [],
      results: [],
      dialog: false,
      radioGroup: "anime",
      timeout: null,
      showStep1: false,
      showStep2: false,
      showStep3: false,
      loadingAnimeSearch: false,
      loadingAnimeError: false,
      loadingAnimeSearchS3: false,
      loadingAnimeErrorS3: false,
      loadingVASearch: false,
      loadingVAError: false
    }
  },
  computed:{
    isMobile: function(){
      return this.$vuetify.breakpoint.name
    }
  },
  watch:{
    radioGroup: function(){
      if(this.radioGroup == "anime" && this.e1 == 2){
        this.showStep2 = true
      }
      else{
        this.showStep2 = false
      }
    },
    e1: function(){
      this.showStep1 = false
      this.showStep2 = false
      this.showStep3 = false

      if(this.radioGroup == 'anime'){
        if(this.e1 == 2){
          this.allUserAnime = []
          this.results = []
          this.selectedVA = []

          this.showStep1 = true
        }
        else if(this.e1 == 3){
          this.results = []
          this.allUserAnime = []
          this.showStep1 = true
          this.showStep2 = true
        }
        else if(this.e1 == 4){
          this.showStep1 = true
          this.showStep2 = true
          this.showStep3 = true
        }
      }
      if(this.radioGroup == 'seiyuu'){
        if(this.e1 == 3){
          this.showStep1 = true
        }
        else if(this.e1 == 4){
          this.showStep1 = true
          this.showStep3 = true
        }
      }
    }
  },
  methods:{
    cardifyChars:function(id, step){
      this.radioGroup = "anime"
      this.cards = []
      this.results = []

      if(step == 'step1'){
        this.loadingAnimeSearch = true
        this.loadingAnimeError = false
      }
      else if(step == 'step3'){
        this.loadingAnimeSearchS3 = true
        this.loadingAnimeErrorS3 = false
      }
      var pageNum = 1
      const axios = require('axios')
      var data = JSON.stringify({
        query: `
          query ($id: Int, $page: Int){
            Media(id: $id){
              id
              coverImage {
                extraLarge
              }
              characters(page: $page, sort: ROLE) {
                edges {
                  node {
                    id
                    name {
                      full
                    }
                    image {
                      large
                    }
                  }
                  role
                  voiceActorRoles(language: JAPANESE){
                    voiceActor {
                      id
                      name{
                        full
                      }
                      image{
                        large
                      }
                    }
                    roleNotes
                  }
                }
                pageInfo{
                  lastPage
                }
              }
            }
          }`,
        variables: {
          id: id,
          page: pageNum
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

        response.data.data.Media.characters.edges.forEach(char=>{
          char.voiceActorRoles.forEach(va=>{
            this.cards.push(Object.assign({}, {
              name: char.node.name.full,
              image_url: char.node.image.large,
              role: char.role,
              va_id: va.voiceActor.id,
              voice_actor: va.voiceActor.name.full,
              va_image_url: va.voiceActor.image.large, //dont need
              va_roleNotes: va.roleNotes
            }));
          })
        })
        while(pageNum <= response.data.data.Media.characters.pageInfo.lastPage){
          pageNum++
          data = JSON.stringify({
            query: `
              query ($id: Int, $page: Int){
                Media(id: $id){
                  id
                  coverImage {
                    extraLarge
                  }
                  characters(page: $page, sort: ROLE) {
                    edges {
                      node {
                        id
                        name {
                          full
                        }
                        image {
                          large
                        }
                      }
                      role
                      voiceActorRoles(language: JAPANESE){
                        voiceActor {
                          id
                          name{
                            full
                          }
                          image{
                            large
                          }
                        }
                        roleNotes
                      }
                    }
                    pageInfo{
                      lastPage
                    }
                  }
                }
              }`,
            variables: {
              id: id,
              page: pageNum
            }
          })
          config = {
            method: 'post',
            url: 'https://graphql.anilist.co',
            headers: {
              'Content-Type': 'application/json',
            },
            data : data
          }
          axios(config)
          .then((response)=>{
            response.data.data.Media.characters.edges.forEach(char=>{
              char.voiceActorRoles.forEach(va=>{
                this.cards.push(Object.assign({}, {
                  name: char.node.name.full,
                  image_url: char.node.image.large,
                  role: char.role,
                  va_id: va.voiceActor.id,
                  voice_actor: va.voiceActor.name.full,
                  va_image_url: va.voiceActor.image.large, //dont need
                  va_roleNotes: va.roleNotes
                }));
              })
            })
          })

        }


        // setTimeout(()=>{
        if(step == 'step1'){
          this.loadingAnimeSearch = false

        }
        else if(step == 'step3'){
          this.loadingAnimeSearchS3 = false
        }
        this.stepup(2)
        this.$vuetify.goTo(0)
        this.selectedVA = {}
        // }, 1000)
      })
      .catch((error)=>{
        console.log(error)
        if(step == 'step1'){
          this.loadingAnimeError = true
          this.loadingAnimeSearch = false

        }
        else if(step == 'step3'){
          this.loadingAnimeErrorS3 = true
          this.loadingAnimeSearchS3 = false
        }
      })
      .finally(()=>{

      })
    },
    selectVA: function(vaID){

      if(this.loadingVASearch == false){
        this.loadingVASearch = true
        const axios = require('axios')
        axios.defaults.timeout = 8000
        var data = JSON.stringify({
          query: `
            query ($id: Int){
            	Staff(id: $id){
                name {
                  full
                  native
                }
                image {
                  large
                  medium
                }
                dateOfBirth {
                  year
                  month
                  day
                }
                age
                homeTown
                description
                gender
                bloodType
                characters(page: 1) {
                  edges {
                    role
                    node{
                      name {
                        full
                      }
                      image{
                        large
                      }
                    }
                    media {
                      id
                      idMal
                      title {
                        romaji
                      }
                      coverImage{
                        large
                      }
                    }
                  }
                  pageInfo {
                    lastPage
                  }
                }
              }
            }`,
          variables: {
            id: vaID
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
        var pageNum = 1
        axios(config)
        .then((response)=>{

          const staff = response.data.data.Staff

          const native_name = staff.name.native
          const name = staff.name.full
          const about = staff.description
          const dob = staff.dateOfBirth
          const birthday = new Date(dob.year, dob.month, dob.day)
          const formattedBirthday = Intl.DateTimeFormat('en-US',{month: 'long'})
                                    .format(birthday) + " " + birthday
                                    .getDate() + birthday.getFullYear()
          const age = staff.age
          const gender = staff.gender
          const bloodType = staff.bloodType
          const image_url = staff.image.large
          const id = vaID
          const hometown = staff.homeTown


          var voice_acting_roles = staff.characters.edges

          const seiyuuProfile = {
            va_id: id,
            va_name: name,
            va_image_url: image_url,
            va_roles: voice_acting_roles,
            va_about: about,
            va_native_name: native_name,
            va_birthday: formattedBirthday,
            va_age: age,
            va_gender: gender,
            va_hometown: hometown,
            va_bloodtype: bloodType
          }

          while(pageNum < staff.characters.pageInfo.lastPage){
            pageNum++
            var data = JSON.stringify({
              query: `
                query ($id: Int, $page: Int){
                  Staff(id: $id){
                    characters(page: $page) {
                      edges {
                        node{
                          name {
                            full
                          }
                          image{
                            large
                          }
                        }
                        media {
                          id
                          idMal
                          title {
                            romaji
                          }
                          coverImage{
                            large
                          }
                        }
                      }
                      pageInfo {
                        lastPage
                      }
                    }
                  }
                }`,
              variables: {
                id: vaID,
                page: pageNum
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
              var additionalEdges = seiyuuProfile.va_roles.concat(response.data.data.Staff.characters.edges)
              seiyuuProfile.va_roles = additionalEdges

            })

          }
          this.selectedVA = seiyuuProfile
        })
        .catch((error)=>{
          console.log(error)
          this.loadingVASearch = false
          this.loadingVAError = true
        })
        .finally(()=>{
          setTimeout(()=>{
            this.loadingVASearch = false
            this.stepup(3)
          }, 800)

        })
      }

    },
    resetCards:function(){
      this.cards = [];
      this.results = [];
    },
    stepup: function(step){
      this.e1 = step;
      this.$vuetify.goTo(0);
    },
    vaFill: function(seiyuuProfile){
      this.selectedVA = seiyuuProfile
    },
    fillUserAnime: function(allAnimeMALID){
      this.allUserAnime = allAnimeMALID;
    },
    fillResults: function(results){
      this.results = results;
    },
    setLoadingVAError: function(val){
      this.loadingVAError = val
    },
    setLoadingAnimeError: function(val){
      this.loadingAnimeError = val
    },
    setLoadingAnimeErrorS3: function(val){
      this.loadingAnimeErrorS3 = val
    },
    openGithub: function(){
      window.open("https://github.com/Stendonn/SeiyuuLookup", "_blank");
    },
  },

};
</script>
<style>

</style>

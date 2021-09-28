
<template>
    <div>
      <v-row>
        <v-col v-for="(char, index) in cards" :key="index" sm=4 md=3 lg=2 cols=6>
          <v-lazy transition="fade-transition">
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
                ripple
                @click="selectVA(char.va_id)"

              >
                <v-img
                  :class="char.role === 'MAIN' ? 'mainChar' : 'sideChar'"
                  aspect-ratio="0.6"
                  :src="char.image_url"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height" align="center" justify="center">
                      <v-progress-circular size=150 color="pink" indeterminate />
                    </v-row>
                  </template>

                </v-img>

                <v-card-text class="text-h6 pb-0 white--text ">{{char.name}}</v-card-text>
                <v-card-text class="text-body-2 pt-0 grey--text">
                  {{char.voice_actor}}
                  <span v-if="char.va_roleNotes != null">
                    ({{char.va_roleNotes}})
                  </span>
                </v-card-text>

              </v-card>
            </v-hover>
          </v-lazy>
        </v-col>

    </v-row>
      <v-snackbar
        v-model="loadingVASearch"
        class="custom-width"
        timeout="-1"
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
    cards: Array,
    loadingVASearch: Boolean,
    loadingVAError: Boolean
  },

  data: function(){
    return{
      searching: false,
      error: false,
      errorMessage: "There was a problem. Please try again.",
    }
  },
  watch:{
    loadingVAError: function(){
      this.error = this.loadingVAError
    },
    error: function(){
      if(this.error == false){
        this.setLoadingVAError()
      }

    }
  },

  methods:{
    selectVA: function(vaID){
      this.$emit("selectVA", vaID)
    },
    setLoadingVAError: function(){
      this.$emit("setLoadingVAError", false)
    }
  },

};
</script>

<style>
  .mainChar{
    border: 1px solid green
  }
  .sideChar{
    border: 1px solid g
  }
  .custom-width .v-snack__wrapper{
    min-width: 250px
  }
</style>

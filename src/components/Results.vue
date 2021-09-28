<template>
  <div>
    <v-row align="center" justify="center">

      <v-card  max-width=245>

        <v-img  :src="this.selectedVA.va_image_url"></v-img>

        <v-card-title class="font-weight-medium px-2 py-2 pa-3 justify-center">
          <span>{{ this.selectedVA.va_name }}</span>

        </v-card-title>
        <v-card-subtitle class="px-2 py-2 pa-1 text-center">
          <span>{{ this.selectedVA.va_native_name}}</span>
        </v-card-subtitle>

      </v-card>

    </v-row>
    <v-row>
      <v-col v-for="(char, index) in results" :key="index" sm=4 md=3 lg=2 cols=6>
        <v-card >
          <v-img  :class="char.role == 'MAIN' ? 'mainChar' : 'sideChar'" :src="char.char_image_url" aspect-ratio="0.6" >
            <template v-slot:placeholder>

                <v-row class="fill-height" align="center" justify="center">
                <v-progress-circular size=150 color="white" indeterminate />
              </v-row>
            </template>
          </v-img>

          <v-card-text class="text-h6 pb-0 white--text">{{char.char_name}}</v-card-text>
          <v-card-text class="text-body-2 pt-0 grey--text">{{char.anime_title}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  props: {
    results: Array,
    selectedVA: {

    },
  },

  data: function(){
    return{
      dialog: false,
    }
  },

};
</script>

<style>
  .mainChar{
    border: 1px solid #ec407a;
  }
  .sideChar{
    border: 1px solid gray
  }
  .pre-formatted{
    white-space: pre-wrap
  }
</style>

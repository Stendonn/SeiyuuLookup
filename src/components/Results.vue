<template>
  <div>
    <v-row align="center" justify="center">

        <v-card  max-width=245>

          <v-img  :src="this.selectedVA.va_image_url"></v-img>

          <v-card-actions>
            <v-card-text class="font-weight-medium text-body-1 pl-2">{{ this.selectedVA.va_name }}</v-card-text>
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
                  {{this.selectedVA.given_name}} <br/>
                  Family name: {{this.selectedVA.family_name}}</v-card-text>

                <v-card-text v-html="this.selectedVA.about"></v-card-text>

                <v-card-text>Webpage: {{this.selectedVA.website_url}}</v-card-text>

              </v-card>

            </v-dialog>
          </v-card-actions>

        </v-card>

    </v-row>
    <v-row>
      <v-col v-for="(char, index) in results" :key="index" sm=4 md=3 lg=2 cols=6>
        <v-card>
          <v-img  :src="char.char_image_url" >
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

</style>

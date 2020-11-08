<template>
  <div>
    <v-row>
      <v-col align="center">
        <v-card  width="205"  >

          <v-img aspect-ratio="0.65" :src="this.selectedVA.va_image_url"></v-img>
          <v-card-title class="justify-center text-no-wrap">{{ this.selectedVA.va_name }}</v-card-title>


        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(char, index) in results" :key="index" lg=2>
        <v-card>
          <v-img :src="char.char_image_url" >
            <template v-slot:placeholder>

                <v-row class="justify-center align-center">
                <v-progress-circular color="deep-purple" indeterminate />
              </v-row>
            </template>
          </v-img>
          <v-card-title class="text-no-wrap">{{ char.char_name }}</v-card-title>
          <v-card-subtitle>{{ char.anime_title }}</v-card-subtitle>
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

    }
  },

};
</script>

<style>

</style>

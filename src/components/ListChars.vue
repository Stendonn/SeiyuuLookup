
<template>
    <div>
      <v-row>
        <v-col v-for="(char, index) in cards" :key="index" sm=4 md=3 lg=2 cols=6>

          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              ripple

              @click="selectVA(char.va_id)"
            >
              <v-img  aspect-ratio="0.6" :src="char.image_url" >
                <template v-slot:placeholder>

                  <v-row class="fill-height" align="center" justify="center">
                    <v-progress-circular size=150 color="white" indeterminate />
                  </v-row>
                </template>

              </v-img>

              <v-card-text class="text-h6 pb-0 white--text ">{{char.name}}</v-card-text>
              <v-card-text class="text-body-2 pt-0 grey--text">{{char.voice_actor}}</v-card-text>

            </v-card>
           </v-hover>
        </v-col>

    </v-row>
      <v-snackbar
        v-model="snackbar"
        width="20"
      >
          Fetching the seiyuu...

          <template v-slot:action="{ attrs }">

                <v-progress-circular v-bind="attrs" size=28 class="justify-end align-end" color="white" indeterminate />

            </template>





      </v-snackbar>
  </div>


</template>

<script>

export default {

  props:{
    cards: Array,
    selectedVA:{

    }
  },

  data: function(){
    return{
      snackbar: false,
    }
  },
  methods:{
    selectVA: function(vaID){

      this.snackbar = true;

      this.$emit('choseVA', vaID);

      const jikanjs = require('jikanjs');

      jikanjs.loadPerson(vaID).then((response) => {
        this.$emit('vaFill', vaID, response.name, response.image_url,
                             response.voice_acting_roles, response.about,
                             response.family_name, response.given_name,
                             response.website_url);
        this.$emit('stepup', 3);
        this.snackbar = false;
      })

    },
  },

};
</script>

<style>

</style>

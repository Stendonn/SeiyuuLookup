
<template>
    <div>
      <v-row>
        <v-col v-for="(char, index) in cards" :key="index" xs=6 sm=4 md=3 lg=2 cols="auto">

          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              ripple

              @click="selectVA(char.va_id)"
            >
              <v-img  :src="char.image_url" >
                <template v-slot:placeholder>

                  <v-row class="fill-height" align="center" justify="center">
                    <v-progress-circular size=200 color="deep-purple" indeterminate />
                  </v-row>
                </template>

              </v-img>

              <v-card-title >{{char.name}}</v-card-title>
              <v-card-subtitle>{{char.voice_actor}} </v-card-subtitle>

            </v-card>
           </v-hover>
        </v-col>

    </v-row>
      <v-snackbar
        v-model="snackbar"
      >

      Fetching the person...

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-progress-circular size=30 class="justify-end" color="white" indeterminate />
        </v-btn>
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

        this.$emit('vaFill', vaID, response.name, response.image_url, response.voice_acting_roles);
        this.$emit('stepup', 3);
        this.$emit('resetResults');
        this.snackbar = false;
      })

    },
  },

};
</script>

<style>

</style>

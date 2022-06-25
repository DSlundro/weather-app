<template>
  <div class="main">
    <Modal v-if="modalOpen" @close-modal="toggleModal" :APIkey="APIkey"/>
    <Navigation @add-button="toggleModal" />
    <router-view :cities="cities" :edit="edit" />
  </div>
</template>

<script>
import axios from 'axios';
import db from '@/firebase-config.js';
import Navigation from '@/components/Navigation.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'App',
  components: { Navigation, Modal },
  data(){
    return{
      APIkey: 'a29c187f49190bb905e2c081091d6976',
      cities: [],
      modalOpen: null,
      edit: false,
    }
  },
  created(){
    this.getCityWeather();
    //console.log(this.cities);
  },
  methods:{
    // metodo per richiamare la lista delle città dal database
    getCityWeather(){
      // assegnare alla variabile la collezione "cities"
      let firebaseDB = db.collection('cities');
      // noSnapshot rel time method di firebase che verrà eseguito ogni volta che viene modificato/aggiornato
      firebaseDB.onSnapshot(snap =>{
        // docChanges restituisce un array dei cambiamenti dall'ultima richiesta
        // se è la prima richiesta restituisce un elenco come modifiche aggiunte
        snap.docChanges().forEach(async(ele) => {
          // metodo data() restituisce tutti i dati di una collezione
          //console.log(ele.doc.data());
          if (ele.type === 'added' && !ele.doc.Nd){
            try {
              // costante per il nome della città richiamato con axios dall'API
              const response = 
              await axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${ele.doc.data().city}&units=metric&appid=${this.APIkey}`);
              //console.log(response.data);

              // doc() prende riferimento al documento della collezione in base all'id
              // update() aggiorna i campi del documento di riferimento se esiste, se no falisce l'update
              firebaseDB
              .doc(ele.doc.id)
              .update({
                currentWeather: response.data,
              })
              .then(() => {
                this.cities.push(ele.doc.data());
              })

            } catch (error) {
              console.log(error);
            }
          }
          else if(ele.type === 'added' && ele.doc.Nd){
            this.cities.push(ele.doc.data());
          }
        })
      })
      
    },
    toggleModal(){
      this.modalOpen = !this.modalOpen;
    },
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quaicksand", sans-serif;
}

.main{
  background-color: #31363d;
  margin: 0 auto;
  max-width: 1024px;
  height: 100vh;
}

</style>

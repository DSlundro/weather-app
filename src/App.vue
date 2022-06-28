<template>
  <div class="main">
    <Modal 
    v-if="modalOpen" 
    @close-modal="toggleModal" 
    :APIkey="APIkey"
    />

    <Navigation 
    @add-button="toggleModal" 
    @edit-city="toggleEdit" 
    :addCityActive="addCityActive"
    :isDay="isDay"
    :isNight="isNight"
    />

    <router-view 
    :APIkey="APIkey" 
    :cities="cities" 
    :edit="edit" 
    :is-day="dayTime"
    :is-night="nightTime"
    :resetDays="resetDays"
    :isDay="isDay"
    :isNight="isNight"
    />
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
      addCityActive: null,
      isDay: true,
      isNight: false,
    }
  },
  created(){
    this.getCityWeather();
    this.checkRoute();
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
          else if(ele.type === 'removed'){
            this.cities = this.cities.filter((city) => city.city !== ele.doc.data().city);
          }
        })
      })
      
    },
    toggleModal(){
      this.modalOpen = !this.modalOpen;
    },
    toggleEdit(){
      this.edit = !this.edit
    },
    checkRoute(){
      if (this.$route.name == 'AddCity'){
        this.addCityActive = true;
      }
      else{
        this.addCityActive = false;
      }
      //console.log(this.addCityActive)
    },
    dayTime(){
      this.isDay = !this.isDay;
    },
    nightTime(){
      this.isNight = !this.isNight;
    },
    resetDays(){
      this.isDay  = false;
      this.isNight = false;
    }
  },
  watch: {
    $route(){
      this.checkRoute();
    }
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
  .day{
    transition: 500ms ease all;
    background-color: rgb(59, 150, 249);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .night{
    transition: 500ms ease all;
    background-color: rgb(20, 42, 95);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}

</style>

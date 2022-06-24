<template>
  <div class="main">
    <Navigation />
    <router-view
    :cities="cities"
    />
  </div>
</template>

<script>
import axios from 'axios';
import db from './firebase-config.js';
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'App',
  components: { Navigation },
  data(){
    return{
      APIkey: 'a29c187f49190bb905e2c081091d6976',
      cities: [],
    }
  },
  created(){
    this.getCityWeather();
  },
  methods:{
    // metodo per richiamare la lista delle città dal database
    getCityWeather(){
      let firebaseDB = db.collection('cities');

      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach(async(doc) => {
          if (doc.type === 'added') {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${doc.doc.data().city}&units=metric&appid=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB
              .doc(doc.doc.id)
              .update({
                currentWeather: data,
              })
              .then(() =>{
                this.cities.push(doc.doc.data());
              })
            } catch (error) {
              console.log(error);
            }
          }
        });
      })
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

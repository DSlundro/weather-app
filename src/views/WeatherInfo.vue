<template>
    <h4>Weather</h4>
</template>

<script>
import axios from 'axios';
import db from '@/firebase-config.js';

export default {
    name: 'WeatherInfo',
    props: ['APIkey'],
    data(){
        return{
            forecast: null,
            currentWeather: null,
            loading: true,
        }
    },
    created(){
        this.getWeatherInfo()
    },
    methods:{
        getWeatherInfo(){
            db.collection('cities')
            .where('city', '==', `${this.$route.params.city}`)
            .get()
            .then((docs) => {
                docs.forEach((doc) => {
                    this.currentWeather = doc.data().currentWeather;
                    axios
                    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutely,alerts&units=imperial&appid=${this.APIkey}`)
                    .then((res) => {
                        this.forecast = res.data;
                    })
                    .then(() => {
                        this.loading = false;
                        //console.log(this.forecast);
                        //console.log(this.currentWeather);
                    })
                });
            })
        }
    }
}
</script>

<style>
    h4{
        padding-top: 100px;
    }

</style>
<template>
    <div class="main">
        <div 
        v-if="loading"
        class="loading">

        </div>
        <div
        v-else
        :class="{day: isDay, night: isNight}"
        class="weather">

            <div class="weather wrap">
                <CurrentWeather 
                :isDay="isDay"
                :isNight="isNight"
                :currentWeather="currentWeather"
                />

                <HourlyWeather 
                :forecast="forecast"
                />

                <WeeklyForecast 
                :forecast="forecast"
                />

                <AdditionalInfo 
                :currentWeather="currentWeather"
                />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import db from '@/firebase-config.js';
import CurrentWeather from '@/components/CurrentWeather.vue';
import HourlyWeather from '@/components/HourlyWeather.vue';
import WeeklyForecast from '@/components/WeeklyForecast.vue';
import AdditionalInfo from '@/components/AdditionalInfo.vue';

export default {
    name: 'WeatherInfo',
    components: { CurrentWeather, HourlyWeather, WeeklyForecast, AdditionalInfo },
    props: ['APIkey', 'isDay', 'isNight'],
    data(){
        return{
            forecast: null,
            currentWeather: null,
            loading: true,
            currentTime: null,
            sunrise: null,
            sunset: null,
        }
    },
    created(){
        this.getWeatherInfo();
    },
    beforeDestroy(){
        this.$emit('resetDays')
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
                    .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${doc.data().currentWeather.coord.lat}&lon=${doc.data().currentWeather.coord.lon}&exclude=current,minutely,alerts&units=metric&appid=${this.APIkey}`)
                    .then((res) => {
                        this.forecast = res.data;
                    })
                    .then(() => {
                        this.loading = false;
                        this.getCurrentTime();
                        //console.log(this.getCurrentTime());
                    })
                });
            })
        },
        getCurrentTime(){
            // costante per la data attuale
            const dateObject = new Date();
            // console.log(dateObject);
            this.currentTime = dateObject.getHours();
            //console.log(this.currentTime);
            // costante per l'alba e il tramonto
            this.sunrise = new Date(this.currentWeather.sys.sunrise * 1000).getHours();
            this.sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();

            //console.log(this.sunrise, this.sunset);
            if (this.currentTime > this.sunrise && this.currentTime < this.sunset){
                this.$emit('is-day');
            }
            else{
                this.$emit('is-night');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
*{
    overflow: hidden;
}
.weather{
    transition: 500ms ease;
    width: 100%;
    height: 100%;
    .weather-wrap{
        overflow: hidden;
        max-width: 1024px;
        margin: 0 auto;
    }
}

</style>
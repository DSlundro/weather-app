<template>
    <div @click="goToWeather" class="city">
        <div class="edit-my-container">
            <i @click="removeCity" v-if="edit" class="far fa-trash-alt edit" ref="edit"></i>
        </div>
        <span>{{city.city}}</span>
        <div>{{Math.round(city.currentWeather)}}</div>
        <div class="weather">
            <span>{{Math.round(city.currentWeather.main.temp)}}&deg;</span>
            <img :src="require(`../../public/conditions/${city.currentWeather.weather[0].icon}.svg`)" alt="">
        </div>
        <div class="video">
            <video 
            autoplay 
            loop 
            muted 
            :src="require(`../../public/videos/${city.currentWeather.weather[0].icon}.mp4`)"></video>
            <div class="bg-overlay"></div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase-config.js';

export default {
    name: 'CityComponent',
    props: ['city', 'edit'],
    data(){
        return{
            id: null,
        }
    },
    created(){
        //console.log(this.city.currentWeather);
    },
    methods:{
        removeCity(){
            const firebaseDB = db.collection('cities');
            // where() metodo per filtrare i dati
            firebaseDB.where('city', '==', `${this.city.city}`)
            .get().then(docs => {
                docs.forEach(doc => {
                    this.id = doc.id;
                });
            }).then(() => {
                firebaseDB.doc(this.id).delete()
            })
        },
        goToWeather(e){
            if (e.target === this.$refs.edit){
                //
            }
            else{
                this.$router.push({
                    name: 'WeatherInfo',
                    params: { city: this.city.city }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.city{
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 20px;
    flex-basis: 50%;
    min-height: 250px;
    color: white;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    .edit-my-container{
        z-index: 99;
        cursor: pointer;
        .edit{
            border-radius: 0 15px 0 0;
            border: 10px solid rgb(77, 77, 77);
            background-color: rgb(77, 77, 77);
            z-index: 99;
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
    span{
        z-index: 1;
        text-transform: capitalize;
        display: block;
        font-size: 25px;
        font-weight: 600;
    }
    .weather{
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;
        z-index: 1;
        span{
            font-size: 35px;
            margin-right: 8px;
        }
        img{
            height: 28px;
            width: auto;
        }
    }
    .video{
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        video{
            height: 100%;
            @media (min-width: 900px){
                height: auto;
                width: 100%;
            }
        }
        .bg-overlay{
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
<template>
    <div class="hourly-weather">
        <div class="my-container d-flex">
            <div class="hourly-temperature"
            v-for="(time, index) in filteredList"
            :key="index"
            >
                <HourlyTemperature 
                :time="time"
                />
            </div>
        </div>
    </div>
</template>

<script>
import HourlyTemperature from './HourlyTemperature.vue';

export default {
    components: { HourlyTemperature },
    name: 'HourlyWeather',
    props: ['forecast'],
    created(){
        //console.log(this.forecast);
    },
    computed:{
        filteredList(){
            return this.forecast.hourly.slice(0, 24);
        }
    }
}
</script>

<style lang="scss" scoped>
.my-container{
    max-width: 100vw;
    overflow-x: scroll;
    padding: 0;
    margin: 0;
}
.hourly-weather{
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}
</style>
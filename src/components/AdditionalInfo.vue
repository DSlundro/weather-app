<template>
    <div class="additional-info text-white my-container py-3 px-2 d-flex flex-wrap">
        <div>
            <span>Sunrise</span>
            <span>{{new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString('it-IT', {timeStyle: 'short'})}}</span>
        </div>

        <div>
            <span>Sunset</span>
            <span>{{new Date(this.currentWeather.sys.sunset * 1000).toLocaleString('it-IT', {timeStyle: 'short'})}}</span>
        </div>

        <div>
            <span>Humidity</span>
            <span>{{this.currentWeather.main.humidity}}%</span>
        </div>

        <div>
            <span>Cloudness</span>
            <span>{{this.currentWeather.clouds.all}}%</span>
        </div>

        <div>
            <span>Wind</span>
            <span>{{Math.round(this.currentWeather.wind.speed)}} mph</span>
        </div>

        <div>
            <span>Pressure</span>
            <span>{{Math.round(this.currentWeather.main.pressure)}} hPa</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdditionaInfo',
    props: ['currentWeather'],
    created(){
        console.log(this.currentWeather);
    }
}
</script>

<style lang="scss" scoped>
.additional-info{
    > div{
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        padding: 10px 0;
    }
    span:nth-child(1){
        font-size: 12px;
        margin-bottom: 3px;
    }
    span:nth-child(2){
        font-size: 18px;
        font-weight: 600;
    }
    dv:nth-child()
}
</style>
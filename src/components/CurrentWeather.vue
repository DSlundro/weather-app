<template>
    <div class="current-weather">
        <div class="my-container py-2">

            <div class="d-flex flex-column ps-4 pt-4">
                <div class="weather-info d-flex flex-column gap-4 pt-2">
                    <span class="city display-2 fw-bold">{{this.currentWeather.name}}</span>
                    <span class="current-temperature">{{Math.round(this.currentWeather.main.temp)}}&deg;</span>
                </div>

                <div class="high-low-temperatures pb-4 d-flex gap-3">

                    <div class="high d-flex gap-1 align-items-center">
                        <i class="fas fa-chevron-up"></i>
                        <span>{{Math.round(this.currentWeather.main.temp_max)}}&deg;</span>
                    </div>

                    <div class="low d-flex gap-1 align-items-center">
                        <i class="fas fa-chevron-down"></i>
                        <span>{{Math.round(this.currentWeather.main.temp_min)}}&deg;</span>
                    </div>
                </div>

                <div class="d-flex flex-column gap-1">
                    <span class="condition fs-3">{{this.currentWeather.weather[0].description}}</span>
                </div>

            </div>

            <div class="weather-icon">
                <img v-if="isDay" src="@/../public/sun.png" alt="">
                <img v-if="isNight" src="@/../public/moon.png" alt="">
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'CurrentWeather',
    props: ['isDay', 'isNight', 'currentWeather']
}
</script>

<style lang="scss" scoped>

.current-weather{
    padding-top: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    .my-container{
        min-height: 366px;
        position: relative;
        display: flex;
        color: white;
        .current-temperature{
            font-size: 70px;
            font-weight: 600;
        }
    }

    .weather-icon{
        height: 100%;
        position: absolute;
        right: -160px;
        display: flex;
        align-items: center;
        img{
            width: 320px;
            height: 320px;
        }
    }
    .condition{
        text-transform: capitalize;
    }
    .feels-like{
        font-size: 12px;
    }
    .city{
        z-index: 1;
    }
}
</style>
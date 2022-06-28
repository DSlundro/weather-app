<template>
    <div class="daily-forecast text-white d-flex align-items-center justify-content-between py-1">
        <div>
            <span>{{new Date(this.day.dt * 1000).toLocaleString('en-US', {weekday: 'long'})}}</span>
        </div>
        <div class="condition d-flex align-items-center justify-content-center">
            <img :src="require(`../../public/conditions/${this.day.weather[0].icon}.svg`)" alt="">
        </div>
        <div class="weather d-flex justify-content-end gap-3">
            <span class="high fw-bold">{{Math.round(this.day.temp.max)}}</span>
            <span class="low">{{Math.round(this.day.temp.min)}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DailyForecast',
    props: ['day'],
}
</script>

<style lang="scss" scoped>
div{
    flex: 1;
}
img{
    height: 20px;
}
span{
    min-width: 20px;
}
</style>>
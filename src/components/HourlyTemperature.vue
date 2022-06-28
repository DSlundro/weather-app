<template>
    <div class="hour text-white d-flex flex-column align-items-center py-3 px-3">
        <span>{{new Date(this.time.dt * 1000).toLocaleString('it-IT', {hour: 'numeric', minute: 'numeric'})}}</span>
        <span class="py-2 pt-3">
            <img :src="require(`../../public/conditions/${this.time.weather[0].icon}.svg`)" alt="">
        </span>

        <span>
            {{Math.round(this.time.temp)}}&deg;
        </span>
    </div>
</template>

<script>
export default {
    name: 'HourlyTemperature',
    props: ['time'],
}
</script>

<style lang="scss" scoped>
.hour{
    min-width: 45px;
}
img{
    width: auto;
    height: 22px;
    display: block;
}
span{
    display: block;
    align-self: center;
}
span:nth-child(1){
    font-weight: 300;
}

</style>
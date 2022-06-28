<template>
    <div class="weekly-forecast py-2">
        <div class="cmy container">
            <div class="daily"
            v-for="(day, index) in filteredList"
            :key="index"
            >
                <DailyForecast 
                :day="day"
                />
            </div>
        </div>
    </div>
</template>

<script>
import DailyForecast from './DailyForecast.vue';


export default {
    components: { DailyForecast },
    name: 'WeeklyForecast',
    props: ['forecast'],
    created(){
        //console.log(this.forecast);
    },
    computed: {
        filteredList(){
            return this.forecast.daily.slice(1, 8);
        }
    }
}
</script>

<style lang="scss" scoped>
.weekly-forecast{
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}
</style>
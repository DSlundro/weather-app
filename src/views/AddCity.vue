<template>
  <div class="grid">
    <div 
    class="city-link"
    v-for="(city, index) in cities"
    :key="index"
    >
      <City :city="city"/>
    </div>
  </div>
</template>

<script>
import City from '@/components/City.vue'


export default {
  name: 'AddCity',
  props: ['cities'],
  components: { City },
  created(){
    //console.table(this.cities);
  }
}
</script>

<style lang="scss" scoped>
.grid{
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  grid-auto-rows: 250px;
  @media (min-width: 450px){
    grid-template-columns: repeat(2, 1fr);
  }

}
</style>
<template>
    <div>
        <header class="navigation add-city" v-if="addCityActive">
            <div class="my-container px-4">
                <nav class="d-flex justify-content-between py-4 text-white">
                    <span class="pointer">Vue Weather App</span>
                    <div class="right d-flex gap-3 fs-5 fw-bold">
                        <div @click="editCity" class="far fa-edit pointer" ref="editCity"></div>
                        <div @click="reloadApp" class="fas fa-sync pointer" ></div>
                        <div @click="addButton" class="fas fa-plus pointer"></div>
                    </div>
                </nav>
            </div>
        </header>
        <header v-else class="navigation add-city text-white">
            <div :class="{day: isDay, night: isNight}">
                <div class="my-container px-4 d-flex align-items-center justify-content-between py-4 fw-bold">
                    <router-link class="router-link" :to="{ name: 'AddCity' }">
                        <i class="fas fa-plus text-white"></i>
                    </router-link>
                    <span class="right d-flex gap-1">
                        {{ new Date().toLocaleString('en-US', { weekday: 'short'}) }},
                        {{ new Date().toLocaleString('en-US', { month: 'short'}) }}
                        {{ new Date().toLocaleString('en-US', { day: '2-digit'}) }}
                    </span>
                    <span>&deg; F</span>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: 'NavigationComponent',
    props: ['addCityActive', 'isDay', 'isNight'],
    methods: {
        addButton(){
            this.$emit('add-button')
        },
        reloadApp(){
            location.reload()
        },
        editCity(){
            this.$refs.editCity.classList.toggle('edit-active')
            this.$emit('edit-city')
        }
    }
}
</script>

<style lang="scss" scoped>
.add-city{
    background-color: #313640;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.navigation{
    background-color: #313640;
    z-index: 99;
    position: fixed;
    max-width:  1024px;
    width: 100%;
    .pointer{cursor: pointer;}
    .edit-active{
        color: rgba(210, 75, 75, 1);
    }
}

</style>
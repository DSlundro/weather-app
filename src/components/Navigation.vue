<template>
    <header class="navigation add-city">
        <div class="container px-4">
            <nav class="d-flex justify-content-between py-4 text-white">
                <span class="pointer">Add City</span>
                <div class="right d-flex gap-3 fs-5 fw-bold">
                    <div @click="editCity" class="far fa-edit pointer" ref="editCity"></div>
                    <div @click="reloadApp" class="fas fa-sync pointer" ></div>
                    <div @click="addButton" class="fas fa-plus pointer"></div>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'NavigationComponent',
    props: ['addCityActive'],
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
.navigation{
    background-color: #313640;
    z-index: 99;
    position: fixed;
    max-width:  1024px;
    width: 100%;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    .pointer{cursor: pointer;}
    .edit-active{
        color: rgba(210, 75, 75, 1);
    }
}

</style>
<template>
    <div @click="closeModal" class="modal" ref="modal">
        <div class="modal-wrap" ref="modal-wrap">
            <label for="city-name" class="text-white">Enter Location:</label>
            <input type="text" name="city-name" id="city-name" placeholder="Search by City Name" v-model="city" >
            <div class="d-flex justify-content-center gap-3">
                <button @click="resetCity" type="reset">Reset</button>
                <button @click="addCity" type="submit">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import db from '@/firebase-config.js';

export default {
    name: 'ModalComponent',
    props: ['APIkey', 'cities'],
    data(){
        return{
            city: '',
        }
    },
    created(){console.log(this.city)},
    methods:{
        closeModal(e){
            // al click se il target è uguale all'attributo ref 'modal' allora emetti l'evento
            if(e.target === this.$refs.modal){
                this.$emit('close-modal');

            }
        },
        async addCity(){
            // condizione per dare un alerta in caso input fosse una stringa vuota
            if (this.city === ''){
                alert('Write your city');
            } 
            else if(this.cities.some((res) => res.city === this.city.toLowerCase())){
                alert(`'${this.city}' already exist!`)
            } 
            else{
                try {
                    const firebaseDB = db.collection('cities');
                    const response = await axios
                        .get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.APIkey}`);
                    const data = await response.data;
                    console.log(data);
                    firebaseDB
                    .doc()
                    .set({
                        city: this.city.toLowerCase(),
                        currentWeather: data,
                    })
                    .then(() => {
                        this.$emit('close-modal')
                    })
                } catch{
                    alert(`'${this.citiy}' doesn't exist, please try again`)
                }
                
            }
        },
        resetCity(){
            this.city = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.modal{
    z-index: 1111;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .modal-wrap{
        max-width: 500px;
        border-radius: 8px;
        width: 80%;
        padding: 20px;
        background-color: #31363d;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
        input{
            color: #fff;
            border: none;
            background-color: transparent;
            border-bottom: 1px solid #fff;
            padding: 6px 4px;
            margin: 10px 0 20px;
            width: 100%;
            &:focus{
                outline: none;
            }
        }
        button{
            background-color: #222325;
            color: #fff;
            padding: 6px 20px;
            border-radius: 8px;
            border: none;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
        } 
    }
}
</style>
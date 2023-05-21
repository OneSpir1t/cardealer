<template>
    <transition-group name="eq-list">
        <div class="d-inline-flex align-items-center justify-content-center" v-if="eq.length > 0" v-for="item in eq">
            <div class='m-2 Car-Item2'>
                <a href="#" @click="$router.push('/availablecars/' + item.Equipment.Models.Brand.Title + '/' + item.Equipment.Models.Title + '/' + item.Equipment.Title + '/' + item.id)" class="Car-link Car-Item2">
                    <div class="">
                        <div class="Car-Image" v>
                            <img v-if="item.Equipment.Image" class="img-fluid img-car" :src="require('../assets/'+item.Equipment.Image)">       
                            <img v-else class="img-fluid img-car" src="../assets/defaultImage.jpg">                     
                        </div>
                        <div class="Car-Info-Item2 d-flex flex-column align-items-start">
                            <div class="Car-Model-Info">
                                <h5>
                                    {{ item.Equipment.Models.Brand.Title }} {{ item.Equipment.Models.Title }} {{ item.Equipment.Title }}
                                </h5>
                            </div>
                            <div class="vstack gap-1 d-flex justify-content-stretch flex-column">
                                <div class="d-flex justify-content-between">
                                    <label>{{ item.Equipment.TechnicalInformation.Yearofmanufacture }}</label>
                                    <label>{{ item.VIN }}</label>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div>
                                        <img class="Car-svg" src="../assets/engine.svg">
                                    </div>
                                    <div>
                                        {{ item.Equipment.TechnicalInformation.Enginedisplacement }} л., {{ item.Equipment.TechnicalInformation.Horsepower }} л.с., {{ item.Equipment.TechnicalInformation.EngineType.Title }}
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div> <img class="Car-svg" src="../assets/drivetype.png"> </div>
                                    <div> {{ item.Equipment.TechnicalInformation.DriveType.Title }} </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div> <img class="Car-svg" src="../assets/transmission.png"> </div>
                                    <div> {{ item.Equipment.TechnicalInformation.Transmission.Title }} </div>
                                </div>
                                <div class="d-flex align-items-center">                              
                                    <div class="Car-color" :id="'Car-color' + item.Equipment.TechnicalInformation.ColorID"></div>
                                    <div> {{ item.Equipment.TechnicalInformation.Color.Title }} </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div>
                                        <img class="Car-svg" src="../assets/Milage.png">
                                    </div>
                                    <div> {{item.MileAge}} км </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <div> 
                                        <img class="Car-svg" src="../assets/Owner.png">
                                    </div>
                                    <div>{{ item.Owners }}</div>
                                </div>
                                <div class="d-flex flex-fill align-items-end justify-content-center">
                                    <h6> {{ item.Equipment.Cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} ₽</h6>                                     
                                </div>
                            </div>
                        </div>
        
                    </div>
                </a>
            </div>                   
        </div> 
    </transition-group>
    <h2 v-if="eq.length == 0">Ничего не найдено</h2>
</template>

<script>
export default {
    props: {
        eq: {
            type: Array,
            required: true
        },
        brands: {
            type: Array,
            required: true
        }
    },
}
</script>

<style>
.eq-list-move, /* apply transition to moving elements */
.eq-list-enter-active,
.eq-list-leave-active {
  transition: all 0.1s ease;
}

.eq-list-enter-from,
.eq-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
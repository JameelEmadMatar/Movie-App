<template>
    <div class="actors">
        <div class="container">
            <h1>Actors</h1>
            <div class="actors-card">
                <div class="actor-card" v-for="(actor , index) in loading ? Array(skeletonCount).fill({}) : actors" :key="loading ? index : actor.id">
                    <v-skeleton-loader         
                        v-if="loading"
                        type="image, article"
                        class="skeleton-loader"
                    >
                    </v-skeleton-loader>
                    <div class="actor-information" v-else>
                        <img :src="'https://image.tmdb.org/t/p/w500' + actor.profile_path" alt="actor" class="actor-image" loading="lazy"/>
                        <div class="actor-info">
                            <p>{{actor.name}}</p>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    </div>
</template>

<script setup>
import { onMounted , ref } from 'vue'
import axiosClient from './axiosClient.js'

const actors = ref([])
const loading = ref(true)
const skeletonCount = ref(window.innerWidth <= 575 ? 4 : 8)

onMounted(() =>{
    axiosClient.get('/trending/person/day?language=en-US&api_key=53a9e204b004b2216fcee633ed734741')
    .then(res => {
        actors.value = res.data.results.filter((ele) =>{
            return ele.known_for_department == "Acting" && ele.profile_path != null
        })        
        loading.value = false
    })
})
</script>

<style scoped>
.actors h1{
    font-size:1.5rem;
    padding:30px 0;
}
.actors-card {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1%;
}
.actor-card{
    width: 24%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 4px 4px 4px #DBDBDB;
    margin: 10px 0;
}
.actor-card img{
    width: 100%;
    border-radius: 8px;
}
.actor-card .actor-information{
    width:100%;
    text-align : center;
}
.actor-card .actor-info{
    padding: 10px;
    background-color: #fff;
}
.actor-card .actor-info p{
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

@media (max-width:768px){
  .actors-card{
    gap:2%;
  }
  .actor-card{
    width:49%;
  }
  .movie-title{
    font-size:12px;
  }
}

@media (max-width:575px){
  .actors-card{
    justify-content:center;
  }
  .actor-card{
    width:85%;
  }
}
</style>
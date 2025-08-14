<template>
    <div class="trending">
        <div class="container">
            <h1>Trending Movies</h1>
            <MovieCard :movies="trendingMovies" :skeletonCount="skeletonCount" :loading="loading"/>
        </div>
    </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue'
import { ref , onMounted} from 'vue'
import axiosClient from './axiosClient.js'

const trendingMovies = ref([])
const loading = ref(true)
const skeletonCount = ref(window.innerWidth <= 575 ? 4 : 8) // مثال: 4 بطاقات للشاشات الصغيرة
onMounted(() => {
  axiosClient
    .get('/trending/movie/day?api_key=53a9e204b004b2216fcee633ed734741')
    .then((response) => {
      trendingMovies.value = response.data.results
      loading.value = false
    })
})
</script>

<style scoped>
.trending h1{
  padding:30px 0;
}
</style>
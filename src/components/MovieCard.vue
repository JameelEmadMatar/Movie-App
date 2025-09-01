<template>
  <div class="movies-card">
    <div
      class="movie-card"
      v-for="(movie, index) in loading ? Array(skeletonCount).fill({}) : movies"
      :key="loading ? index : movie.id"
    >
      <v-skeleton-loader
        v-if="loading"
        type="image, article"
        class="skeleton-loader"
        :width="200" :height="350"
      ></v-skeleton-loader>
      <div v-else>
        <img
          :src="movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path :'https://via.placeholder.com/200x350'"
          alt="Movie Poster"
          class="movie-image"
          loading = "lazy"
          fetchpriority="high"
          @click="goToDetails(movie.id)"
        />
        <div class="movie-info">
          <h3 class="movie-title" :title="movie.title">{{ movie.title }}</h3>
          <p class="movie-rating">⭐ {{ movie.vote_average.toFixed(2) }}</p>
          <button class="watch-button" @click="goToDetails(movie.id)">Watch</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  movies:{
    type : Array,
    required : true,
  },
  skeletonCount : {
    type : Number,
    required : true,
  },
  loading : {
    type : Boolean,
    required : true
  }
})

const router = useRouter()
function goToDetails(userId){
  router.push({ name: 'Movie Details Page', params: { id: userId } });
}
</script>

<style scoped>
.movies-card{
  display: flex;
  align-items: center;
  gap: 1%;
  flex-wrap: wrap;
}
.movie-card {
  width: 24%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #1a1a1a;
  color: #fff;
  margin: 10px 0;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.movie-info {
  display:flex;
  flex-direction:column;
  padding: 10px;
  text-align: center;
}

.movie-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;
  margin: 5px 0;
  color: #e0e0e0;
}

.movie-rating {
  font-size: 1em;
  color: #ffd700;
  margin: 5px 0;
}

.watch-button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  margin:5px 0;
}

.watch-button:hover {
  background-color: #172026;
}

@media (max-width:991px){
  .movies-card{
    gap:2%;
  }
  .movie-card{
    width:32%;
  }
}

@media (max-width:768px){
  .movies-card{
    gap:2%;
  }
  .movie-card{
    width:49%;
  }
  .movie-title{
    font-size:12px;
  }
}

@media (max-width:575px){
  .movies-card{
    justify-content:center;
  }
  .movie-card{
    width:85%;
  }
}
</style>
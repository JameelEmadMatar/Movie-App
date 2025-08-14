<template>
    <div class="movie-details">
        <div class="backdrop" :style="{ backgroundImage: loading ? '' : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }">
            <div class="overlay">
                <div class="container">
                    <v-skeleton-loader
                        v-if="loading"
                        type="image"
                        class="poster"
                        width="500"
                        height="750"
                    ></v-skeleton-loader>
                    <img
                        v-else
                        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                        :alt="movie.title"
                        class="poster"
                        @error="handleImageError"
                    />
                    <div class="info">
                        <v-skeleton-loader
                            v-if="loading"
                            type="heading"
                            width="60%"
                            class="mb-4"
                        ></v-skeleton-loader>
                        <h1 v-else>
                            {{ movie.title }} <span v-if="movie.release_date">({{ movie.release_date.split('-')[0] }})</span>
                        </h1>
                        <v-skeleton-loader
                            v-if="loading"
                            type="text@3"
                            class="mb-4"
                        ></v-skeleton-loader>
                        <div v-else class="details">
                            <span>{{ movie.release_date }}</span> |
                            <span>{{ movie.vote_average }} ({{ movie.vote_count }} votes)</span> |
                            <span>{{ lang }}</span>
                        </div>
                        <v-skeleton-loader
                            v-if="loading"
                            type="paragraph"
                            class="mb-4"
                        ></v-skeleton-loader>
                        <p v-else class="overview">{{ movie.overview }}</p>
                        <v-skeleton-loader
                            v-if="loading"
                            type="chip@3"
                            class="genres"
                        ></v-skeleton-loader>
                        <div v-else class="genres">
                            <span v-for="genre in genres" :key="genre.id" class="genre">{{ genre.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axiosClient from './axiosClient.js'

const movie = ref({})
const lang = ref('')
const genres = ref([])
const loading = ref(true)
const error = ref(null)
const route = useRoute()
const userId = route.params.id
onMounted(() => {
    axiosClient
    .get(`/movie/${userId}?language=en-US&api_key=53a9e204b004b2216fcee633ed734741`)
    .then(res => {
        movie.value = res.data
        genres.value = res.data.genres
        lang.value = res.data.original_language.toUpperCase()
        loading.value = false
    })
    .catch(err => {
        error.value = 'Failed to load genres. Please try again later.'
    })
})

const handleImageError = (event) => {
    event.target.src = '/placeholder.png'
}
</script>

<style scoped>
.movie-details {
    background: linear-gradient(to bottom, #2d2d2d, #f8f9fa);
    font-family: 'Arial', sans-serif;
}

.backdrop {
    background-size: cover;
    background-position: center;
    position: relative;
    height: calc(100vh - 76px);
    width: 100%;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    align-items: center;
    padding-bottom: 2rem;
}

.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    gap: 2rem;
}

.poster {
    width: 300px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.info {
    color: #fff;
    max-width: 70%;
}

.info h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
}

.info h1 span {
    font-size: 1.5rem;
    font-weight: 400;
}

.details {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #ddd;
}

.details span {
    margin-right: 1rem;
}

.overview {
    font-size: 1.1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
}

.genres {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.genre {
    background-color: #032541;
    color: #fff;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: 0.9rem;
}

.error-message {
    text-align: center;
    color: #d32f2f;
    font-size: 1rem;
    padding: 1rem;
    background-color: #ffebee;
    border-radius: 6px;
    margin: 1rem auto;
    max-width: 600px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .backdrop{
        height : calc(100vh - 80px)
    }

    .poster {
        width: 200px;
    }

    .info {
        max-width: 100%;
    }

    .info h1 {
        font-size: 2rem;
    }

    .info h1 span {
        font-size: 1.2rem;
    }

    .overview {
        font-size: 1rem;
    }
}

@media (max-width: 576px) {
    .poster {
        width: 150px;
    }

    .info h1 {
        font-size: 1.5rem;
    }

    .info h1 span {
        font-size: 1rem;
    }

    .details {
        font-size: 0.9rem;
    }

    .overview {
        font-size: 0.9rem;
    }

    .genre {
        font-size: 0.8rem;
    }
}
</style>
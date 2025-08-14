<template>
    <div class="genres">
        <div class="container">
            <h1>Movie Genres</h1>
            <div v-if="error" class="error-message">
                <p>{{ error }}</p>
            </div>
            <div class="genres-grid" v-else>
                <div class="genre-card" v-for="(genre, index) in loading ? Array(skeletonCount).fill({}) : genres" :key="loading ? index : genre.id">
                    <v-skeleton-loader
                        v-if="loading"
                        type="text"
                        class="skeleton-loader"
                    ></v-skeleton-loader>
                    <a v-else :href="'https://www.themoviedb.org/genre/' + genre.id + '-movie'" class="genre-card-content">
                        <div class="genre-info">
                            <h3>{{ genre.name }}</h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axiosClient from './axiosClient.js'

const genres = ref([])
const loading = ref(true)
const error = ref(null)
const skeletonCount = ref(window.innerWidth <= 768 ? 4 : 8)

onMounted(() => {
    axiosClient
        .get('/genre/movie/list?language=en-US&api_key=53a9e204b004b2216fcee633ed734741')
        .then(res => {
            genres.value = res.data.genres
            loading.value = false
        })
        .catch(err => {
            error.value = 'Failed to load genres. Please try again later.'
        })
})
</script>

<style scoped>
.genres {
    padding: 1.5rem 0;
}

.genres h1 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #032541;
    text-align: left;
    margin: 1rem 0 1.5rem;
    font-family: 'Arial', sans-serif;
}

.genres-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
}

.genre-card {
    background-color: #f8f9fa;
    border-radius: 6px;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.genre-card:hover {
    transform: scale(1.03);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.genre-card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
    padding: 1rem;
    height: 100px;
}

.genre-info h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #032541;
    text-align: center;
    margin: 0;
    font-family: 'Arial', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.skeleton-loader {
    width: 100%;
    height: 100px;
    border-radius: 6px;
}

.error-message {
    text-align: center;
    color: #d32f2f;
    font-size: 1rem;
    padding: 1rem;
    background-color: #ffebee;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    font-family: 'Arial', sans-serif;
}

/* Responsive Design */
@media (max-width: 768px) {
    .genres-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 0.75rem;
    }

    .genre-card-content {
        height: 80px;
    }

    .genre-info h3 {
        font-size: 0.9rem;
    }

    .genres h1 {
        font-size: 1.5rem;
    }
}

@media (max-width: 576px) {
    .genres-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 0.5rem;
    }

    .genre-card-content {
        height: 70px;
    }

    .genre-info h3 {
        font-size: 0.85rem;
    }

    .container {
        padding: 0 1rem;
    }
}
</style>
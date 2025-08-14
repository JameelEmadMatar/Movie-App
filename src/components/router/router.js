import { createRouter , createWebHistory } from 'vue-router'
import DefaultLayout from '../DefaultLayout.vue'
import HomePage from '../HomePage.vue'
import TrendingMovies from '../TrendingMovies.vue'
import ActorsPage from '../ActorsPage.vue'
import GenresPage from '../GenresPage.vue'
import MovieDetailsPage from '../MovieDetailsPage.vue'
const routes = [
    {
        path : '/',
        component : DefaultLayout,
        children : [
            {
                path : '/',
                name : 'Home',
                component : HomePage,
                meta : {
                    title : 'Home Page'
                }
            },
            {
                path : '/movies',
                name : 'MoviesPage',
                component : TrendingMovies,
                meta : {
                    title : "Movies Page"
                }
            },
            {
                path : '/movie/:id',
                name : 'Movie Details Page',
                component : MovieDetailsPage,
                meta : {
                    title : "Movie Details"
                }
            },
            {
                path : 'actors',
                name : "actors page",
                component : ActorsPage,
                meta : {
                    title : 'Actors Page'
                }
            },
            {
                path : 'genres',
                name : "genres page",
                component : GenresPage,
                meta : {
                    title : 'genres Page'
                }
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass : 'router-link-exact-active',
})

const defaultTitle = 'Movie App'

router.beforeEach((to , from , next) => {
    document.title = to.meta.title || defaultTitle
    next()
})
export default router
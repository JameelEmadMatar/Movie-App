import { createRouter , createWebHistory } from 'vue-router'

const DefaultLayout = ()=> import('../DefaultLayout.vue')
const HomePage = ()=> import('../HomePage.vue')
const TrendingMovies = ()=> import('../TrendingMovies.vue')
const ActorsPage = ()=> import('../ActorsPage.vue')
const GenresPage = ()=> import('../GenresPage.vue')
const MovieDetailsPage = ()=> import('../MovieDetailsPage.vue')
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
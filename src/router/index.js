import Vue from 'vue'
import Router from 'vue-router'
// Components
import Home from '@/components/HelloWorld'
import FilmDetail from '@/components/films/FilmDetail'
import CreateFilm from '@/components/crud-films/CreateFilm'

Vue.use(Router)

export default new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',
    routes: [{
            path: '/',
            component: Home,
            name: 'root',
        },
        {
            path: '/films',
            name: 'films',
            components: {
                default: resolve => require(['@/pages/Films'], resolve), // async (lazy load)
            }
        },
        {
            path: '/films/:id(\\d+)',
            components: {
                default: FilmDetail,
            },
            name: 'films.detail'
        },
        {
            path: '/create-films',
            components: {
                default: CreateFilm,
            },
            name: 'create-film'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
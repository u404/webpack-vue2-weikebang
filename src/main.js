import Vue from 'vue';
import App from './App';
import _ from 'lodash';
import './assets/css';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './config/routes';

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
});

var vm = new Vue({
    el: '#app',
    router,
    components: {
        'App': App
    },
    template: '<App />'
});
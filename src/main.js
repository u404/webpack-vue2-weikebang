import Vue from 'vue';
import App from './App';
import _ from 'lodash';
import './utils/lib';
import './assets/css';
import FastClick from 'fastclick';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './config/routes';

const router = new VueRouter({
    //mode: 'history',
    base: __dirname,
    routes
});

FastClick.attach(document.body);

var vm = new Vue({
    el: '#app',
    router,
    components: {
        'App': App
    },
    template: '<App />'
});
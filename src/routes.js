import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'

import Store from './components/Store.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import ProductDetails from './components/ProductDetails.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import Manage from './components/admin/Manage.vue';
import Admin from './components/admin/Admin.vue';
import Edit from './components/admin/Edit.vue';

Vue.use(Router)
Vue.use(VueResource)

export const routes = [
	{path: '/', component: Store, name: 'mainpage'},
    {path: '/manage', component: Manage, name: 'manage'},
    {path: '/products', component: Admin, name: 'admin'},
	{path: '/product/:id', component: ProductDetails, name: 'product'},
    {path: '/edit/:key', component: Edit, name: 'edit'},
	{path: '/cart', component: ShoppingCart, name: 'shoppingcart'},
	{path: '/login', component: Login, name: 'login', onlyGuest: true },
	{path: '/register', component: Register, name: 'register', onlyGuest: true},
	{path: '*', redirect: '/' }
];
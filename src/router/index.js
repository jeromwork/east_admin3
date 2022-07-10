import { createWebHistory, createRouter } from "vue-router";
import Home from '../components/Home/Home.vue'
import Login from '../components/Login/Login.vue'
import DoctorSettings from '../components/DoctorSettings/DoctorSettings.vue'
import DocSelectSettings from '../components/DocSelect/DocSelectSettings/DocSelectSettings.vue'
import DocSelect from '../components/DocSelect/DocSelectUse/DocSelect.vue'
import FilialSettings from '../components/FilialSettings/FilialSettings.vue'
import HealthSettings from "../components/HealthSettings/HealthSettings.vue";
import Reviews from "../components/Reviews/ReviewsData.vue";

const routes = [
    {
        path: '/',
        component: Home
    },

    {
        path: '/login',
        component: Login
    },

    {
        path: '/doctor-settings',
        component: DoctorSettings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/doc-select-settings',
        component: DocSelectSettings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/doc-select-use',
        component: DocSelect,
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: '/filial-settings',
        component: FilialSettings,
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: '/health-settings',
        component: HealthSettings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/reviews/settings',
        component: Reviews,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
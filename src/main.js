import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Axios from 'axios'

loadFonts()

const $axios = Axios.create({
    //baseURL: (window.location.host === 'http://localhost:8080/')? '/assets/components/eastclinic/login/connector.php': 'http://dev.eastclinic.local/assets/components/eastclinic/remote/connector.php',
    // data: {
    //   firstName: 'Fred',
    //   jwt: localStorage.getItem('jwt')
    // }
});
if (localStorage.getItem('jwt')) {
    $axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt');
}
if(localStorage.getItem('access_token')){
    $axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
}
$axios.defaults.baseURL =  'http://127.0.0.1:8000/';

$axios.defaults.method ="POST";
store.$http = $axios;



const app = createApp(App)
  .use(vuetify)
    .use(store)
    .use(router)
  .mount('#app')
// app.provide('$http', $axios);  // Providing to all components during app creation
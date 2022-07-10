import { createStore } from 'vuex'
import Login from './modules/Login/Login.js'
import doctorSettings from './modules/doctorSettings/doctorSettings.js'
import FilialSettings from './modules/FilialSettings/FilialSettings.js'
import DocSelect from './modules/DocSelect/DocSelect.js'
import Menu from './modules/Menu/Menu.js'
import JWT from './modules/JWT/JWT.js'
import HealthSettings from "./modules/HealthSettings/HealthSettings.js";
import SpecialsSettings from "./modules/HealthSettings/SpecialsSettings.js";
import Reviews from "./modules/Reviews/Reviews.js";
import Access from './modules/Access/Access.js'
import Doctors from './modules/Doctors/Doctors.js'

//const APlugin = AccessSocketPlugin( new WebSocket('ws://127.0.0.1:61523'));

 const _store = createStore({
    modules: {
        Login,
        doctorSettings,
        FilialSettings,
        JWT,
        Menu,
        DocSelect,
        SpecialsSettings,
        HealthSettings,
        Reviews,
        Access,
        Doctors,
    }
});

export default _store;

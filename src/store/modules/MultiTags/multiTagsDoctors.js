import axios from 'axios'

export default {
    namespaced:true,
    state: {
        items:[
            {
                value:0,
                text: '',
            }
        ],
        selectItems:[],
    },
//===========================================================

    mutations: {
        SET_CURRENT_DOCTOR_ID(state, val) {

            state.currentDoctorId = val;
            //this.GET_DOCTOR_SETTINGS_AJAX();
            //console.log(state);
        },
        FILL_DOCTOR_SETTINGS_DATA(state, doctor) {        state.doctorSettings = doctor.data[0];    },
        SET_LIST_DOCTORS(state, doctors) {

            if(!Array.isArray(doctors)){console.log('необходимо передать массив');}


//здесь преобразуем присланный массив в формате сервера в формат нужный для select
            state.doctors= doctors.map(function (doc) {
                // console.log(doc);
                return {value:doc.doc__id, text:doc.doc__fullname};
            });


        },
    },
//=============================================================
    actions:{

        async GET_DOCTORS_AJAX(){
            const formData = new FormData();
            formData.append("action", 'doctors/get');
            formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
            formData.append("fields", 'id, fullname');
            axios
                .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
                .then(response => {this.info = response

                    console.log(response.data);
                    this.commit('doctorSettings/SET_LIST_DOCTORS', response.data.data);
                    //
                }).catch(error => console.log(error));
        },
        async GET_DOCTOR_SETTINGS_AJAX({getters}){
            const formData = new FormData();
            formData.append("action", 'doctors/get');
            formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
            // formData.append("fields", 'id, fullname');
            formData.append("id", getters.currentDoctorId);


            axios

                .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
                .then(response => {this.info = response

                    console.log(response);
                    this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
                });
        },
        async SAVE_DOCTOR_SETTINGS_AJAX({getters}){


            const formData = new FormData();




            for (let key in getters.doctorSettings) {
                formData.append(key, getters.doctorSettings[key]);
                console.log(getters.doctorSettings[key]);


            }

            formData.append("action", 'doctors/set');
            formData.append("cors_key", '8cbd6a0c2e767862b02887a446bb34ca');
            formData.append("id", getters.currentDoctorId);

            axios

                .post('http://dev.eastclinic.local/assets/components/eastclinic/iservices/connector.php', formData)
                .then(response => {this.info = response

                    console.log(response);
                    //this.commit('doctorSettings/FILL_DOCTOR_SETTINGS_DATA', response.data);
                });
        },




        async getDoctorsAjax2(){
            const res = await fetch('https://gorest.co.in/public-api/users');
            //console.log(res);
            const initialData = await res.json();


            this.commit('doctorSettings/initialData', initialData);


            //this.commit('Shops/initialData', initialData);
//ctx.commit('setPF', JSON.parse(prods));
        }
    },
//==========================================================

    getters: {
        getList: state => {        return state.items;      },

    },








}

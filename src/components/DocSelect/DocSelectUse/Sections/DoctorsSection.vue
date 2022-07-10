<template>
    <v-row>
        <v-col
                v-for="(clinic, index) in filialsDoctors" :key="index"
                cols="12"
                sm="12"
                md="3">
            <v-card
                    v-if="clinic.length > 0"
                    elevation="8"
                    outlined
                    height="450px" class="scroll overflow-y-auto"
            >
                <v-card-title>{{getFilial(index)}}</v-card-title>
                <v-card-text>
                    <v-list >

                        <v-list-item link
                                     v-for="(doc, doc_id) in clinic" :key="doc_id"
                        >
                            <v-list-item-subtitle>

                                {{getDoctorName(doc.id)}}
                            </v-list-item-subtitle>

                            <v-list-item-icon
                                    v-if="doc.level>0"
                            >
                                <v-btn
                                        class="ma-2"
                                        color="#009B95"
                                        dark
                                        small
                                >
                                    <v-icon
                                            small
                                            v-text="doc.level">

                                    </v-icon>
                                </v-btn>
                            </v-list-item-icon>

                        </v-list-item>
                    </v-list>


                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'DoctorsSection',
    methods: {
        getFilial(id){
            //console.log(id);
            let filials = this.$store.getters["DocSelect/getFilials"];
            if(filials[id] && filials[id]['title']){
                return filials[id]['title'];
            }else{
                console.log('неправильная структура данных для филиала');
                return '';
            }
        },
        getDoctorName(id){
            //console.log(id);
            let doctors = this.$store.getters["DocSelect/getDoctors"];
            if(doctors[id] && doctors[id]['surname']){
                let mname = (doctors[id]['middlename'][0]) ? doctors[id]['middlename'][0] : '';
                return doctors[id]['surname'] + ' ' + doctors[id]['name'][0] + '. ' + mname + '.';
            }else{
                console.log('неправильная структура данных для доктора');
                return '';
            }
        },
    },
//====================================================================
    computed:{

        ...mapGetters({
            getFilials:'DocSelect/getFilials'
            ,getArrGroupTags:'DocSelect/getArrGroupTags'
            ,getFilialsDoctors:'DocSelect/getFilialsDoctors'
        }),

        arrGroupTags : {
            get(){
                return this.getArrGroupTags;
            },
        },
        filialsDoctors : {
            get(){
                return this.getFilialsDoctors;
            },
        },
        filials : {
            get(){
                let listFilials = [];
                for (let i in this.getFilials) {
                    listFilials.push({value:this.getFilials[i]['id']*1, text:this.getFilials[i]['title']});
                }
                //console.log(listFilials)
                return listFilials;
            },
        },
    }
}

</script>
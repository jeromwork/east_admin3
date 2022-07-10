<template>
    <v-row>
        <v-col cols="6"
               sm="6"
               md="6">


            <v-card
                    elevation="8"
                    outlined
            >

                <v-card-text>

                    <ETable :dataTableProps="dataTableProps"/>
                </v-card-text>
            </v-card>
            <v-card
                    elevation="8"
                    outlined
            >

                <v-card-text>
                    <v-form
                            ref="form"
                            lazy-validation
                    >
                        <v-row no-gutters >
                            <v-col cols="12"
                                   sm="12"
                                   md="12">
                                <v-select
                                        v-model="currentDoctorId"
                                        :items="listDoctors"
                                        label="Выберите филиал"
                                        @change="getFilialData"
                                ></v-select>

                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>



<script>
    //забрать данные с сервера для health

    //сдалать динамическое создание окна созданияю/редактирования сущности
    //т.е. что бы не жестко кодировать какие поля показывать
    //а динамически передавать поля, в виде массива, с возможностью передавать
    //динамические компоненты - кастомные поля ввода

    //сохранение сущностей на сервере все время с хэшем, что бы операторы не перезаписывали друг друга
    //причем хэш должен прокидываться на сервер независимо от других данных, прозрачно, что бы не думать о нем

    //забрать специальности с сервера и загрузить в таблицу



    import { mapGetters , mapMutations , mapState} from "vuex";

    import ETable from "../../widgets/ETable/ETable.vue";
    export default {


        name: 'FilialsSettings',

        props: {
            idDoctor:{
                type: Number,
                default: 2,
            }
        },
        components: {
            ETable
        },
        data: () => ({
            dataTableProps:{
                headers: [
                    { text: 'Dessert (100g serving)', align: 'start', sortable: false, value: 'name', },
                    { text: 'Calories', value: 'calories' },
                    { text: 'Fat (g)', value: 'fat' },
                    { text: 'Carbs (g)', value: 'carbs' },
                    { text: 'Protein (g)', value: 'protein' },
                    { text: 'Iron (%)', value: 'iron' },
                ],

            },
            valid2: true,
            valid: true,

            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
        }),

        methods: {
            getFilialData () {
                //получить данные текущего доктора
                //id доктора уже передано в store
                this.$store.dispatch('FilialSettings/GET_FILIAL_SETTINGS_AJAX');
            },
            validate () {
                this.$refs.form.validate()
            },
            reset () {
                this.$refs.form.reset()
            },
            getSplecials(){
              return [
                      {
                          name: 'Frozen Yogurt',
                          calories: 159,
                          fat: 6.0,
                          carbs: 24,
                          protein: 4.0,
                          iron: '1%',
                      },
                      {
                          name: 'Ice cream sandwich',
                          calories: 237,
                          fat: 9.0,
                          carbs: 37,
                          protein: 4.3,
                          iron: '1%',
                      },
                      {
                          name: 'Eclair',
                          calories: 262,
                          fat: 16.0,
                          carbs: 23,
                          protein: 6.0,
                          iron: '7%',
                      },
                      {
                          name: 'Cupcake',
                          calories: 305,
                          fat: 3.7,
                          carbs: 67,
                          protein: 4.3,
                          iron: '8%',
                      },
                      {
                          name: 'Gingerbread',
                          calories: 356,
                          fat: 16.0,
                          carbs: 49,
                          protein: 3.9,
                          iron: '16%',
                      },
                      {
                          name: 'Jelly bean',
                          calories: 375,
                          fat: 0.0,
                          carbs: 94,
                          protein: 0.0,
                          iron: '0%',
                      },
                      {
                          name: 'Lollipop',
                          calories: 392,
                          fat: 0.2,
                          carbs: 98,
                          protein: 0,
                          iron: '2%',
                      },
                      {
                          name: 'Honeycomb',
                          calories: 408,
                          fat: 3.2,
                          carbs: 87,
                          protein: 6.5,
                          iron: '45%',
                      },
                      {
                          name: 'Donut',
                          calories: 452,
                          fat: 25.0,
                          carbs: 51,
                          protein: 4.9,
                          iron: '22%',
                      },
                      {
                          name: 'KitKat',
                          calories: 518,
                          fat: 26.0,
                          carbs: 65,
                          protein: 7,
                          iron: '6%',
                      },
                  ];
            },
            SET_TAGS (e, group_map) {
                //console.log(e);
               //
                const arr_tags_ids = [];

                for (let tag_id in e) {
                    if (e[tag_id]) {
                        arr_tags_ids.push(e[tag_id])
                    }
                }
                this.$store.commit('doctorSettings/SET_DOCTOR_TAGS', {group_map:group_map, data:arr_tags_ids});
               // this.$refs.form.resetValidation()
            },
            onSaveDoctorData(){
                //console.log(this.$refs.form);//забываем jquery. Здесь не нужно брать данные формы. Они храняться в data
                this.$store.dispatch('doctorSettings/SAVE_DOCTOR_SETTINGS_AJAX');
            },
            tags(component, processor, group){
               // console.log(this.$store.getters["doctorSettings/tagsSelected"](component, processor, group));

                return  this.$store.getters["doctorSettings/tagsSelected"](component, processor, group);
                //
                //return this.$store.getters["doctorSettings/tagsSelected"](component, processor, group);
                //
                //return this.getChildAges();
                //return this.$store.getters["doctorSettings/tagsSelected"];
            },

        },
        created(){
            //console.log('created');
            this.$store.dispatch('doctorSettings/GET_DOCTORS_AJAX', {limit:10});

        },

        computed:{
            //====================================================================
            ...mapGetters({
                getDoctors:'doctorSettings/getDoctors'
                ,getChildAges:'doctorSettings/getArrChildAges'
                //,currentDoctorId:'doctorSettings/currentDoctorId'
                ,tagsSelected:'doctorSettings/tagsSelected'
            }),

            ...mapState({currentDoctorId:'doctorSettings/currentDoctorId'}),
            //====================================================================
            ...mapMutations({SET_CURRENT_DOCTOR_ID:'doctorSettings/SET_CURRENT_DOCTOR_ID'
                //,currentDoctorId:'doctorSettings/getDoctors'
            }),
            //====================================================================

            currentDoctorId:{
                get(){        //console.log(this);
                    //todo разобраться с mapGetters и mapState
                    //return this.currentDoctorId;
                    return this.$store.getters["doctorSettings/currentDoctorId"];
                },
                set(val){
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);

                },
            },
            doctorSettings:{
                get(){        //console.log(this);
                    return this.$store.getters["doctorSettings/doctorSettings"];
                },
                set(val){

                    console.log(val);
                    //this.SET_CURRENT_DOCTOR_ID(val);
                    //this.$store.commit('doctorSettings/SET_CURRENT_DOCTOR_ID', val);
                    //this.$store.dispatch('doctorSettings/GET_DOCTOR_SETTINGS_AJAX');
                },
            },

            listDoctors(){                return this.getDoctors;                },
            listChildAges(){                return this.getChildAges;                }

        }


    }
</script>

<style scoped>

</style>

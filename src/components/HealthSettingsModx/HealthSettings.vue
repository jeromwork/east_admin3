<template>
    <v-row>
        <v-col cols="12"
               sm="12"
               md="12">


            <v-card
                    elevation="8"
                    outlined
            >

                <v-card-text>
                    <SpecialsSettings>

                    </SpecialsSettings>

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



    import SpecialsSettings from "./SpecialsSettings";

    import {mapGetters} from "vuex";
    export default {


        name: 'HealthSettings',

        props: {

        },
        components: {
            SpecialsSettings,

        },
        data: () => ({
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
            countItems : 10,
        }),

        methods: {
          ...mapGetters({
            getHealthDataItems:'HealthSettings/getHealthDataItems'
          }),


        },
        created(){

        },

        computed:{
        }


    }
</script>

<style scoped>

</style>

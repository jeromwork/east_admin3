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
                    <FilterSection/>
                </v-card-text>
            </v-card>
        </v-col>


        <v-col cols="12"
               sm="12"
               md="12">
            <v-card
                    elevation="8"
                    outlined
            >
                <v-card-text>
                    <DoctorsSection/>

                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

    //#1  забираются группы с сервера
    //там же забираются данные по филиалам
    //записывается в 2 массива - группы тэгов и филиалы
    //в цикле обходится массив с группами тэгов.
    //для группы смотрим какой тип (пока 3 и 4) и рендерим выбранный элемент
    //для филиалов рендерим селект отдельно, внизу


    //#2 (одновременновыбираем с #1 из сервера запрашиваем первых N докторов)
    //доктора на сервере сортируются по уровню, и выводятся сначала с самым большим уровнем
    //доктора приходят с сервера во вложенном массиве с id филиала
    //этот массив в цикле обходится и создается карточка филиала
    //во вложенном цикле - по докторам, обходим уже докторов и формируем список докторов в карточке, с указанием его суммарного уровня
    //для каждого доктора, будет значение его суммарного Level


    //выбирается первый фильтр
    //

    import FilterSection from "./Sections/FilterSection.vue"
    import DoctorsSection from "./Sections/DoctorsSection.vue"

    export default {
        name: 'DocSelect',

        props: {
        },
        components: {
            FilterSection,
            DoctorsSection
        },
        data: () => ({

        }),

        methods: {
        },
        created(){
            //console.log(window.location.hostname);

            this.$store.dispatch('DocSelect/GET_INITIAL_SETTINGS');
            this.$store.dispatch('DocSelect/GET_FILTERED_DOCTORS');
        },

        computed:{
        }
    }
</script>

<style scoped>

</style>

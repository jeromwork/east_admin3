<template>
    <div>Login
        <div v-if="anonim">
            Для работы, нужно войти в систему
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Login",
        computed:{
            ...mapGetters({
                isAnonim:'Login/isAnonim'
            }),
            anonim : {
                get(){
                    return this.isAnonim;
                },
            },
        },
    }
</script>

<style scoped>

</style>
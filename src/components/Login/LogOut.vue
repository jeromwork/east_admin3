<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        v-bind="attrs"
                        v-on="on"
                        icon
                >
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title justify="center">
                    <span class="text-h5">Хотите выйти из системы?</span>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                    >
                        Закрыть
                    </v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="doLogout"
                    >
                        Выйти
                    </v-btn><v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "LoginForm",
        props:{

        },
        data: () => ({
            dialog: false,
            login:'',
            password:'',
            valid: true,
            serverValid:true,
        }),
        computed:{

        },
        methods:{
            doLogout() {
                this.$store.commit('Login/DOLOGOUT' );
            },

        }
    }
</script>

<style scoped>

</style>
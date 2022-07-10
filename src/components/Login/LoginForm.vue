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
                    <v-icon>mdi-account-outline</v-icon>
                </v-btn>
            </template>
            <v-card>
              <v-tabs
                v-model="tab"
                right
              >
                <v-tabs-slider color="#1976d2"></v-tabs-slider>

                <v-tab
                  v-for="item in ['Вход', 'Регистрация']"
                  :key="item"
                >
                  {{ item }}
                </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                label="Имя"
                                v-model="name"
                                required
                                :error-messages="serverErrors.name"
                                :rules="[v => !!v || 'Обязательное поле']"
                                @input="clearErrors"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="password"
                                label="Пароль"
                                required
                                :rules="[v => !!v || 'Обязательное поле']"
                                type="password"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row v-if="serverSideError!= ''">
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              {{serverSideError}}
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
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
                        @click="doEnter"
                      >
                        Войти
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>

                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-text-field
                                label="email"
                                v-model="email"
                                required
                                :rules="[v => !!v || 'Обязательное поле']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-text-field
                                label="Логин"
                                autocomplete="off"
                                v-model="login"
                                required
                                :rules="[v => !!v || 'Обязательное поле']"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-text-field
                                autocomplete="off"
                                v-model="password"
                                label="Пароль"
                                required
                                :rules="[v => !!v || 'Обязательное поле']"
                                type="password"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-text-field
                                autocomplete="off"
                                v-model="password_confirmation"
                                label="Повторите пароль"
                                required
                                :rules="[rules.required, passwordConfirmationRule]"
                                type="password"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row v-if="serverSideError!= ''">
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              {{serverSideError}}
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>
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
                        @click="doRegister"
                      >
                        Регистрация
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>

            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
  //import _ from 'lodash';
    export default {
        name: "LoginForm",
        props:{

        },
        data: () => ({

            tab:null,
            dialog: false,
            email:'',
            name:'',
            login:'',
            password:'',
            password_confirmation:'',
            valid: true,
            serverValid:true,
            serverErrorStr:'',
            rules: {required: value => !!value || 'Обязательное поле.',
              min: v => v.length >= 8 || 'Min 8 characters',
              emailMatch: () => ('The email and password you entered don\'t match'),},

        }),
      watch:{
      },
        computed:{
          serverErrors:{
            get(){
              return this.$store.getters["Login/getServerErrors"];
            },
          },
            serverSideError:{
                get(){
                    return this.serverErrorStr;
                },
                set(val){
                    this.serverErrorStr = val;
                },
            },
          passwordConfirmationRule() {
            return () => (this.password.slice(0, this.password_confirmation.length) === this.password_confirmation || this.password === this.password_confirmation) || 'Пароли должны совпадать'
          },


        },
        methods:{
          clearErrors(){
             this.$store.commit('Login/SET_SERVER_ERRORS' );
          },
            doEnter() {

                this.$refs.form.validate()
                if(this.name === '' || this.password === ''){
                    return false;
                }


                // this.$store.commit('Login/DOENTER', {login: this.login, password: this.password, handError:this.serverError, ths:this, handOk:this.serverOk});
                this.$store.dispatch('Login/enterToSystem', {name: this.name, password: this.password});

            },

          doRegister() {

            this.$refs.form.validate()
            if(this.login === '' || this.password === ''){
              return false;
            }

            this.$store.dispatch('Login/registerInSystem',{login: this.login, password: this.password, email: this.email, password_confirmation: this.password_confirmation, });
            //this.$store.commit('Login/DOENTER', {login: this.login, password: this.password, handError:this.serverError, ths:this, handOk:this.serverOk});
          },
            serverError : (error, ths) => {
                //console.log(error);
                //console.log(ths);
                //ths.dialog = true;
                ths.serverErrorStr = error;
            },
            serverOk(ths){
                ths.serverErrorStr = '';
                ths.dialog = false;
            },
        }
    }
</script>

<style scoped>

</style>

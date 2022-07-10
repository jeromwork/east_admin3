<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      @click:outside="Close"
    >

      <v-card tile >
        <div>


          <v-toolbar

            flat
            dark
            color="purple"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
          >
            <v-btn
              icon
              dark
              @click="Close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </div>



        <v-card-text>
          <v-container fluid>
          <v-form v-model="valid">
            <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-if="fields['rating']"
                v-model="editedItem['rating']"
                label="Рейтинг"
                type="number"
              ></v-text-field>
            </v-col>
            </v-row>
            <v-row>
            <v-col
              cols="12"
              md="12"
            >
              <v-textarea
                v-if="fields['text']"
                v-model="editedItem['text']"
                label="Текст комментария"
                counter="250"
                solo
              ></v-textarea>
            </v-col>
            </v-row>
            <v-row>
            <v-col
              md="6"
            >
              <e-select
                v-if="fields['reviewable_type']"
                v-model="editedItem['reviewable_type']"
                url="reviews/reviewable-type"
                label="Тип отзыва"
                :items="reviewableTypes()"
                :dispatchStore="{getItems:'Reviews/getReviewableTypes'}"
              ></e-select>
            </v-col>
            <v-col
              md="6"
            >
              <autocomplete
                v-if="fields['reviewable_id'] && editedItem['reviewable_type']"
                v-model="editedItem['reviewable_id']"
                label="Чей отзыв"
                :dispatchStore="{getItems:'Doctors/getIdText'}"
              ></autocomplete>
            </v-col>
            </v-row>
          </v-form>
          </v-container>
          <v-divider></v-divider>


        </v-card-text>

      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="saveSuccess"
      right
    >
      {{lastMessageFromServer}}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="saveSuccess = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>

    import ESelect from "../../widgets/ESelect/ESelect.vue"
    // import _ from "lodash";
    import Autocomplite from "../../widgets/Autocomplite/Autocomplite.vue"


    export default {
        name: "Edit",
      components: {
        // 'multi-tags' : MultiTags,
        'e-select' : ESelect,
        'autocomplete' : Autocomplite,
      },
        props:{
          toogle:Boolean,
          fields:{  type:Object, required:true,  },
          item:{type: Object},
          urlApi:{
            type:String,
            required:true,
          },

        },
      created() {

      },
        data:() => {
          return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            editedItem:{},
            editedItemJSON : '',
            valid: false,
            nameRules: [
              v => !!v || 'Name is required',
              v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],

            mapRowsCols : [],
            saveSuccess:false,
            lastMessageFromServer:'',
          }
        },

      methods:{

          Close(){
            if(JSON.stringify(this.editedItem) !== this.editedItemJSON){//если данные были изменены,
              if(confirm('Выйти без сохранения?')) {//нужно предложить их сохранить, либо выйти без сохранения
                this.editedItem = JSON.parse(this.editedItemJSON);
                this.$emit('close');
              }
            }else{
              this.editedItem = JSON.parse(this.editedItemJSON);
              this.$emit('close');
            }
          },


          save(){
              this.$emit('close');
              this.saveSuccess = true

              //обходим настройки полей.
              //если видим у поля настройки сохранения, и таких настроек еще не было, формируем новый объект
              //если настройки уже были, значит добавляем данные для сохранения
              //отправляем данные для сохранения, только в том случае, если для такого поля был url для сохранения
              let saveData = this.getSaveData();
              //сначала сохраняем основную модель, потом остальные модели



            //todo потом как понадобится можно сделать множественное сохранение для разных моделей

            if(this.item?.id){
              this.updateModel(saveData, this.urlApi);
            }else{
              this.createModel(saveData, this.urlApi );
            }
              // if(saveData[this.urlApi]){
              //     this.createModel(saveData[this.urlApi], this.urlApi );
              //     delete saveData[this.urlApi];
              // }
              // if(Object.keys(saveData).length > 0){
              //     _.each(saveData, (data, url) => {
              //       this.updateModel(data, url);
              //     });
              // }
            return;
        },

        getChangeData(){
            return {};
        },
        updateModel(data, url){
          this.$http.put('api/' + url + '/' + this.item.id, {...data} )
            .then(response => {
              this.handRequestFromServer(response);
            });
        },
        createModel(data, url){
          this.$http.post('api/' + url, {...data} )
            .then(response => {

              this.handRequestFromServer(response);

            });
        },
        handRequestFromServer(response){
          //todo сделать вывод success & error
          if(response.data && response.data.ok){
            this.lastMessageFromServer = 'Сохранение прошло успешно!';
            if(this.item.id){
              this.$emit('save', this.item.id);
            }

          }else{
            console.log('Ошибка сохранения сущности')
          }
        },

        getSaveData(){
          //предполагается что в одной форме редактирования, могут сохранятся данные по разным роутам ларавел
          //поэтому нужно проверить какие данные изменились
          //собрать массив роутов
          //и в каждый массив записать поля и измененные данные
          //потом в цикле обойти роуты и сохранить
          //выводя ошибки если есть
          //и вывести одно оповещение об успешном сохранении для всех роутов
          let saveFields = {};
          this._.map(this.fields, (field) => {

            if(JSON.stringify(this.editedItem[field]) !== JSON.stringify(this.item[field])){
              saveFields[field] = this.editedItem[field];
            }
          });
          return saveFields;
        },
        reviewableTypes (){
          return this.$store.getters[ "Reviews/getReviewableTypes"];
        },
      },

      computed:{
      },
      watch:{
        item(item){
          this.editedItem = {...item};
          this.editedItemJSON = JSON.stringify(this.editedItem)
        },
        toogle(toogle){
          if(toogle !== this.dialog){
            this.dialog = toogle;
          }
        },

      }
    }
</script>

<style scoped>

</style>

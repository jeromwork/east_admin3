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
          sdsdfwe
          <v-form v-model="valid">
            <v-container fluid v-if="mapRowsCols.length > 0">


              <v-row  v-for="(row, index) in mapRowsCols" :key="index">

                <v-col
                  cols="12"
                  :md="(field.render.col && field.render.col.md) ? field.render.col.md : 12"
                  v-for="(field, index) in row" :key="index"
                >
                  <v-text-field
                    v-if="field.render.type==='text'"
                    v-model="editedItem[field.value]"
                    :counter="field.countSymbols"
                    :label="field.text"

                  ></v-text-field>

                  <v-textarea
                    v-if="field.render.type==='textarea'"
                    v-model="editedItem[field.value]"
                    :label="field.text"
                    solo
                  ></v-textarea>

                  <multi-tags
                    v-if="field.render.type == 'multiTags'"
                    v-model="editedItem[field.value]"
                    :key="field.value"

                    :field="field.value"
                    :serverSettings="field.serverSettings"
                    :fieldSettins="field"
                    :label="field.text"
                  ></multi-tags>

                  <v-checkbox
                    v-if="field.render.type == 'checkbox'"
                    v-model="editedItem[field.value]"
                    true-value="1"
                    false-value="0"
                    :label="field.text"
                  ></v-checkbox>

                  <e-select
                    v-if="field.render.type == 'select'"
                    v-model="editedItem[field.value]"
                    :key="field.value"
                    :field="field.value"
                    :items="field.items"
                    :server="field.server"
                    :label="field.text"
                    dense
                  ></e-select>

                </v-col>

              </v-row>
            </v-container>
          </v-form>

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

  import MultiTags from "../../widgets/MultiTags/MultiTags.vue";
  import ESelect from "../../widgets/ESelect/ESelect.vue"
  import _ from "lodash";

  export default {
    name: "EEdit",
    components: {
      'multi-tags' : MultiTags,
      'e-select' : ESelect,
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
        if(saveData[this.urlApi]){
          this.createModel(saveData[this.urlApi], this.urlApi );
          delete saveData[this.urlApi];
        }
        if(Object.keys(saveData).length > 0){
          _.each(saveData, (data, url) => {
            this.updateModel(data, url);
          });
        }
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
          let url = (field.server?.urlSet) ? field.server.urlSet: this.urlApi;
          if(url && field.value && JSON.stringify(this.editedItem[field.value]) !== JSON.stringify(this.item[field.value])){
            if(!saveFields[url]){
              saveFields[url] = {};
            }
            saveFields[url][field.value] = this.editedItem[field.value];
          }
        });
        return saveFields;
      },
    },

    computed:{
    },
    watch:{
      item(item){
        this.editedItem = {...item};
        this.editedItemJSON = JSON.stringify(this.editedItem)
      },

      fields(fields){
        this.mapRowsCols = {};
        this._.map(fields, (field) => {
          if(!field.render) return;
          let row = (field.render.rowNumber) ? field.render.rowNumber : 1;
          if(!this.mapRowsCols[row]){
            this.mapRowsCols[row] = [];
          }
          this.mapRowsCols[row].push(field);
        });
        this.mapRowsCols = this._.values(this.mapRowsCols);
        if(this.mapRowsCols[0]?.length === 0){//если не нашли ни одного поля для рендерингка
          this.mapRowsCols = [];//тогда вообще ничего не надо рендерить
        }

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

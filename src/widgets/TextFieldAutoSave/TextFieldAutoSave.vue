<template>
  <div>
    <v-text-field
      v-if="item"
      :value="item[field]"
      @change="saveData($event)"
      :label="label"
    />
    <v-snackbar
      v-model="alert"
    >
      {{ alertText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="alert = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>

//
    export default {
        name: "TextFieldAutoSave",
        props: {
            item:{
              id:Number,
              required:true,
            },
          id:{},

          field:{type:String, required: true},
          serverSettings:{
            component : {type:String, required: true},
            item: {type:String, required: true},
            action:{type:String, required: true },
          },
          url:String,

          label : String,


        },
      data:() =>({
        alertText:'',
        alert:false,
      }),


      methods:{
          saveData(value){
            console.log(value)
            console.log(this)

            console.log(this.item)
            if(!this.item.id){
              throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
            }

            let data = {};
            data[this.field] = value;
            // let requestData = {
            //   //id:this.item.id,
            //   data,
            // };
            this.$http.put('api/' + this.url + '/' + this.item.id, {...data} )
                    .then(response => {
                      console.log(response)
                      this.alertText = 'Сохранено!';
                      this.alert = true;
                    }).catch(
//todo сделать вывод ошибок и подтверждение сохранения
               (error) => {
                this.alertText = error;
                this.alert = true;
                console.log(error)
              }
            );
          }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>

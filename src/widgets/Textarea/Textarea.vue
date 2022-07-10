<template>
  <div>
    <v-textarea
      v-model="model"
      @change="saveData($event)"
      :label="label"
      solo
      v-bind="properties"
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
        name: "Textarea",
        props: {
          //item:{type:, },
          label: String,
          dispatchStore: {type: Object},
          itemId: {type: Number},
          field: {type: String},
          value: {required: false},
        },
      data:() =>({
        alertText:'',
        alert:false,
        properties:{},
      }),
      computed:{
        model: {
          get() {
            //console.log(this)
            return this.value;
          },
          set(value) {
            this.$emit('input', value);
          },
        },
      },


      methods:{
          saveData(value){
            console.log(value)
            console.log(this)

//             console.log(this.item)
//             if(!this.item.id){
//               throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
//             }
//
//             let data = {};
//             data[this.field] = value;
//             // let requestData = {
//             //   //id:this.item.id,
//             //   data,
//             // };
//             this.$http.put('api/' + this.url + '/' + this.item.id, {...data} )
//                     .then(response => {
//                       console.log(response)
//                       this.alertText = 'Сохранено!';
//                       this.alert = true;
//                     }).catch(
// //todo сделать вывод ошибок и подтверждение сохранения
//                (error) => {
//                 this.alertText = error;
//                 this.alert = true;
//                 console.log(error)
//               }
//             );
            this.$emit('change', value);
          }
      },
      created() {
        this.properties = {...this.$options.propsData, ...this.$attrs}
      }
    }
</script>

<style scoped>

</style>

<template>
  <v-checkbox
    :input-value="(+item[field])"
    @change="saveData($event)"
  >

</v-checkbox>

</template>

<script>
    export default {
        name: "ECheckbox",
        props: {
            item:{
              id:Number,
            },
          id:{},
          field:{type:String, required: true},
          serverSettings:{
            component : {type:String, required: true},
            item: {type:String, required: true},
            action:{type:String, required: true },
          }


        },

      methods:{
          saveData(value){
            console.log(value)
            console.log(this)

            console.log(this.item)
            if(!this.item.id){
              throw new Error('Отсутсвует id для сущности. Невозможно сохранить данные')
            }

            let data = {};
            data[this.field] = + value;
            let requestData = {
              action: this.serverSettings.actionSave,
              component: this.serverSettings.component,
              id:this.item.id,
              data,
            };
            this.$http.post(this.$http.CONNECTOR_URL, requestData )
                    .then(response => {
                      this.info = response
                      if(!response.data || !response.data.items || !response.data.count)
                      {
                        console.log('Проверьте структуру данных Специальностей');
                        return;
                      }

                    });
          }
      },
      created() {

      }
    }
</script>

<style scoped>

</style>

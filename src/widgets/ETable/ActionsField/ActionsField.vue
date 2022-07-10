<template>
<div>
  <delete-item
  v-if="actionDelete"
  @removedItem="removedItem"
  :urlApi="urlApi"
  :item-id="item.id"
  />


  </div>
</template>

<script>
  import DeleteItem from '../../../widgets/DeleteItem/DeleteItem.vue';
    export default {
        name: "ActionsField",
      components:{
        'delete-item' : DeleteItem,
      },
      props:{
          item:{
            type:Object,
            required:true,
          },
        urlApi:{
          type:String,
          required:true,
        },
        actions:{type:String,
          required:false,}
      },
      data : () => ({

      }),
      created() {

      },
      computed:{
        actionDelete(){
          // console.log(this)
          return (this.actions?.indexOf('delete') > -1)
        },
        actionPublication(){
          return (this.actions?.indexOf('publication') > -1)
        },
      },
      methods:{
        removedItem(){
          this.$emit('removedItem');
          console.log(';removeItem')
        }
      },



    }

</script>

<style scoped>

</style>

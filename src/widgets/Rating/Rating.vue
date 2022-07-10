<template>
  <v-rating
    @input="setRating"
    :value="value"
    hover
    length="5"
    half-increments
  ></v-rating>
</template>

<script>
    export default {
        name: "Rating",
      props:{
        value:{
          type:Number
        },
        momentSave:{
          type:Boolean,
          required:false,
        },
        dispatchStore:{
          type:Object
        },
        disabled:{
          type:Boolean
        },
        itemId:{
          type:Number
        },
        field:{
          type:String
        },
      },
      data : () => ({

      }),
      methods:{
        setRating(val){
          if(this.momentSave && this.dispatchStore.momentSave && this.itemId && this.field){
            let data = {id:this.itemId};
            data[this.field] = val;
            this.$store.dispatch(this.dispatchStore.momentSave, data, 33333);
          }
        },
      },
    }
</script>

<style scoped>

</style>

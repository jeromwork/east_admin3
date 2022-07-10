<template>
  <v-rating
    v-model="rating"
    hover
    length="5"
    half-increments
  ></v-rating>
</template>

<script>
    export default {
        name: "Rating",
      props:{
        rating:{
          type:Number
        }
      },
      data : () => ({

      }),
    }
</script>

<style scoped>

</style>

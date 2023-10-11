<template>
  <v-autocomplete :items="items" :menu-props="{ maxWidth: 300 }" class="autocomplete">
    <!--  -->
  </v-autocomplete>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.autocomplete {
  width: 300px;
}
</style>

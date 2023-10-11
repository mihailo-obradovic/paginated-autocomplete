<template>
  <v-autocomplete
    :items="items"
    :loading="loading"
    :menu-props="{ maxWidth: 300 }"
    class="autocomplete"
    clearable
  >
    <!--  -->
  </v-autocomplete>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },

  loading: {
    type: Boolean,
    required: false
  }
});
</script>

<style lang="scss" scoped>
.autocomplete {
  width: 300px;
}
</style>

<template>
  <v-autocomplete
    :items="items"
    :loading="loading"
    :menu-props="{ maxWidth: 300 }"
    class="autocomplete"
    clearable
    no-filter
    v-model:search-input="search"
    @update:search="emitSearch"
  >
    <template #append-item>
      <template v-if="!!items.length">
        <div v-if="!loading" v-intersect="handleIntersection" />

        <div v-else class="px-4 py-3 text-primary">Loading more...</div>
      </template>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { ref } from 'vue';

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

const emit = defineEmits(['intersect', 'update:search-input']);

function handleIntersection(isIntersecting) {
  if (isIntersecting) {
    emit('intersect');
  }
}

const search = ref(null);

function emitSearch(value) {
  emit('update:search-input', value);
}
</script>

<style lang="scss" scoped>
.autocomplete {
  width: 300px;
}
</style>

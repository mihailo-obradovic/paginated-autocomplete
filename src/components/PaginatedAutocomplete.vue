<template>
  <v-autocomplete
    :items="items"
    :loading="loading"
    :menu-props="{ maxWidth: 300, class: `dropdown-${uid}` }"
    :model-value="selectedItem"
    class="autocomplete"
    clearable
    no-filter
    v-model:search-input="search"
    @update:model-value="emitSelection"
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
import debounce from 'lodash/debounce';

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

const emit = defineEmits(['intersect', 'update:model-value', 'update:search-input']);

function handleIntersection(isIntersecting) {
  if (isIntersecting) {
    emit('intersect');
  }
}

const selectedItem = ref(null);

function emitSelection(value) {
  selectedItem.value = value;

  emit('update:model-value', value);
}

const search = ref(null);

const debouncedEmit = debounce((value) => {
  emit('update:search-input', value);

  resetDropdownScroll();
}, 500);

function emitSearch(value) {
  debouncedEmit(value);
}

const uid = Math.round(Math.random() * 10e4);

function resetDropdownScroll() {
  const menuWrapper = document.getElementsByClassName(`dropdown-${uid}`)[0];
  const menuList = menuWrapper?.firstElementChild?.firstElementChild;

  if (menuList) {
    menuList.scrollTop = 0;
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  width: 300px;
}
</style>

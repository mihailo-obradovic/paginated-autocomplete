<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// import HelloWorld from './components/HelloWorld.vue';
// import TheWelcome from './components/TheWelcome.vue';
import PaginatedAutocomplete from './components/PaginatedAutocomplete.vue';

const records = ref([]);

const loading = ref(false);

const pagination = ref({
  page: 1,
  perPage: 10,
  total: 100
});

function loadRecords() {
  loading.value = true;

  const params = {
    _start: (pagination.value.page - 1) * pagination.value.perPage,
    _limit: pagination.value.perPage,
    q: query.value
  };

  axios
    .get('https://jsonplaceholder.typicode.com/posts', { params })
    .then((response) => {
      const recordsToAdd = response.data.filter((post) => post.title.includes(params.q || ''));

      if (pagination.value.page === 1) {
        records.value = recordsToAdd;
        pagination.value.total = response.headers['x-total-count'];
      } else {
        records.value = [...records.value, ...recordsToAdd];
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}

function loadNextPage() {
  if (pagination.value.page * pagination.value.perPage >= pagination.value.total) {
    return;
  }

  pagination.value.page++;

  loadRecords();
}

const query = ref(null);

function handleSearchInput(value) {
  if (selectedRecord.value === value) {
    return;
  }

  query.value = value;

  pagination.value = Object.assign({}, { page: 1, perPage: 10, total: 100 });

  loadRecords();
}

const selectedRecord = ref(null);

onMounted(() => {
  loadRecords();
});
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <main>
    <PaginatedAutocomplete
      v-model="selectedRecord"
      :items="records"
      :loading="loading"
      @intersect="loadNextPage"
      @update:search-input="handleSearchInput"
    />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

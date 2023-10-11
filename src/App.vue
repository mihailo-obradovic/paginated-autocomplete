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
    _limit: pagination.value.perPage
  };

  axios
    .get('https://jsonplaceholder.typicode.com/posts', { params })
    .then((response) => {
      records.value = response.data;
      pagination.value.total = response.headers['x-total-count'];
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
}

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
    <PaginatedAutocomplete :items="records" :loading="loading" />
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

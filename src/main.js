import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VAutocomplete } from 'vuetify/components';
import { Intersect } from 'vuetify/directives';

const vuetify = createVuetify({
  components: { VAutocomplete },
  directives: { Intersect }
});

createApp(App).use(vuetify).mount('#app');

import * as Vue from 'vue';
import componentexample from './componentexample';

const app = new Vue({
  el: 'html',
  data: {
    message: 'Hello World'
  },
  components: {
    componentexample
  }
})

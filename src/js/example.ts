// Vue Import
import * as Vue from 'vue';

// ------------------------------------------------------------
// Weird Thing I dont wanna do but is necessary with TypeScript
// assigns the imported jQuery object as jQuery & $ on window.
import * as jQuery from 'jquery';
Object.assign(Window.prototype, {
  jQuery,
  $: jQuery
});
import 'bootstrap';
// End Weird Stuff
// ------------------------------------------------------------

// Component Imports
import componentexample from './componentexample';

// Initial Vue Object
const app = new Vue({
  el: 'html',
  data: {
    message: 'Hello World'
  },
  components: {
    componentexample
  }
});

(() => {
// Do Stuff Here
})();

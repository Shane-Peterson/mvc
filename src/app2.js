import "./app2.css";
import Vue from "vue";


const localKey = 'app2.index'

const init = (el) => {
  new Vue({
    el: el,
    data: {index: parseInt(localStorage.getItem(localKey)) || 0},
    watch: {
      index(){
        localStorage.setItem(localKey, JSON.stringify(this.index))
      }
    },
    template: `
      <section id="app2">
      <ol class="tab-bar">
        <li :class="index === 0 ? 'selected' : ''" @click="index=0">Vue</li>
        <li :class="index === 1 ? 'selected' : ''" @click="index=1">React</li>
      </ol>
      <ol class="tab-content">
        <li :class="index === 0 ? 'active' : ''">Vue.js features an incrementally adaptable architecture that focuses on declarative rendering and
          component composition.
        </li>
        <li :class="index === 1 ? 'active' : ''">React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for
          building user interfaces based on UI components.
        </li>
      </ol>
      </section>
    `
  })
}


export default init


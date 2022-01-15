import "./app1.css";
import Vue from "vue"

const init = (el) => {
  const m = {
    get(){
      return Number(localStorage.getItem('n')) || 100
    },
    set(n){
      return localStorage.setItem('n', JSON.stringify(n))
    }
  }
  new Vue({
    el: el,
    data: {n: m.get()},
    watch: {
      n(){
        m.set(this.n)
      }
    },
    template: `
    <section id="app1">
        <div class="output"><span id="number">{{n}}</span></div>
        <div class="actions">
          <button @click="add">+1</button>
          <button @click="minus">-1</button>
          <button @click="mul">*2</button>
          <button @click="div">÷2</button>
        </div>
      </section>
    `,
    methods: {
      add() {
        this.n += 1
      },
      minus() {
        this.n -= 1
      },
      mul() {
        this.n *= 2
      },
      div() {
        this.n /= 2
      }
    }

  })
}


export default init
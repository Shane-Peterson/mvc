import "./app1.css";
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";

const m = new Model({
  data: {
    n: Number(localStorage.getItem('n')) || 100,
  },
  update: function (data) {
    Object.assign(this.data, data)
    this.trigger('updated')
    localStorage.setItem('n', JSON.stringify(this.data.n))
  }
});

const init = (el) => {
  new View({
    data: m.data,
    el: el,
    html: `
      <div>
        <div class="output"><span id="number">{{n}}</span></div>
        <div class="actions">
          <button id="add1">+1</button>
          <button id="minus1">-1</button>
          <button id="mul2">*2</button>
          <button id="div2">÷2</button>
        </div>
      </div>
    `,
    render: function (data) {
      const n = data.n
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html.replace("{{n}}", JSON.stringify(n))).appendTo(this.el)
    },
    events: {
      "click #add1": "add",
      "click #minus1": "minus",
      "click #mul2": "mul",
      "click #div2": "div"
    },
    add() {
      m.update({n: m.data.n += 1})
    },
    minus() {
      m.update({n: m.data.n -= 1})
    },
    mul() {
      m.update({n: m.data.n *= 2})
    },
    div() {
      m.update({n: m.data.n /= 2})
    }
  })
}


export default init
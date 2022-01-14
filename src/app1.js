import "./app1.css";
import $ from "jquery";
import Model from "./base/Model";
// import View from "./base/View";

const eventBus = $({})

const m = new Model({
  data: {
    n: Number(localStorage.getItem('n')) || 100,
  },
  update: function (data) {
    Object.assign(this.data, data)
    eventBus.trigger('m:updated')
    localStorage.setItem('n', JSON.stringify(this.data.n))
  }
});

const view = {
  el: null,
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
  render: function(n) {
    if (this.el.children.length !== 0) {
      this.el.empty()
    }
    $(this.html.replace("{{n}}", JSON.stringify(n))).appendTo(this.el)
  },
  init(container) {
    this.el = $(container)
    this.render(m.data.n)
    this.autoBindEvents()
    eventBus.on('m:updated', () => {
      this.render(m.data.n)
    })
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
  },
  autoBindEvents() {
    for (let key in this.events) {
      const value = this[this.events[key]]
      const spaceIndex = key.indexOf(' ')
      const part1 = key.slice(0, spaceIndex)
      const part2 = key.slice(spaceIndex + 1)
      this.el.on(part1, part2, value)

    }
  }
}
export default view
import "./app2.css";
import $ from "jquery";
import Model from "./base/Model";

const eventBus = $({})

const localKey = 'app2.index'
const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(m.data, data)
    eventBus.trigger('index:updated')
    localStorage.setItem(localKey, JSON.stringify(m.data.index))
  }
})


const view = {
  el: null,
  html(index) {
    return `
      <div>
        <ol class="tab-bar">
          <li class="${index === 0 ? 'selected' : ''}" data-index="0">Vue</li>
          <li class="${index === 1 ? 'selected' : ''}" data-index="1">React</li>
        </ol>
        <ol class="tab-content">
          <li class="${index === 0 ? 'active' : ''}">Vue.js features an incrementally adaptable architecture that focuses on declarative rendering and
              component composition.
          </li>
          <li class="${index === 1 ? 'active' : ''}">React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for
              building user interfaces based on UI components.
          </li>
        </ol>
      </div>
    `
  },
  render(index) {
    if (this.el.children.length !== 0) {
      this.el.empty()
    }
    $(this.html(index)).appendTo(this.el)
  },
  init(container) {
    this.el = $(container)
    this.render(m.data.index)
    this.autoBindEvents()
    eventBus.on('index:updated', () => {
      this.render(m.data.index)
    })
  },
  events: {
    "click .tab-bar>li": "click",
  },
  click(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    m.update({index: index})
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


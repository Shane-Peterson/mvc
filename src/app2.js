import "./app2.css";
import $ from "jquery";
import Model from "./base/Model";
import View from "./base/View";


const localKey = 'app2.index'
const m = new Model({
  data: {
    index: parseInt(localStorage.getItem(localKey)) || 0
  },
  update(data) {
    Object.assign(this.data, data)
    this.trigger('updated')
    localStorage.setItem(localKey, JSON.stringify(this.data.index))
  }
})

const init = (el) => {
  new View({
    el: el,
    data: m.data,
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
    render(data) {
      const index = data.index
      if (this.el.children.length !== 0) {
        this.el.empty()
      }
      $(this.html(index)).appendTo(this.el)
    },
    events: {
      "click .tab-bar>li": "click"
    },
    click(e) {
      const index = parseInt(e.currentTarget.dataset.index);
      m.update({index: index})
    }
  })
}


export default init


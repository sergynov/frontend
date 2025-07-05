import { Component } from '../core/Component';

export class ListItem extends Component {
  setup(props) {
    this.state = {
      id: Date.now(),
      date: new Date(),
      amount: props.amount
    }
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donate-item';

    const day = this.state.date.getDate()
    const month = this.state.date.getMonth()
    const year = this.state.date.getFullYear()
    const hour = this.state.date.getHours()
    const minute = this.state.date.getMinutes()
    const formattedDate = `${day}/${month}/${year}, ${hour}:${minute}`
    this.$rootElement.id = this.state.id

    this.$deleteButton = document.createElement('button')
    this.$deleteButton.textContent = 'Удалить'
    this.$deleteButton.className = 'delete_button'

    this.$rootElement.innerHTML = `<div>${formattedDate} - <b>$${this.state.amount}</b></div>`
    this.$rootElement.append(this.$deleteButton)
  }
}

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

    this.$rootElement.id = this.state.id
    
  }
}

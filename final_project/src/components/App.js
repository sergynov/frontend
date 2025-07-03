import { Component } from '../core/Component';
import { Form } from './Form';
import { List } from './List';
import { ListItem } from './ListItem';

export class App extends Component {
  setup(props) {
    
    this.state = {
      total: 0,
      donates: [],
      amount: ''
    }
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'app';
    this.$rootTitle = document.createElement('h1')
    this.$rootTitle.className = 'total-amount'
    this.$rootTitle.textContent = 'Итого: $'
    const span = document.createElement('span')
    span.textContent = this.state.total
    this.$total = span 

    const donateForm = new Form({
      onSubmit: this.onItemCreate.bind(this)
    });
    this.$rootElement.appendChild(donateForm.$rootElement);
    const donateList = new List();
    this.$rootElement.appendChild(donateList.$rootElement);

    this.$donateList = donateList

  }
  
  onItemCreate(amount) {
    
    const item = new ListItem({amount})
    this.state.donates.push(item)
    this.$donateList.addItem(item)
    this.state.total += Number(amount)
    this.$total.textContent = this.state.total
  }
}

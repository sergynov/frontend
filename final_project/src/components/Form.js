import { Component } from '../core/Component';

export class Form extends Component {
  setup(props) {
    this.state = {
      amount: '',
    }
    this.$rootElement = document.createElement('form');
    this.$rootElement.className = 'donate-form';
    

    const label = document.createElement('label')
    label.textContent = 'Введите сумму в $'
    label.className = 'donate-form__input-label'

    const input = document.createElement('input')
    input.className = 'donate-form__donate-input'
    input.name = 'amount'
    input.type = 'number'
    input.max = '100'
    input.min = '1'

    const button = document.createElement('button')
    button.textContent = 'Задонатить'
    button.className = 'donate-form__submit-button'
    button.type = 'submit'
    this.$input = input
    this.$button = button
    this.$button.disabled = true;
    this.$rootElement.appendChild(label)
    label.appendChild(input)
    this.$rootElement.appendChild(this.$button)
    
    this.$input.addEventListener('input',this.handleInput.bind(this))
    this.$rootElement.addEventListener('submit',this.handleSubmit.bind(this))


  }

  handleInput(event) {
    console.log(event.target.value)
    this.state.amount = event.target.value;
    console.log(this.isValid)
    this.$button.disabled = !this.isValid
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.isValid) {
      this.props.onSubmit(this.state.amount)
      this.state.amount = ''
      this.$input.value = ''

    }
  }
}

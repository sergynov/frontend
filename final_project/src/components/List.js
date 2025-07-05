import { Component } from '../core/Component';

export class List extends Component {
  setup() {
    this.$rootElement = document.createElement('div');
    this.$rootElement.className = 'donates-container';
    const listTitle = document.createElement('h2')
    listTitle.textContent = 'Список донатов'
    listTitle.className = 'donates-container__title'

    this.$rootElement.appendChild(listTitle)

    const listContainer = document.createElement('div')
    listContainer.className = 'donates-container__donates'
    this.$listContainer = listContainer
    this.$rootElement.appendChild(this.$listContainer)

    //обработчик на кнопку удалить
    this.$rootElement.addEventListener('click', (event) => {
      this.props.onDelete(event, this.$listContainer);
    });
  }


  addItem(item) {
    this.$listContainer.appendChild(item.$rootElement)
  }

  
}
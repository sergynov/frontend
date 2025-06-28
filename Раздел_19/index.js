import {sum} from './main';
import './style.css'; 

console.log('Hello world!')

const image = document.createElement('img')
image.src = './assets/js.png'
const text = document.createElement('h1')
text.textContent = 'I love JavaScript'

const container = document.querySelector('.container')
container.append(image)
container.append(text)
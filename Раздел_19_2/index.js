import './index.css'
import JS_img from './assets/js.png'

console.log('Hello world')

const container = document.querySelector('.container')
const image = document.createElement('img')
image.src = JS_img
container.append(image)

const h1 = document.createElement('h1')
h1.textContent = 'Webpack'
container.append(h1)
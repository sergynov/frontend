import { App } from './components/App';
//import { DemoCounter } from './components/Demo/DemoCounter';
import './index.css';

document.addEventListener('DOMContentLoaded', function () {    
  document.body.appendChild(new App().$rootElement);
  //document.body.appendChild(new DemoCounter({ title: 'App counter' }).$rootElement);
});

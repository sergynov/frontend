import { createElement, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const currentYear = new Date().getFullYear()

  return (
    createElement(
      'div',
      null,
    ),
    createElement(
      'a',
      {href:'https://vite.dev', target: '_blanc'},
      createElement(
        'img',
        {src:viteLogo, className: 'logo', alt:'Vite Logo'}
      )
    ),
    createElement(
        'a',
        {href:'https://react.dev', target:'_blanc'},
        createElement(
          'img',
          {src:reactLogo, className:'logo react', atl:'React logo'}
        )
      ),
    createElement(
      'h1',
      null,
      'Vite + React'
    ),
    createElement(
      'div',
      {className:'card'},
      createElement(
        'button',
        { onClick: () => setCount((count) => count + 1)}
        `count is ${count}`
      ),
      createElement(
        'p',
        null,
        'Edit ',
        createElement('code',null,'src/App.jsx'),
        'and save to test HMR'
      )
    ),
    createElement(
      'p',
      {className:'read-the-docs' },
      'Click on the Vite and React logos to learn more'
    ),
    createElement(
      'div',
      {className: 'cirrent_year'},
      createElement('p',{currentYear})
    )
  )
}

import styles from 'rollup-plugin-styles'
import babel from '@rollup/plugin-babel'
import plugin from 'postcss-modules-values'

export default {
  input: './index.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel(),
    styles()
  ]
}
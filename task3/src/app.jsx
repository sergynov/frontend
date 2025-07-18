import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {

	const [operand1, setOperand1] = useState('')
	const [operand2, setOperand2] = useState('')
	const [operator, setOperator] = useState('')
	const expression = operand1 + operator + operand2
	const [result, setResult] = useState('')

	const NUMS = ['0','1','2','3','4','5','6','7','8','9']

	const handleDigit = (digit) => {
		if (operator === '') {
    setOperand1((prev) => prev + digit);
  } else {
    setOperand2((prev) => prev + digit);
  }
	}
	const reset = ()=> {
		setOperand1 ('') 
		setOperand2 ('')
		setOperator('')
		setResult('')
	}

	const handleOperator = (sign)=> {
		setOperator(sign)
	}

	const getResult = (operand1,operand2,operator)=> {
		const num1 = Number(operand1)
		const num2 = Number(operand2)
		if (isNaN(num1) || isNaN(num2) || operator === '') {
    setResult('Ошибка');
    return;
  }

  let res;

  switch (operator) {
    case '+':
      res = num1 + num2;
      break;
    case '-':
      res = num1 - num2;
      break;
	}
	setResult(res.toString());
	setOperand2('');
  setOperand1('');
	setOperator('')
	}
	return (
		<>
		<div className={styles.container}>
			<h1>Calculator</h1>
			<div className={styles.output}>
				<p>Input: {expression} 
				</p>
				<p>Total: {result}</p>
				
			</div>
			<div className={['button-box']}>
				<div className={['numbers']}>
					{NUMS.map((item) => <button className={styles['number-button']}
					onClick={()=>handleDigit(item.toString())} key={item} >{item}</button>)}
				</div>
				<div className={['operations']}>
					<button className={styles['number-button']} onClick={reset} >C</button>
					<button className={styles['number-button']} onClick={()=>handleOperator('+')} >+</button>
					<button className={styles['number-button']} onClick={()=>handleOperator('-')} >–</button>
					<button className={styles['number-button']} onClick={()=>getResult(operand1,operand2,operator)} >=</button>
				</div>
			</div>
		</div>
		</>
	)
}

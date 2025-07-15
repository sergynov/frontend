import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data)
	const [activeIndex, setActiveIndex] = useState(0)

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	const handleNext = () => {
		setActiveIndex((prevIndex) => prevIndex + 1)
	}
	const handlePrev = () => {
		setActiveIndex((prevIndex)=> prevIndex - 1)
	}
	const reset = ()=> {
		setActiveIndex(0)
	}
	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const firstStep = activeIndex === 0
	const lastStep = activeIndex === steps.length - 1

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{/* Для получения активного контента использйте steps и activeIndex */}
						{steps[activeIndex].content}
						
					</div>
					
					<ul className={styles['steps-list']}>		
						{steps.map((content, index) => {
							return (
								<li className = {styles['steps-item'] + ' ' 
									+ (index <= activeIndex ? styles.done : ' ') + ' ' 
									+ (index === activeIndex ? styles.active : ' ')} 
								key={content.id}>
									<button className={styles['steps-item-button']} onClick={() => setActiveIndex(index)}>{index + 1}</button>
									{content.title}
									</li>
							)
						})}
						</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} onClick={handlePrev} disabled={firstStep}>Назад</button>
						<button className={styles.button} onClick={lastStep ? reset : handleNext} >
							{lastStep ? 'Начать сначала' : 'Далее'}
							{/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
							{/* Или заменять всю кнопку в зависимости от условия */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

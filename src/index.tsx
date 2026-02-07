import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Ссылка на main для манипуляции стилями
	const appRef = useRef<HTMLDivElement>(null);

	// Для проверки условия в функции articleClose
	const articleRef = useRef<HTMLDivElement>(null);

	// Состояние стрелочки-кнопки arrow
	const [open, setOpen] = useState<boolean>(false);

	// Функция предназначенная для закрытия сайд-бара при клике вне его координатов расположения
	const articleClose = (event: React.MouseEvent) => {
		const { target } = event;
		if (
			target instanceof Node &&
			!articleRef.current?.contains(target) &&
			open == true
		) {
			setOpen(!open);
		}
	};

	return (
		<main
			className={clsx(styles.main)}
			ref={appRef}
			onClick={articleClose}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleRef={articleRef}
				appRef={appRef}
				open={open}
				setOpen={setOpen}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

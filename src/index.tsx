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
	const appRef = useRef<HTMLDivElement>(null);
	const articleRef = useRef<HTMLDivElement>(null); // ссылка чтобы проверить
	const [open, setOpen] = useState<boolean>(false);

	// Есть Ref общий main на него можно повесить клик. Проверять этот клик можно

	const articleClose = (event: React.MouseEvent) => {
		const { target } = event;

		// Если target содержит всё, что внутри, то
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

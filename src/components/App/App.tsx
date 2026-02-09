import { CSSProperties, useRef, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import { useOutsideClickClose } from './hook/useOutsideClickClose';
import styles from './index.module.scss';

export const App = () => {
	const [open, setOpen] = useState<boolean>(false);
	const articleRef = useRef<HTMLDivElement>(null);

	const [style, setStyle] = useState<Record<string, string>>({
		'--font-family': defaultArticleState.fontFamilyOption.value,
		'--font-size': defaultArticleState.fontSizeOption.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	});

	useOutsideClickClose({
		isOpen: open,
		rootRef: articleRef,
		onChange: setOpen,
	});

	return (
		<main className={styles.main} style={style as CSSProperties}>
			<ArticleParamsForm open={open} setStyle={setStyle} setOpen={setOpen} />
			<Article ref={articleRef} />
		</main>
	);
};

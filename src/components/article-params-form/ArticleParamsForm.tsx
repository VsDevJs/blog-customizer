import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
// import { OptionProps } from '../../ui/radio-group/Option';
import { Select } from '../../ui/select';

import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import { useState, forwardRef, useLayoutEffect } from 'react';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	appRef: React.RefObject<HTMLDivElement> | null;
};

export const ArticleParamsForm = forwardRef(({ appRef }: Props) => {
	// сделать объект с состояниеми ref или useState в один

	// Триггер для переключения состояния
	const [trigger, setTrigger] = useState<boolean>(false);

	// Если я тыкну что-то, начнётся рендер и тут поменяется сразу. А мне это ненужно
	useLayoutEffect(() => {
		console.log('hellow world');
		appRef?.current?.style.setProperty('--font-family', '32px');
	}, [trigger]);
	// Состояние открыть/закрыть панель + кнопку
	const [open, setOpen] = useState(true);

	// Семейство шрифта
	const [fontFamily, setFamilyOptions] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);

	// Размер шрифта
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);

	// Цвет шрифта
	const [fontColor, setColorFont] = useState<OptionType>(
		defaultArticleState.fontColor
	);

	// Цвет шрифта
	const [backgrounColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);

	// Ширина контента contentWidthArr
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	// Для переключения списка Select
	const fontFamilyChange = (option: OptionType) => {
		setFamilyOptions(option);
	};

	// Для переключения размера шрифта RadioGroup
	const fontSizeChange = (option: OptionType) => {
		setFontSize(option);
	};

	// Для переключения размера шрифта RadioGroup
	const fontColorChange = (option: OptionType) => {
		setColorFont(option);
	};

	// Переключение background
	const backgrounColorChange = (option: OptionType) => {
		setBackgroundColor(option);
	};

	// Переключение ширины контента contentWidth
	const contentWidthChange = (option: OptionType) => {
		setContentWidth(option);
	};

	// Две функции обработчика для кнопок. Продумаем после того, как поймем где хранить состояние
	function handleSubmit() {}

	function handleReset() {
		setFamilyOptions(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setColorFont(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		// Если хоть один не соответствует , то рендер и дёргаем тригер;
		setTrigger((trigger) => !trigger);
	}

	return (
		<>
			<ArrowButton isOpen={open} onClick={() => setOpen(!open)} />

			{/* Нужно добавить остальные input-ы */}
			{/* нужно слушать submit который потом будем применять все стили (менять переменные) */}

			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form}>
					<Select
						options={fontFamilyOptions}
						onChange={fontFamilyChange}
						placeholder='Не удалось отобразить название шрифта'
						selected={fontFamily}
						title={'Шрифт'}
					/>

					<RadioGroup
						name={'radiossss'}
						options={fontSizeOptions}
						onChange={fontSizeChange}
						selected={fontSize}
						title={'Размер шрифта'}
					/>

					<Select
						options={fontColors}
						onChange={fontColorChange}
						placeholder='Не удалось отобразить название цвета'
						selected={fontColor}
						title={'Цвет шрифта'}
					/>

					<Separator />

					<Select
						options={backgroundColors}
						onChange={backgrounColorChange}
						placeholder='Не удалось отобразить название фона'
						selected={backgrounColor}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						onChange={contentWidthChange}
						placeholder='Не отображается'
						selected={contentWidth}
						title={'Ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
});

ArticleParamsForm.displayName = 'ArticleParamsForm';

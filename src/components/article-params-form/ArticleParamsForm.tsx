import { useState, useLayoutEffect, SetStateAction } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Select } from '../../ui/select';
import { Text } from '../../ui/text';

import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from '../../constants/articleProps';

type ArticleFormProps = {
	setOpen: React.Dispatch<SetStateAction<boolean>>;
	setStyle: React.Dispatch<SetStateAction<Record<string, string>>>;
	open: boolean;
};

type handleChange = (key: keyof ArticleStateType, option: OptionType) => void;

export const ArticleParamsForm = ({
	open,
	setOpen,
	setStyle,
}: ArticleFormProps) => {
	const [trigger, setTrigger] = useState<boolean>(false);

	const [articleSettings, setArticleSettings] = useState<ArticleStateType>({
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	});

	useLayoutEffect(() => {
		const newStyles: Record<string, string> = {};
		(Object.keys(articleSettings) as Array<keyof ArticleStateType>).forEach(
			(keyObj) => {
				const value = articleSettings[keyObj].value;
				let key;

				if (typeof keyObj === 'string' && keyObj.length > 0) {
					const match = keyObj.match(/[A-Z]?[a-z]+/g);
					if (match) {
						key = match
							.map((el, index) => {
								if (el == 'Option') return '';

								if (el === 'background') return '--bg';

								if (el === 'content') return '--container';

								if (index === 0) return `--${el}`;
								return `-${el.toLowerCase()}`;
							})
							.join('');
					}
				}

				newStyles[key as keyof React.CSSProperties] = value;
				setStyle({ ...newStyles });
			}
		);

		// Тригер для обновления состояния, который обновляет стили только при клике submit кнопки
	}, [trigger]);

	const handleChange: handleChange = (key, option) => {
		setArticleSettings({ ...articleSettings, [key]: option });
	};

	// Для переключения списка Select
	const fontFamilyChange = (option: OptionType) => {
		handleChange('fontFamilyOption', option);
	};

	// Для переключения размера шрифта RadioGroup
	const fontSizeChange = (option: OptionType) => {
		handleChange('fontSizeOption', option);
	};

	// Для переключения размера шрифта RadioGroup
	const fontColorChange = (option: OptionType) => {
		handleChange('fontColor', option);
	};

	// Переключение background
	const backgrounColorChange = (option: OptionType) => {
		handleChange('backgroundColor', option);
	};

	// Переключение ширины контента contentWidth
	const contentWidthChange = (option: OptionType) => {
		handleChange('contentWidth', option);
	};

	// Две функции обработчика для кнопок

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setTrigger((trigger) => !trigger);
	};

	const handleReset = (): void => {
		setArticleSettings({ ...defaultArticleState });
		setTrigger((trigger) => !trigger);
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setOpen(!open);
				}}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						onChange={fontFamilyChange}
						placeholder='Не удалось отобразить название шрифта'
						selected={articleSettings.fontFamilyOption}
						title={'Шрифт'}
					/>
					<RadioGroup
						name={'radio'}
						options={fontSizeOptions}
						onChange={fontSizeChange}
						selected={articleSettings.fontSizeOption}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						onChange={fontColorChange}
						placeholder='Не удалось отобразить название цвета'
						selected={articleSettings.fontColor}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						onChange={backgrounColorChange}
						placeholder='Не удалось отобразить название фона'
						selected={articleSettings.backgroundColor}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						onChange={contentWidthChange}
						placeholder='Не отображается'
						selected={articleSettings.contentWidth}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

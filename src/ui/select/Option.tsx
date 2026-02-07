import { useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterOptionSubmit } from './hooks/useEnterOptionSubmit';

import styles from './Select.module.scss';

type OptionProps = {
	option: OptionType;
	onClick: (value: OptionType['value']) => void;
};

export const Option = (props: OptionProps) => {
	const {
		option: { value, title, optionClassName, className },
		onClick,
	} = props;
	const optionRef = useRef<HTMLLIElement>(null);

	// Функция которая возвращает обработчик событий для li
	// OptionType['value'] - просто для читаемости
	// Скорее декоративная типизация

	// onClick закрывает/ открывает и использует onChange;
	const handleClick =
		(clickedValue: OptionType['value']): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(clickedValue);
		};

	useEnterOptionSubmit({
		optionRef, // ссылка на каждый option (li)
		value, // Значение
		onClick, // Изменит false + onchange с value
	});

	return (
		<li
			className={clsx(styles.option, styles[optionClassName || ''])}
			value={value}
			onClick={handleClick(value)} // Наш option;
			tabIndex={0}
			data-testid={`select-option-${value}`}
			ref={optionRef}>
			<Text family={isFontFamilyClass(className) ? className : undefined}>
				{title}
			</Text>
		</li>
	);
};

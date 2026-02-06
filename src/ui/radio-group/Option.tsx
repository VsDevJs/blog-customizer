import { useRef } from 'react';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { useEnterSubmit } from './hooks/useEnterSubmit';

import styles from './RadioGroup.module.scss';

export type OptionProps = {
	value: OptionType['value'];
	title: OptionType['title'];
	selected: OptionType;
	groupName: string;
	onChange?: (option: OptionType) => void;
	option: OptionType;
};

export const Option = (props: OptionProps) => {
	const { value, title, selected, groupName, onChange, option } = props; // option - объект

	const optionRef = useRef<HTMLDivElement>(null); // Сделать активным хук

	const handleChange = () => onChange?.(option);

	useEnterSubmit({ onChange, option, optionRef });

	const inputId = `${groupName}_radio_item_with_value__${value}`; // в div и input они равны;
	const isChecked = value === selected.title; //  title объекта и value равны

	return (
		<div
			className={styles.item}
			key={value} // Зачем тут второй раз key, если он используется в Radio Group при вызове компонета и переборе в map
			data-checked={isChecked} // В селекторах css через этот checked будет накладываться стили
			data-testid={inputId} // Для тестов в dom видимо;
			tabIndex={0} // Для tab;
			ref={optionRef}>
			<input
				className={styles.input}
				type='radio' // просто типизация radio
				name={groupName} // Для того чтобы объединить все radio
				id={inputId}
				value={value}
				onChange={handleChange} // Взять кнопку и сделать selected;
				tabIndex={-1}
			/>
			<label className={styles.label} htmlFor={inputId}>
				<Text size={18} uppercase>
					{title}
				</Text>
			</label>
		</div>
	);
};

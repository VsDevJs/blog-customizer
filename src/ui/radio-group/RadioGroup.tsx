import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Option } from './Option';

import styles from './RadioGroup.module.scss';

type RadioGroupProps = {
	name: string; // для формирования for и id в списке;
	options: OptionType[]; // Массив с объектами;
	selected: OptionType; // А это выбранные объект;
	onChange?: (value: OptionType) => void; // ?
	title: string; // title - текст
};

export const RadioGroup = (props: RadioGroupProps) => {
	const { name, options, selected, onChange, title } = props;

	// Принимает объект
	// option - объект в массиве из пропсов ( из options )
	// onChange - ничего не возвращает и вообще её может не существовать

	// Почему замыкание ? Можно было бы же вызывать всегда onChange
	// Создаём option, onChange - вызывается как бы какждый раз с новым option;

	const handleChange = (option: OptionType) => onChange?.(option);

	// Это походу нигде не используется в дальнейшем
	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text weight={800} size={12} uppercase>
						{title}
					</Text>
				</>
			)}
			<div className={styles.group}>
				{options.map((option) => (
					<Option
						key={option.value}
						groupName={name}
						value={option.value} // здесь  option.value =
						title={option.title}
						selected={selected}
						onChange={() => handleChange(option)} // Зачем onChange
						option={option}
					/>
				))}
			</div>
		</div>
	);
};

import { useState, useRef } from 'react';
import type { MouseEventHandler } from 'react';
import clsx from 'clsx';
import { OptionType } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import arrowDown from 'src/images/arrow-down.svg';
import { Option } from './Option';
import { isFontFamilyClass } from './helpers/isFontFamilyClass';
import { useEnterSubmit } from './hooks/useEnterSubmit';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './Select.module.scss';

type SelectProps = {
	selected: OptionType | null;
	options: OptionType[];
	placeholder?: string;
	onChange?: (selected: OptionType) => void;
	onClose?: () => void;
	title?: string;
};

export const Select = (props: SelectProps) => {
	// Placeholder отрисуется, если у selected в свойстве title значение пустое
	const { options, placeholder, selected, onChange, onClose, title } = props;
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// Список где иконка находится и placeholder;
	const rootRef = useRef<HTMLDivElement>(null);

	// Зачем нужен ref тут этот ? Ссылка на div общий  где прописан title или placeholder
	const placeholderRef = useRef<HTMLDivElement>(null);

	// У объекта selected проверить опциональный класс, если нету, то ''
	const optionClassName = selected?.optionClassName ?? '';

	// Кнопка закрытия (Если клик вне элемента), onClose - опциональная
	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose,
		onChange: setIsOpen,
	});

	//
	useEnterSubmit({
		placeholderRef,
		onChange: setIsOpen,
	});

	// Клик на опциях
	const handleOptionClick = (option: OptionType) => {
		setIsOpen(false);
		onChange?.(option);
	};

	// Клик на наш элемент
	const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	return (
		<div className={styles.container}>
			{title && (
				<>
					<Text size={12} weight={800} uppercase>
						{title}
					</Text>
				</>
			)}
			<div
				className={styles.selectWrapper}
				ref={rootRef}
				data-is-active={isOpen} //  Для стилизации
				data-testid='selectWrapper'>
				<img src={arrowDown} alt='иконка стрелочки' className={styles.arrow} />
				<div
					className={clsx(
						styles.placeholder,
						(styles as Record<string, string>)[optionClassName] // Наши стили
					)}
					data-status={status}
					data-selected={!!selected?.value} // Здесь получается так -
					onClick={handlePlaceHolderClick}
					role='button'
					tabIndex={0}
					ref={placeholderRef}>
					<Text
						family={
							isFontFamilyClass(selected?.className)
								? selected?.className
								: undefined
						}>
						{selected?.title || placeholder}
					</Text>
				</div>
				{isOpen && (
					<ul className={styles.select} data-testid='selectDropdown'>
						{options
							.filter((option) => selected?.value !== option.value)
							.map((option) => (
								<Option
									key={option.value}
									option={option}
									onClick={() => handleOptionClick(option)}
								/>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

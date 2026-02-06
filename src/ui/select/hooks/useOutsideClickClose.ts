import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			// Странна проверка в лпане того, что закрытие всё равно происходит при клике куда угодно
			// Т.е повесили в Select.tsx логику (handle) отдельно на список
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				console.log(!rootRef.current?.contains(target));
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		// Вешаем событие при монтировании
		window.addEventListener('mousedown', handleClick);

		// Сбрасываем событие после размонтирования
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};

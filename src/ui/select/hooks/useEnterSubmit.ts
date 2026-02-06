import { useEffect } from 'react';

// 1. Типизация функции меняющей состояние (чтобы она принимала по дженерику - boolean или принимала функцию возвращающая дженерик)
// 2. Просто ref элемент

type UseEnterSubmit = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
	placeholderRef: React.RefObject<HTMLDivElement>;
};

export const useEnterSubmit = ({
	placeholderRef,
	onChange,
}: UseEnterSubmit) => {
	useEffect(() => {
		const placeholderEl = placeholderRef.current;
		if (!placeholderEl) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onChange((isOpen: boolean) => !isOpen);
			}
		};
		placeholderEl.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, []);
};

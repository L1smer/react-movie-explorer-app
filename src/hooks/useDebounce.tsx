import { useEffect, useState } from "react";

export default function useDebounce(searchValue: string) {
	const [debouncedValue, setDebouncedValue] = useState(searchValue);
	
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(searchValue);
		},800)

		return () => {
			clearInterval(timeoutId)
		}
	},[searchValue])

	return debouncedValue
}
interface HeaderProps {
	onToggleView: () => void;
}

export default function Header({onToggleView}: HeaderProps){

	return(
		<>
			<h3>Movie Explorer</h3>
			<button onClick={onToggleView}>Show Favorites</button>
			<p>Search your favourite films</p>
		</>
	)
}
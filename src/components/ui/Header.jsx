/* eslint-disable react/prop-types */
import { Button } from "./button";
import { Input } from "./input";

const Header = ({ searchedPokemon, onChangeSearch, onSearchPokemon, pokemonLogo }) => {
	return (
		<header className="flex justify-center items-center gap-4">
			<img src={pokemonLogo} />
			<div className="flex w-[800px] items-center space-x-2">
				<Input
					id="searchPokemon"
					placeholder="Search a pokemon"
					value={searchedPokemon}
					onChange={onChangeSearch}
				/>
				<Button onClick={onSearchPokemon} type="submit">
					Search
				</Button>
			</div>
		</header>
	);
};

export default Header;

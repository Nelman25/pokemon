/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import backPokemonCard from "./assets/backPokemonCard.jpg";
import forestBg from "./assets/forestBg.png";
import pokemonLogo from "./assets/pokemonLogo.png";
import PokemonCard from "./components/ui/PokemonCard";
import PokemonNotFound from "./components/ui/PokemonNotFound";
import Header from "./components/ui/Header";

const App = () => {
	const [searchedPokemon, setSearchedPokemon] = useState("");
	const [pokemonIsValid, setPokemonIsValid] = useState(true);
	const [pokemonData, setPokemonData] = useState({
		name: "",
		weight: "",
		height: "",
		pokemonImg: "",
	});

	const handleSearchPokemon = async () => {
		await axios
			.get(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`)
			.then((response) => {
				const data = response.data;
				const pokemonDataObject = {
					name: `Name: ${data.name}`,
					weight: `Weight: ${data.weight}kg`,
					height: `Height: ${data.height}cm`,
					pokemonImg: data.sprites.front_default,
				};
				setPokemonData(pokemonDataObject);
				setPokemonIsValid(true);
			})
			.catch((error) => {
				console.error(error);
				setPokemonIsValid(false);
			});
	};

	const handleChangeSearch = (e) => {
		setSearchedPokemon(e.target.value);
	};

	return (
		<div className="bg-gradient-to-r from-sky-500 via-lime-500 to-emerald-500 text-center h-screen font-palanquin]">
			<Header
				searchedPokemon={searchedPokemon}
				onChangeSearch={handleChangeSearch}
				onSearchPokemon={handleSearchPokemon}
				pokemonLogo={pokemonLogo}
			/>

			<div>
				{pokemonIsValid ? (
					<PokemonCard
						pokemonData={pokemonData}
						forestBg={forestBg}
						backPokemonCard={backPokemonCard}
					/>
				) : (
					<PokemonNotFound />
				)}
			</div>
		</div>
	);
};

export default App;

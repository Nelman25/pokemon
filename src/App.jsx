/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const App = () => {
	const [searchedPokemon, setSearchedPokemon] = useState("");
	const [rotatePokemon, setRotatePokemon] = useState(true);
	const [pokemonIsValid, setPokemonIsValid] = useState(true);
	const [pokemonData, setPokemonData] = useState({
		name: "",
		weight: "",
		height: "",
		pokemonImg: "",
	});

	const handleSearchPokemon = async () => {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`
			);
			if (!response.ok) {
				throw new Error(
					"Couldn't fetch data, please check spelling and try again."
				);
			}
			const data = await response.json();

			const pokemonDataObject = {
				name: data.name,
				weight: `${data.weight}kg`,
				height: `${data.height}cm`,
				pokemonImg: rotatePokemon
					? data.sprites.front_default
					: data.sprites.back_default,
			};
			setPokemonData(pokemonDataObject);
		} catch (error) {
			console.error(error);
			setPokemonIsValid(false);
		}
	};

	const handleChangeSearch = (e) => {
		setSearchedPokemon(e.target.value);
	};

	return (
		<div className="bg-slate-200 text-center h-[800px]">
			<h1 className="text-3xl bold ">Pokemon</h1>
			<label htmlFor="searchPokemon" className="text-2xl bold">
				Search pokemon:{" "}
			</label>

			<div className="flex justify-center items-center">
				<Input
					id="searchPokemon"
					className="w-1/3"
					value={searchedPokemon}
					onChange={handleChangeSearch}
				/>
				<Button onClick={handleSearchPokemon} className="">
					Search
				</Button>
			</div>

			<div>
				{pokemonIsValid ? (
					<div className="text-start">
						<h3>Name: {pokemonData.name} </h3>
						<p>Height: {pokemonData.height} </p>
						<p>Weight: {pokemonData.weight} </p>
						<img src={pokemonData.pokemonImg} alt="image of the pokemon" />
					</div>
				) : (
					<p>Pokemon not found, please check spelling and try again.</p>
				)}
			</div>
		</div>
	);
};

export default App;

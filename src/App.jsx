/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import pokemonLogo from "./assets/pokemonLogo.png";

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
				`https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`
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
			setPokemonIsValid(true);
		} catch (error) {
			console.error(error);
			setPokemonIsValid(false);
		}
	};

	const handleChangeSearch = (e) => {
		setSearchedPokemon(e.target.value);
	};

	return (
		<div className="bg-slate-200 text-center h-screen font-palanquin]">
			<div className="flex justify-center items-center gap-4">
				<img src={pokemonLogo} width={200} height={100} />
				<div className="flex w-[800px] items-center space-x-2">
					<Input
						id="searchPokemon"
						placeholder="Search a pokemon"
						value={searchedPokemon}
						onChange={handleChangeSearch}
					/>
					<Button onClick={handleSearchPokemon} type="submit">
						Search
					</Button>
				</div>
			</div>

			<div className="mx-auto p-8 w-[30%] h-[81%] bg-yellow-200 rounded-lg shadow-2xl border border-black rotateY180 perspective">
				{pokemonIsValid ? (
					<div className="flex flex-col justify-center items-center bg-orange-300">
						<img
							src={pokemonData.pokemonImg}
							className="w-[510px] h-[525px] object-contain border-2 border-black drop-shadow-2xl "
						/>
						<div className="px-4 py-8 text-start text-xl border-2 border-black w-full border-t-0">
							<h3 className="">Name: {pokemonData.name} </h3>
							<p>Height: {pokemonData.height} </p>
							<p>Weight: {pokemonData.weight} </p>
						</div>
					</div>
				) : (
					<p className="text-2xl p-24 text-red-600 bold">
						Pokemon not found, please check spelling and try again.
					</p>
				)}
			</div>
		</div>
	);
};

export default App;

/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import pokemonLogo from "./assets/pokemonLogo.png";
import backPokemonCard from "./assets/backPokemonCard.jpg";
import forestBg from "./assets/forestBg.png";

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
			<div className="flex justify-center items-center gap-4">
				<img src={pokemonLogo} />
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

			<div>
				{pokemonIsValid ? (
					<div className="mainContainer relative perspective h-[650px] w-[480px] mx-auto">
						<div className="mx-auto w-full h-[650px] bg-gradient-to-r from-yellow-500 via-yellow-700 to-amber-500 py-10 px-8 rounded-xl shadow-2xl border border-slate-700 absolute top-0 left-0 rotateY-180 backFace">
							<div className="flex items-end justify-center py-16 px-4 bg-amber-200 size-full rounded-xl h-[600px] relative">
								<img src={forestBg} className="absolute top-10 left0 size-96" />
								<img
									src={pokemonData.pokemonImg}
									className="object-contain absolute top-14 left-10 size-80"
								/>
								<div className="bg-amber-500 rounded-xl px-24 py-2">
									<p>{pokemonData.name}</p>
									<p>{pokemonData.height}</p>
									<p>{pokemonData.weight}</p>
								</div>
							</div>
						</div>
						<div className="absolute top-0 left-0 rotateY180 backFace">
							<img
								src={backPokemonCard}
								className="object-contain"
								width={800}
							/>
						</div>
					</div>
				) : (
					<div className="bg-slate-100 w-[60%] mx-auto rounded-xl">
						<p className="text-4xl p-12 text-red-600 bold">
							Pokemon not found, please check spelling and try again.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;

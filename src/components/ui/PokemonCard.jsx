/* eslint-disable react/prop-types */
const PokemonCard = ({ pokemonData, forestBg, backPokemonCard }) => {
	return (
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
				<img src={backPokemonCard} className="object-contain" width={800} />
			</div>
		</div>
	);
};

export default PokemonCard;

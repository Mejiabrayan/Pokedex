import type { PokemonList, Pokemon, PokemonListItem } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

async function apiCall<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
}

export async function getPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonList> {
  return apiCall<PokemonList>(`/pokemon?limit=${limit}&offset=${offset}`);
}

export async function getPokemon(idOrName: number | string): Promise<Pokemon> {
  return apiCall<Pokemon>(`/pokemon/${idOrName}`);
}

export async function getMultiplePokemon(ids: number[]): Promise<Pokemon[]> {
  return Promise.all(ids.map(id => getPokemon(id)));
}

export async function searchPokemon(query: string): Promise<PokemonListItem[]> {
  const list = await getPokemonList(1000);
  return list.results.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getPokemonByType(type: string): Promise<PokemonListItem[]> {
  const typeInfo = await apiCall<{ pokemon: { pokemon: PokemonListItem }[] }>(`/type/${type}`);
  return typeInfo.pokemon.map(p => p.pokemon);
}

export async function getEvolutionChain(pokemonId: number): Promise<any> {
  const species = await apiCall<{ evolution_chain: { url: string } }>(`/pokemon-species/${pokemonId}`);
  const evolutionChainId = species.evolution_chain.url.split('/').slice(-2, -1)[0];
  return apiCall(`/evolution-chain/${evolutionChainId}`);
}
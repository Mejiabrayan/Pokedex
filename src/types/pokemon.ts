export interface PokemonListItem {
    name: string;
    url: string;
  }
  
  export interface PokemonList {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
  }
  
  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    types: PokemonType[];
    sprites: PokemonSprites;
    stats: PokemonStat[];
    abilities: PokemonAbility[];
  }
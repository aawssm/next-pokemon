export interface Poki {
  id: number;
  name: string;
  url: string;
  img?: string;
}
export interface PokiResponse {
  results: Poki[];
  count: number;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  img?: string;
}

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
}

export interface PokemonInfoResponse {
  id: number;
  name: string;

  height: number;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  moves: Move[];
}
interface Move {
  move: MoveInfo;
}
interface MoveInfo {
  name: string;
  url: string;
}

interface Species {
  name: string;
  url: string;
}

interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
}

interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

interface DreamWorld {
  front_default: string;
  front_female: null;
}

interface Other {
  dream_world: DreamWorld;
  home: Home;
  "official-artwork": OfficialArtwork;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

interface Type {
  slot: number;
  type: Species;
}

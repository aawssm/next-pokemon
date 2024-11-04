import { PokemonInfoResponse, Poki, PokiResponse } from './types';

const POSTS_PER_PAGE = 9;


export async function getPosts(page: number = 1): Promise<{ posts: Poki[], totalPages: number }> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
  // console.log("getPosts");
  const pokires: PokiResponse = await res.json();
  // Add images to posts
  const posts = new Array<Poki>();
  pokires.results.forEach(post => {
    const idx = parseInt(post.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", ""));
    posts.push({
      ...post,
      id: idx,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx}.svg`,
    });
  });

  // const startIndex = (page - 1) * POSTS_PER_PAGE;
  // const paginatedPosts = postsWithImages.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(pokires["count"] / POSTS_PER_PAGE);

  return {
    posts: posts,
    totalPages: totalPages,
  };
}

export async function getPost(id: string): Promise<PokemonInfoResponse> {
  // console.log(`getPost ${id}`);
  if (id == "flutter_service_worker.js") {

    return {} as PokemonInfoResponse;
  }
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const post: PokemonInfoResponse = await res.json();

  return post;
}
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PokemonInfoResponse } from "@/lib/types";
type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;

  if (params.id == undefined || params.id.includes(".")) {
    return {};
  }
  // console.log(`generateMetadata${params.id}`);
  const pokemon = await getPost(params.id);
  const description = `hight ${pokemon.height} weight ${pokemon.weight}\nType : ${pokemon.types
    .map((e) => e.type.name)
    .join(" ")}\nMoves : ${pokemon.moves
    .splice(0, 3)
    .map((e) => e.move.name)
    .join(", ")}\nStats ${pokemon.stats.map((e) => e.stat.name + " : " + e.base_stat).join(" ")} `;
  return {
    title: "aawssm " + pokemon.name,
    metadataBase: new URL("https://pokedex.asarmtwo.aawssm.in"),
    description: description,
    openGraph: {
      title: "aawssm " + pokemon.name,
      description: description,
      url: "pokedex.asarmtwo.aawssm.in/" + pokemon.name,
      siteName: "Aawssm Pokemon Pokedex",
      images: [
        {
          url: pokemon.sprites.other?.["official-artwork"].front_default || "",
          width: 1200,
          height: 630,
          alt: "aawssm " + pokemon.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "aawssm " + pokemon.name,
      description: description,
      images: [pokemon.sprites.other?.["official-artwork"].front_default || ""],
    },
  };
}

export default async function PostPage(props: { params: Params }) {
  let pokemon: PokemonInfoResponse;
  const params = await props.params;
  if (params.id == undefined || params.id.includes(".")) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <article className="container max-w-screen-lg items-center mx-auto px-4 py-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to pokemons
            </Link>
          </Button>{" "}
        </article>
      </main>
    );
  }
  try {
    pokemon = await getPost(params.id);
  } catch (error) {
    console.log(error);
    notFound();
  }
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container max-w-screen-lg items-center mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to pokemons
          </Link>
        </Button>
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <Image
            src={pokemon.sprites.other?.["official-artwork"].front_default || ""}
            alt={"aawssm " + pokemon.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold">{pokemon.name}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{`hight ${pokemon.height} weight ${pokemon.weight}`}</p>
          <p className="text-lg leading-relaxed">{`Type : ${pokemon.types
            .map((e) => e.type.name)
            .join(" ")} `}</p>
          <p className="text-lg leading-relaxed">{`Stats ${pokemon.stats
            .map((e) => e.stat.name + " : " + e.base_stat)
            .join(" ")} `}</p>
          <p className="text-lg leading-relaxed">{`Moves : ${pokemon.moves
            .splice(0, 3)
            .map((e) => e.move.name)
            .join(" ")} `}</p>

          <Card className="flex-grow grid content-between">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
            </CardHeader>
            <p>
              Height: <strong>{(pokemon.height * 0.328084).toFixed(2)} ft</strong>
            </p>
            <p>
              Weight: <strong>{(pokemon.weight * 0.220462).toFixed(2)} lbs</strong>
            </p>
            {pokemon.stats.map((stat) => {
              const {
                base_stat,
                stat: { name },
              } = stat;
              return (
                <div key={name}>
                  <p key={name}>{name + ": "}</p>
                  <progress value={base_stat} />
                </div>
              );
            })}
            <CardContent>
              <h4 className="text-xl">Sprites</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <Image
                  alt={`${"aawssm " + pokemon.name} front default`}
                  src={pokemon.sprites.front_default}
                  width={144}
                  height={144}
                  className="w-36 h-36"
                  loading="lazy"
                />
                <Image
                  alt={`${"aawssm " + pokemon.name} back default`}
                  src={pokemon.sprites.back_default}
                  width={144}
                  height={144}
                  className="w-36 h-36"
                  loading="lazy"
                />
                <Image
                  alt={`${"aawssm " + pokemon.name} front shiny`}
                  src={pokemon.sprites.front_shiny}
                  width={144}
                  height={144}
                  className="w-36 h-36"
                  loading="lazy"
                />
                <Image
                  alt={`${"aawssm " + pokemon.name} back shiny`}
                  src={pokemon.sprites.back_shiny}
                  width={144}
                  height={144}
                  className="w-36 h-36"
                  loading="lazy"
                />
              </div>
            </CardContent>
            <CardContent>
              <h4 className="text-xl">Moves:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pokemon.moves.map((move) => {
                  return (
                    <div key={move.move.name}>
                      <p key={move.move.name}>{move.move.name}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </main>
  );
}

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
import { headers } from "next/headers";

import FlutterApp from "@/components/flutter";
interface Props {
  params: { id: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const params = await props.params;

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

export default async function Home({ params }: Props) {
  const userAgent = headers().get("user-agent") || "";
  const botPattern =
    "(googlebot/|bot|Googlebot-Mobile|Mediumbot-MetaTagFetcher|Google-InspectionTool|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
  const re = new RegExp(botPattern, "i");
  const isBot = re.test(userAgent);
  if (!isBot) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <FlutterApp />
      </main>
    );
  }
  let pokemon: PokemonInfoResponse;
  // const params = await props.params;
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

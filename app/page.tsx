import { Suspense } from "react";
import { getPosts } from "@/lib/api";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { Navbar } from "@/components/navbar";
export const revalidate = 3600; // Revalidate every hour
import { headers } from "next/headers";

import FlutterApp from "@/components/flutter";

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
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
  // const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const { posts, totalPages } = await getPosts(currentPage);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center">
      <Navbar />
      <div className="container py-8">
        <h1 className="mb-8 text-4xl font-bold">Pokemons</h1>
        <div className="flex justify-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Suspense fallback={<div>Loading...</div>}>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Suspense>
          </div>
        </div>
        <div className="mt-8 ">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </main>
  );
}

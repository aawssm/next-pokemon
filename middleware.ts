import { NextRequest, NextResponse, userAgent } from 'next/server'

// Set pathname were middleware will be executed

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)', // Apply middleware to all pages
};

export function middleware(req: NextRequest) {
  const ua = userAgent(req)
  const isLocalHost = false;// req.nextUrl.host.includes("localhost")
  // const isLocalHost = false;
  const botPattern = "(googlebot\/|bot|Googlebot-Mobile|Mediumbot-MetaTagFetcher|Google-InspectionTool|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
  const re = new RegExp(botPattern, 'i');
  const isBot = re.test(ua.ua);

  //&& req.nextUrl.pathname == "/"
  if ((isBot || isLocalHost)) {
    // req.nextUrl.pathname = "_viewport/bot_root"
    console.log(`${isBot} flutter 1 ${req.nextUrl.href}`);
    return NextResponse.rewrite(req.nextUrl)
  }

  if (req.nextUrl.pathname.endsWith(".md")) {
    if (isBot || isLocalHost) {
      const mdPath = req.nextUrl.pathname.substring(req.nextUrl.pathname.lastIndexOf("/") + 1)
      req.nextUrl.searchParams.set("md", mdPath)
      req.nextUrl.pathname = "_viewport/bot"
      console.log(`${isBot} flutter 2 ${req.nextUrl.href}`);
      return NextResponse.rewrite(req.nextUrl)
    }
  }
  console.log(`${isBot} flutter 3 ${req.nextUrl.href}`);
  req.nextUrl.pathname = "/index.html"
  return NextResponse.rewrite(req.nextUrl)
}

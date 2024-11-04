import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Poki } from "@/lib/types";

export function PostCard({ post }: { post: Poki }) {
  return (
    <Link href={`/${post.name}`}>
      <Card className="overflow-hidden transition-all hover:scale-[1.02]">
        <div className="relative aspect-video">
          <Image src={post.img || ""} alt={"aawssm " + post.name} fill className="object-cover" priority />
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.name}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}

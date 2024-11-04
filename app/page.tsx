import { Suspense } from "react";
import { getPosts } from "@/lib/api";
import { PostCard } from "@/components/post-card";
import { Pagination } from "@/components/pagination";
import { Navbar } from "@/components/navbar";
export const revalidate = 3600; // Revalidate every hour

type SearchParams = Promise<{ page?: string }>

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
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

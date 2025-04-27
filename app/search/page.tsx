import { Suspense } from "react"
import { searchArticles } from "@/lib/news-service"
import NewsCard from "@/components/news-card"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        {query ? (
          <p className="text-muted-foreground">
            Showing results for: <span className="font-medium">{query}</span>
          </p>
        ) : (
          <p className="text-muted-foreground">Enter a search term to find news articles.</p>
        )}
      </div>

      {query ? (
        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Use the search bar above to find news articles.</p>
        </div>
      )}
    </div>
  )
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchArticles(query, 12)

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No results found for "{query}". Try a different search term.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          variant={index === 0 ? "featured" : "default"}
          className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
        />
      ))}
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="md:col-span-2 lg:col-span-2">
        <Skeleton className="h-56 w-full rounded-t-lg" />
        <div className="p-4 space-y-3 border rounded-b-lg border-t-0">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-48 w-full rounded-t-lg" />
          <div className="p-4 space-y-3 border rounded-b-lg border-t-0">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

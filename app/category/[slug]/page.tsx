import { Suspense } from "react"
import { notFound } from "next/navigation"
import { fetchNewsByCategory, fetchAfricanNews } from "@/lib/news-service"
import NewsCard from "@/components/news-card"
import { Skeleton } from "@/components/ui/skeleton"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  const validCategories = ["world", "business", "technology", "sports", "entertainment", "health", "science", "africa"]

  if (!validCategories.includes(slug)) {
    notFound()
  }

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName} News</h1>
        <p className="text-muted-foreground">Latest news and updates from the {categoryName.toLowerCase()} section.</p>
      </div>

      <Suspense fallback={<CategoryNewsSkeleton />}>
        <CategoryNewsContent category={slug} />
      </Suspense>
    </div>
  )
}

async function CategoryNewsContent({ category }: { category: string }) {
  // Use the specific African news function for the Africa category
  const news = category === "africa" ? await fetchAfricanNews(12) : await fetchNewsByCategory(category, 12)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((article, index) => (
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

function CategoryNewsSkeleton() {
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

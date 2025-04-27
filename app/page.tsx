import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { fetchLatestNews, fetchFeaturedNews, fetchBreakingNews, fetchAfricanNews } from "@/lib/news-service"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export default async function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <Suspense fallback={<FeaturedNewsSkeleton />}>
          <FeaturedNewsSection />
        </Suspense>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Latest News</h2>
              <Link href="/latest" className="text-primary text-sm font-medium flex items-center hover:underline">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<LatestNewsSkeleton />}>
              <LatestNewsSection />
            </Suspense>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">African News</h2>
              <Link
                href="/category/africa"
                className="text-primary text-sm font-medium flex items-center hover:underline"
              >
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <Suspense fallback={<CategoryNewsSkeleton />}>
              <AfricanNewsSection />
            </Suspense>
          </section>
        </div>

        <div>
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Breaking News</h2>
            </div>
            <Suspense fallback={<BreakingNewsSkeleton />}>
              <BreakingNewsSection />
            </Suspense>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Popular Categories</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/category/world">World</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/business">Business</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/technology">Technology</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/sports">Sports</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/entertainment">Entertainment</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/health">Health</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/science">Science</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/category/africa">Africa</Link>
              </Button>
            </div>
          </section>

          <section>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-3">Subscribe to Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">Get the latest news delivered to your inbox.</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  required
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

async function FeaturedNewsSection() {
  const featuredNews = await fetchFeaturedNews(3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredNews.map((article, index) => (
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

async function LatestNewsSection() {
  const latestNews = await fetchLatestNews(6)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {latestNews.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

async function AfricanNewsSection() {
  const news = await fetchAfricanNews(4)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}

async function BreakingNewsSection() {
  const breakingNews = await fetchBreakingNews(5)

  return (
    <div className="space-y-4">
      {breakingNews.map((article) => (
        <NewsCard key={article.id} article={article} variant="compact" />
      ))}
    </div>
  )
}

// Skeleton loaders
function FeaturedNewsSkeleton() {
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
      {[1, 2].map((i) => (
        <div key={i}>
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
      ))}
    </div>
  )
}

function LatestNewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
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

function CategoryNewsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
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

function BreakingNewsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex border rounded-lg overflow-hidden h-32">
          <Skeleton className="w-1/3 h-full" />
          <div className="p-3 space-y-2 w-2/3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

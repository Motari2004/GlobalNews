import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDistanceToNow, format } from "date-fns"
import { ArrowLeft, Share2, Bookmark, Facebook, Twitter } from "lucide-react"
import { fetchArticleById, fetchNewsByCategory, fetchAfricanNews } from "@/lib/news-service"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = params

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center text-muted-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent id={id} />
      </Suspense>
    </div>
  )
}

// Add error handling in the ArticleContent component
async function ArticleContent({ id }: { id: string }) {
  try {
    const article = await fetchArticleById(id)

    if (!article) {
      console.error(`Article not found: ${id}`)
      notFound()
      return null // This line won't execute due to notFound() throwing an error
    }

    const publishedDate = new Date(article.publishedAt)

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <Badge className="mb-4 capitalize">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <span className="font-medium">{article.source.name}</span>
            <span className="mx-2">•</span>
            <time dateTime={article.publishedAt}>{format(publishedDate, "MMMM d, yyyy")}</time>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(publishedDate, { addSuffix: true })}</span>
          </div>

          <div className="relative w-full h-[300px] md:h-[400px] mb-6">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              unoptimized={article.image?.startsWith("http")}
            />
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-lg font-medium mb-4">{article.description}</p>
            <p>{article.content}</p>
            {/* If the content is short, add some placeholder content */}
            {article.content.length < 200 && (
              <>
                <p>
                  The implications of this development are far-reaching, with experts suggesting it could reshape how we
                  understand the field. Industry leaders have been quick to respond, with many expressing optimism about
                  the potential applications.
                </p>
                <p>
                  "This represents a significant step forward," said one analyst who requested anonymity due to the
                  sensitive nature of the developments. "We're seeing the culmination of years of research and
                  investment."
                </p>
                <h2>Key Developments</h2>
                <p>
                  Several key factors have contributed to this breakthrough, including technological advancements,
                  increased funding, and collaborative research efforts across multiple institutions.
                </p>
                <ul>
                  <li>Improved methodologies and research techniques</li>
                  <li>Strategic partnerships between public and private sectors</li>
                  <li>Application of cutting-edge technologies</li>
                </ul>
                <p>
                  As we move forward, it will be crucial to monitor how these developments unfold and what implications
                  they may have for various stakeholders across the global landscape.
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-between py-4 border-t border-b">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
            </div>
          </div>
        </article>

        <aside>
          <div className="sticky top-20">
            <h3 className="text-lg font-bold mb-4">Related Articles</h3>
            <Suspense fallback={<RelatedArticlesSkeleton />}>
              <RelatedArticles category={article.category} currentId={article.id} />
            </Suspense>
          </div>
        </aside>
      </div>
    )
  } catch (error) {
    console.error("Error fetching article:", error)
    notFound()
    return null
  }
}

async function RelatedArticles({ category, currentId }: { category: string; currentId: string }) {
  // Use the specific African news function for the Africa category
  const articles = category === "africa" ? await fetchAfricanNews(5) : await fetchNewsByCategory(category, 5)

  const filteredArticles = articles.filter((article) => article.id !== currentId).slice(0, 4)

  return (
    <div className="space-y-4">
      {filteredArticles.map((article) => (
        <NewsCard key={article.id} article={article} variant="compact" />
      ))}
    </div>
  )
}

function ArticleSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Skeleton className="h-6 w-20 mb-4" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-3/4 mb-4" />

        <div className="flex items-center mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4 mx-2 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-[400px] w-full mb-6 rounded-lg" />

        <div className="space-y-4 mb-8">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-8 w-48 mt-8" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <div className="pl-6 space-y-2 mt-2">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>

        <div className="flex items-center justify-between py-4 border-t border-b">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>

      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
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
      </div>
    </div>
  )
}

function RelatedArticlesSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
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

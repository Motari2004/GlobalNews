import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { NewsArticle } from "@/lib/news-service"

interface NewsCardProps {
  article: NewsArticle
  variant?: "default" | "featured" | "compact"
  className?: string
}

export default function NewsCard({ article, variant = "default", className }: NewsCardProps) {
  const isFeatured = variant === "featured"
  const isCompact = variant === "compact"

  return (
    <Card
      className={cn(
        "overflow-hidden h-full transition-all hover:shadow-md",
        isFeatured && "md:flex md:flex-row",
        className,
      )}
    >
      <div className={cn("relative", isFeatured ? "md:w-1/2" : "", isCompact ? "h-32" : "h-48 md:h-56")}>
        <Link href={`/article/${article.id}`}>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized={article.image?.startsWith("http")}
          />
        </Link>
        <Badge variant="secondary" className="absolute top-2 left-2 capitalize bg-background/80 backdrop-blur-sm">
          {article.category}
        </Badge>
      </div>
      <div className={cn("flex flex-col", isFeatured && "md:w-1/2")}>
        <CardContent className={cn("flex-1", isCompact ? "p-3" : "p-4 md:p-6")}>
          <Link href={`/article/${article.id}`}>
            <h3
              className={cn(
                "font-bold tracking-tight hover:text-primary transition-colors",
                isCompact ? "text-base line-clamp-2" : isFeatured ? "text-xl md:text-2xl mb-2" : "text-lg mb-2",
              )}
            >
              {article.title}
            </h3>
          </Link>
          {!isCompact && <p className="text-muted-foreground line-clamp-2 text-sm">{article.description}</p>}
        </CardContent>
        <CardFooter
          className={cn(
            "text-xs text-muted-foreground flex justify-between items-center border-t",
            isCompact ? "px-3 py-2" : "px-4 md:px-6 py-3",
          )}
        >
          <span>{article.source.name}</span>
          <time dateTime={article.publishedAt}>
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </time>
        </CardFooter>
      </div>
    </Card>
  )
}

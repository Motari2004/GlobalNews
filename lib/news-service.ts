export type NewsArticle = {
  id: string
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
  category: string
}

// NewsAPI.org API key - you'll need to replace this with your own API key
// Get one for free at https://newsapi.org/register
const API_KEY = process.env.NEWS_API_KEY || ""
const BASE_URL = "https://newsapi.org/v2"

// Fetch latest news
export async function fetchLatestNews(count = 10): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, "general")
  }

  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      console.error(`News API error: ${response.status} ${response.statusText}`)
      throw new Error(`News API error: ${response.status}`)
    }

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      throw new Error("Invalid response format")
    }

    // Get the raw text first to debug if needed
    const text = await response.text()

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(text)
      return transformArticles(data.articles || [], "general")
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200)) // Log first 200 chars
      throw new Error("Failed to parse API response")
    }
  } catch (error) {
    console.error("Error fetching latest news:", error)
    return getFallbackNews(count)
  }
}

// Fetch news by category
export async function fetchNewsByCategory(category: string, count = 10): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, category)
  }

  // Map our categories to NewsAPI categories
  const apiCategory = mapCategory(category)

  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&category=${apiCategory}&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      console.error(`News API error: ${response.status} ${response.statusText}`)
      throw new Error(`News API error: ${response.status}`)
    }

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      throw new Error("Invalid response format")
    }

    // Get the raw text first to debug if needed
    const text = await response.text()

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(text)
      return transformArticles(data.articles || [], category)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200)) // Log first 200 chars
      throw new Error("Failed to parse API response")
    }
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error)
    return getFallbackNews(count, category)
  }
}

// Fetch featured news
export async function fetchFeaturedNews(count = 5): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, "featured")
  }

  try {
    // For featured news, we'll get the most popular articles
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      console.error(`News API error: ${response.status} ${response.statusText}`)
      throw new Error(`News API error: ${response.status}`)
    }

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      throw new Error("Invalid response format")
    }

    // Get the raw text first to debug if needed
    const text = await response.text()

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(text)
      return transformArticles(data.articles || [], "featured")
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200)) // Log first 200 chars
      throw new Error("Failed to parse API response")
    }
  } catch (error) {
    console.error("Error fetching featured news:", error)
    return getFallbackNews(count, "featured")
  }
}

// Fetch breaking news
export async function fetchBreakingNews(count = 3): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, "breaking")
  }

  try {
    // For breaking news, we'll get the most recent articles
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 900 } }, // Cache for 15 minutes for breaking news
    )

    if (!response.ok) {
      console.error(`News API error: ${response.status} ${response.statusText}`)
      throw new Error(`News API error: ${response.status}`)
    }

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      throw new Error("Invalid response format")
    }

    // Get the raw text first to debug if needed
    const text = await response.text()

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(text)
      return transformArticles(data.articles || [], "breaking")
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200)) // Log first 200 chars
      throw new Error("Failed to parse API response")
    }
  } catch (error) {
    console.error("Error fetching breaking news:", error)
    return getFallbackNews(count, "breaking")
  }
}

// Fetch African news
export async function fetchAfricanNews(count = 10): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, "africa")
  }

  try {
    // For African news, we'll search for news about Africa
    const response = await fetch(
      `${BASE_URL}/everything?q=africa&sortBy=publishedAt&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      console.error(`News API error: ${response.status} ${response.statusText}`)
      throw new Error(`News API error: ${response.status}`)
    }

    // Check content type to ensure we're getting JSON
    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Invalid content type: ${contentType}`)
      throw new Error("Invalid response format")
    }

    // Get the raw text first to debug if needed
    const text = await response.text()

    try {
      // Try to parse the text as JSON
      const data = JSON.parse(text)
      return transformArticles(data.articles || [], "africa")
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200)) // Log first 200 chars
      throw new Error("Failed to parse API response")
    }
  } catch (error) {
    console.error("Error fetching African news:", error)
    return getFallbackNews(count, "africa")
  }
}

// Fetch article by ID
export async function fetchArticleById(id: string): Promise<NewsArticle | null> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return null
  }

  try {
    // Since NewsAPI doesn't provide a way to fetch by ID, we'll extract the URL from the ID
    // Our IDs are in the format "article-{encodedUrl}"
    if (!id.startsWith("article-")) {
      throw new Error("Invalid article ID format")
    }

    const encodedUrl = id.substring(8) // Remove "article-" prefix
    const url = decodeURIComponent(encodedUrl)

    // Fetch the article by its URL
    const response = await fetch(
      `${BASE_URL}/everything?url=${encodeURIComponent(url)}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.articles && data.articles.length > 0) {
      const articles = transformArticles(data.articles, "general")
      return articles[0]
    }

    // If we can't find the article by URL, try to get it from localStorage (client-side only)
    if (typeof window !== "undefined") {
      const savedArticle = localStorage.getItem(`article-${id}`)
      if (savedArticle) {
        return JSON.parse(savedArticle)
      }
    }

    throw new Error("Article not found")
  } catch (error) {
    console.error("Error fetching article by ID:", error)

    // For demo purposes, return a fallback article
    return {
      id,
      title: "Article Not Available",
      description: "This article is currently unavailable. Please try another article.",
      content:
        "The article you requested could not be retrieved. This could be due to API limitations or because the article has been removed.",
      url: "/",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000",
      publishedAt: new Date().toISOString(),
      source: {
        name: "Global News Network",
        url: "/",
      },
      category: "general",
    }
  }
}

// Search for articles
export async function searchArticles(query: string, count = 10): Promise<NewsArticle[]> {
  // Check if API key is available
  if (!API_KEY) {
    console.error("NEWS_API_KEY is not set")
    return getFallbackNews(count, "search")
  }

  try {
    const response = await fetch(
      `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${count}&apiKey=${API_KEY}`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()
    return transformArticles(data.articles, "search")
  } catch (error) {
    console.error("Error searching articles:", error)
    return getFallbackNews(count)
  }
}

// Helper function to transform NewsAPI articles to our format
function transformArticles(articles: any[], category: string): NewsArticle[] {
  return articles.map((article, index) => {
    // Create a unique ID based on the article URL
    const id = `article-${encodeURIComponent(article.url)}`

    // Save the article in localStorage for later retrieval (client-side only)
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `article-${id}`,
        JSON.stringify({
          id,
          title: article.title || "Untitled Article",
          description: article.description || "No description available",
          content: article.content || article.description || "No content available",
          url: article.url,
          image: article.urlToImage || getDefaultImageForCategory(category),
          publishedAt: article.publishedAt || new Date().toISOString(),
          source: {
            name: article.source?.name || "Unknown Source",
            url: article.url,
          },
          category,
        }),
      )
    }

    return {
      id,
      title: article.title || "Untitled Article",
      description: article.description || "No description available",
      content: article.content || article.description || "No content available",
      url: article.url,
      image: article.urlToImage || getDefaultImageForCategory(category),
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: {
        name: article.source?.name || "Unknown Source",
        url: article.url,
      },
      category,
    }
  })
}

// Map our categories to NewsAPI categories
function mapCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    world: "general",
    business: "business",
    technology: "technology",
    sports: "sports",
    entertainment: "entertainment",
    health: "health",
    science: "science",
    africa: "general", // NewsAPI doesn't have an Africa category, so we'll use general
    breaking: "general",
    featured: "general",
  }

  return categoryMap[category] || "general"
}

// Get default image for a category
function getDefaultImageForCategory(category: string): string {
  const imagesByCategory: Record<string, string> = {
    world: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1000",
    business: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
    technology: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1000",
    entertainment: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?q=80&w=1000",
    health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1000",
    science: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000",
    africa: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1000",
    breaking: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000",
    featured: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000",
    search: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000",
    general: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000",
  }

  return imagesByCategory[category] || "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1000"
}

// Let's also update the getFallbackNews function to provide more informative fallback content
function getFallbackNews(count: number, category = "general"): NewsArticle[] {
  const fallbackArticles = [
    {
      id: "article-fallback-0",
      title: "API Connection Issue",
      description: "We're having trouble connecting to our news provider. Please check back later.",
      content:
        "Our news service is currently experiencing technical difficulties. This could be due to API rate limits, network issues, or missing API credentials. Please try again later or contact support if the issue persists.",
      url: "/",
      image: getDefaultImageForCategory(category),
      publishedAt: new Date().toISOString(),
      source: {
        name: "Global News Network",
        url: "/",
      },
      category,
    },
    {
      id: "article-fallback-1",
      title: "News API Integration",
      description: "This website uses NewsAPI.org to fetch real-time news data.",
      content:
        "The Global News Network uses NewsAPI.org to provide you with the latest news from around the world. If you're seeing this message, there might be an issue with the API connection. Please ensure your API key is correctly configured and that you haven't exceeded the rate limits.",
      url: "/",
      image: getDefaultImageForCategory("technology"),
      publishedAt: new Date().toISOString(),
      source: {
        name: "Global News Network",
        url: "/",
      },
      category,
    },
    {
      id: "article-fallback-2",
      title: "Stay Informed with Global News",
      description: "Our mission is to keep you updated with the latest news and developments.",
      content:
        "At Global News Network, we strive to provide accurate, timely, and relevant news from around the world. Our platform aggregates news from various trusted sources to give you a comprehensive view of global events.",
      url: "/",
      image: getDefaultImageForCategory("world"),
      publishedAt: new Date().toISOString(),
      source: {
        name: "Global News Network",
        url: "/",
      },
      category,
    },
  ]

  // Return the appropriate number of fallback articles
  if (count <= fallbackArticles.length) {
    return fallbackArticles.slice(0, count)
  }

  // If we need more, duplicate the last one
  const result = [...fallbackArticles]
  const lastArticle = fallbackArticles[fallbackArticles.length - 1]

  for (let i = fallbackArticles.length; i < count; i++) {
    result.push({
      ...lastArticle,
      id: `article-fallback-${i}`,
    })
  }

  return result
}

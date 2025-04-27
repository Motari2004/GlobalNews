import { NextResponse } from "next/server"

const API_KEY = process.env.NEWS_API_KEY
const BASE_URL = "https://newsapi.org/v2"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint") || "top-headlines"
  const country = searchParams.get("country") || "us"
  const category = searchParams.get("category") || ""
  const query = searchParams.get("q") || ""
  const pageSize = searchParams.get("pageSize") || "10"

  if (!API_KEY) {
    return NextResponse.json({ error: "API key is not configured", articles: [] }, { status: 500 })
  }

  let url = ""

  if (endpoint === "top-headlines") {
    url = `${BASE_URL}/top-headlines?country=${country}&pageSize=${pageSize}`
    if (category) {
      url += `&category=${category}`
    }
  } else if (endpoint === "everything") {
    url = `${BASE_URL}/everything?pageSize=${pageSize}`
    if (query) {
      url += `&q=${encodeURIComponent(query)}`
    }
  }

  // Add API key
  url += `&apiKey=${API_KEY}`

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`News API error: ${response.status} ${response.statusText}`)
      console.error(`Response: ${errorText.substring(0, 200)}...`)

      return NextResponse.json(
        {
          error: `News API error: ${response.status}`,
          articles: [],
          details: errorText.substring(0, 500),
        },
        { status: response.status },
      )
    }

    // Get the raw text first
    const text = await response.text()

    try {
      // Try to parse as JSON
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch (parseError) {
      console.error("JSON parse error:", parseError)
      console.error("Response text:", text.substring(0, 200))

      return NextResponse.json(
        {
          error: "Failed to parse API response",
          articles: [],
          details: text.substring(0, 500),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Failed to fetch news", articles: [] }, { status: 500 })
  }
}

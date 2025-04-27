// Create a new API client to use our server-side API route
export async function fetchFromApi(endpoint: string, params: Record<string, string>) {
  const url = new URL("/api/news", window.location.origin)

  // Add endpoint parameter
  url.searchParams.append("endpoint", endpoint)

  // Add all other parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching from API:", error)
    throw error
  }
}

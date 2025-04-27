// Add a custom not-found page
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        We couldn't find the article you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Homepage
        </Link>
      </Button>
    </div>
  )
}

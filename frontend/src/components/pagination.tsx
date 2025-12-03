"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5]
    }

    if (currentPage >= totalPages - 2) {
      return pages.slice(totalPages - 5)
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2]
  }

  const visiblePages = getVisiblePages()
  const showStartEllipsis = visiblePages[0] > 1
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 py-4 sm:py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-muted dark:bg-card dark:border-border/50 dark:hover:bg-muted hover:text-foreground dark:hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background dark:disabled:hover:bg-card transition-all duration-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {showStartEllipsis && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-muted dark:bg-card dark:border-border/50 dark:hover:bg-muted hover:text-foreground dark:hover:text-foreground transition-all duration-200"
          >
            1
          </button>
          <span className="text-foreground/40 dark:text-foreground/40 px-2 text-sm font-medium">...</span>
        </>
      )}

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg border font-semibold transition-all duration-200 ${
            currentPage === page
              ? 
                "bg-primary text-primary-foreground border-primary scale-110 shadow-lg hover:shadow-xl hover:scale-110 dark:bg-primary dark:text-primary-foreground dark:border-primary"
              : "border-border bg-background text-foreground hover:bg-muted dark:bg-card dark:border-border/50 dark:hover:bg-muted hover:text-foreground dark:hover:text-foreground"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {showEndEllipsis && (
        <>
          <span className="text-foreground/40 dark:text-foreground/40 px-2 text-sm font-medium">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-muted dark:bg-card dark:border-border/50 dark:hover:bg-muted hover:text-foreground dark:hover:text-foreground transition-all duration-200"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-background text-foreground hover:bg-muted dark:bg-card dark:border-border/50 dark:hover:bg-muted hover:text-foreground dark:hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-background dark:disabled:hover:bg-card transition-all duration-200"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

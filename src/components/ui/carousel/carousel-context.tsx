
import * as React from "react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

export interface CarouselProps {
  orientation?: "horizontal" | "vertical"
  opts?: any
  plugins?: any[]
  setApi?: (api: CarouselApi) => void
}

export interface CarouselApi {
  canScrollNext: boolean
  canScrollPrev: boolean
  scrollNext: () => void
  scrollPrev: () => void
  scrollTo: (index: number) => void
  selectedIndex: number
}

// Define EmblaCarouselType properly to prevent type errors
export type EmblaCarouselType = ReturnType<UseEmblaCarouselType>[1]

export const CarouselContext = React.createContext<{
  carouselRef: React.RefObject<HTMLDivElement> | null
  api: EmblaCarouselType | null
  scrollNext: () => void
  scrollPrev: () => void
  canScrollNext: boolean
  canScrollPrev: boolean
  orientation: "horizontal" | "vertical"
} | null>(null)


import * as React from "react"
import type { EmblaCarouselType } from "embla-carousel-react"

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

export const CarouselContext = React.createContext<{
  carouselRef: React.RefObject<HTMLElement> | null
  api: EmblaCarouselType | null
  scrollNext: () => void
  scrollPrev: () => void
  canScrollNext: boolean
  canScrollPrev: boolean
  orientation: "horizontal" | "vertical"
} | null>(null)

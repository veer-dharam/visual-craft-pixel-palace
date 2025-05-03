
import * as React from "react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

export interface CarouselApi {
  canScrollNext: boolean
  canScrollPrev: boolean
  scrollNext: () => void
  scrollPrev: () => void
  scrollTo: (index: number) => void
  selectedIndex: number
}

export const CarouselContext = React.createContext<{
  carouselRef: ReturnType<UseEmblaCarouselType>[0] | null
  api: CarouselApi | null
  scrollNext: () => void
  scrollPrev: () => void
  canScrollNext: boolean
  canScrollPrev: boolean
  orientation: "horizontal" | "vertical"
} | null>(null)


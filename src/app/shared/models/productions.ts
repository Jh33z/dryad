

export interface Production {
  id: number
  imgPath: string
  title: string
  price: number
  oldPrice: number
  discount: number
  rating: number
  reviewCount: number
  warranty: string
  attributes: ProductionAttributes
  description: string
  materials: Material[]
  careInstructions: string[]
  reviews: Review[]
  productImages: string[]
}

export interface ProductionAttributes {
  length: string
  width: string
  height: string
  color: string
}

export interface Material {
  name: string
  description: string
}

export interface Review {
  author: string
  date: string
  rating: number
  title: string
  comment: string
}

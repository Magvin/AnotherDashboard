export interface IFiltersQuery {
  name: string
  value: string
  operator: string
}

export interface ISortQuery {
  field: string
  desc: boolean
}

export interface ISort {
  sortBY: string
  sortOrder: "asc" | "desc"
}
export interface IItems {
  _id: string
  title: string
  description: string
  tags: string[]
  platform: string
  googlePlayStoreInfo?: {
    title: string
    icon: string
    scroe: number
    genre: string
    contentRating: string
    url: string
    studio: string
    screenshots: string[]
  }
  avails: number
  score: number
  featured: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
export interface IGameData {
  totalCount: number
  items: IItems[]
}

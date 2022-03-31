import { ApiService } from "../services/apiServices"
import { action, computed, makeAutoObservable, observable, runInAction } from "mobx"
import { TPost } from "./types"
import { IData, TOrder } from "../view/features/TablePage/components/types"
export interface ITableViewModel {
  data: TPost[]
  totalPages: number
  autoCompleteData: any[]
  fetchData: ({ pageNumber, pageSize, search }: { pageNumber: number; pageSize: number; search?: any }) => void
  updateProduct: (id: string, bodyQuery: unknown) => void
  setPageNumber: (pageNumber: number) => void
  setPageSize: (pageSize: number) => void
  setSearchString: (searchString: string) => void
  searchString: string
  pageNumber: number
  pageSize: number
  orderBy: keyof IData
  order: TOrder
}

export class TableViewModel implements ITableViewModel {
  @observable.ref data: any[] = []
  @observable pageNumber: number = 1
  @observable pageSize: number = 10
  @observable autoCompleteData: any[] = []
  @observable searchString: string = ""
  @observable orderBy: keyof IData = "UPDATED ON"
  @observable order: any = "asc"
  totalCount = 0
  static apiService: ApiService
  constructor(private apiService: ApiService) {
    makeAutoObservable(this)
  }

  @action.bound
  fetchData = async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const sort = {
      sortBY: this.orderBy,
      sortOrder: this.order,
    }
    const response = await this.apiService.fetchProductData(pageNumber, pageSize, this.searchString, sort)
    runInAction(() => {
      this.data = response.data.items
      this.autoCompleteData = response.data.items

      this.totalCount = response.data.totalCount
    })
  }

  @action.bound
  updateProduct = async (id: string, bodyQuery: unknown) => {
    await this.apiService.updateProduct(id, bodyQuery)
  }

  @computed
  get totalPages() {
    return Math.round(this.totalCount / this.pageSize)
  }
  @action.bound
  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber
  }

  @action.bound
  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize
  }

  @action.bound
  setSearchString = (searchString: string) => {
    this.searchString = searchString
  }

  @action.bound
  setOrderBy = (orderBy: keyof IData) => {
    this.orderBy = orderBy
  }

  @action.bound
  setOrder = (order: TOrder) => {
    this.order = order
  }
}

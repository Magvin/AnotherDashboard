import { ApiService } from "../services/apiServices"
import { action, computed, makeAutoObservable, observable, runInAction } from "mobx"
import { TPost } from "./types"
export interface ITableViewModel {
  data: TPost[]
  totalPages: number
  autoCompleteData: any[]
  fetchData: ({ pageNumber, pageSize, search }: { pageNumber: number; pageSize: number; search?: any }) => void
  setPageNumber: (pageNumber: number) => void
  setPageSize: (pageSize: number) => void
  setSearchString: (searchString: string) => void
  searchString: string
  pageNumber: number
  pageSize: number
}

export class TableViewModel implements ITableViewModel {
  @observable.ref data: any[] = []
  @observable pageNumber: number = 1
  @observable pageSize: number = 10
  @observable autoCompleteData: any[] = []
  @observable searchString: string = ""
  totalCount = 0
  static apiService: ApiService
  constructor(private apiService: ApiService) {
    makeAutoObservable(this)
  }

  @action.bound
  fetchData = async ({ pageNumber, pageSize }: { pageNumber: number; pageSize: number }) => {
    const response = await this.apiService.fetchProductData(pageNumber, pageSize, this.searchString)
    runInAction(() => {
      this.data = response.data.items
      this.autoCompleteData = response.data.items

      this.totalCount = response.data.totalCount
    })
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
}

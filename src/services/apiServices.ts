import axios from "axios"
import { IFiltersQuery, ISort, ISortQuery } from "./types"

const isDevelopment = process.env.NODE_ENV === "development"
const urlToFetch = isDevelopment ? "http://localhost:3000/" : "https://magvin.github.io/"
export class ApiService {
  apiKey: string | undefined = process.env.REACT_APP_API_KEY

  transport = axios.create({
    timeout: 4000,
    headers: {
      "admix-api-key": "2b7123aa-1a2f-4230-9275-7131d0de3fca",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    },
  })

  async fetchProductData(pageIndex: number, pageSize: number, search?: string, sort?: ISort) {
    if (this.apiKey?.length === 0 || this.apiKey === undefined) {
      throw Error("API key is not defined")
    }
    const headers = {
      "admix-api-key": this.apiKey,
    }
    const bodyQuery: {
      pageIndex: number
      pageSize: number
      filters?: IFiltersQuery[]
      sorts?: ISortQuery[]
    } = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    }
    if (search) {
      bodyQuery.filters = [{ name: "title", value: search, operator: "like" }]
    }

    if (sort) {
      bodyQuery.sorts = [{ field: sort.sortBY, desc: sort.sortOrder === "desc" ? true : false }]
    }

    const response = await this.transport.post(`${urlToFetch}challenge-v1/fetch`, bodyQuery, { headers })
    const data = response.data
    return data
  }
  async updateProduct(id: string, bodyQuery: unknown) {
    if (this.apiKey?.length === 0 || this.apiKey === undefined) {
      throw Error("API key is not defined")
    }
    const headers = {
      "admix-api-key": this.apiKey,
    }
    const response = await this.transport.put(`${urlToFetch}challenge-v1/enrich/update/${id}`, bodyQuery, {
      headers,
    })
    const data = response.data
    return data
  }
}

import axios from "axios"
import { mockFetchProductData } from "./fixtures/mockFetchProductData"

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

  async fetchProductData(pageIndex: number, pageSize: number, search?: any) {
    if (this.apiKey?.length === 0 || this.apiKey === undefined) {
      throw Error("API key is not defined")
    }
    const headers = {
      "admix-api-key": this.apiKey,
    }
    const bodyQuery: {
      pageIndex: number
      pageSize: number
      filters?: any
    } = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    }
    if (search) {
      bodyQuery.filters = [{ name: "title", value: search, operator: "like" }]
    }

    const response = await this.transport.post("http://localhost:3000/challenge-v1/fetch", bodyQuery, { headers })
    const data = response.data
    return data
  }
  async updateProduct() {
    const response = await fetch("http://localhost:3000/challenge-v1/fetch", {
      method: "POST",
    })
    const data = await response.json()
    return data
  }
}

import { mockFetchProductData } from "./fixtures/mockFetchProductData"

export class ApiServiceMock {
  fetchProductData = jest.fn(() => Promise.resolve(mockFetchProductData))
  updateProduct = jest.fn()
}

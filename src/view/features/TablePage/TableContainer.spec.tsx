import * as React from "react"
import { Application } from "../../../common/app/application"
import renderWithMobx from "../../../testUtils"
import { initializeHome } from "../../../viewModels/initTableViewModel"
import { TableContainer } from "./TableContainer"
import { TABLE_SERVICE_KEY } from "../../../constants/application"
import { fireEvent, waitForElementToBeRemoved, within } from "@testing-library/react"
import { ITableViewModel, TableViewModel } from "../../../viewModels/tableViewModel"
import { mockFetchProductData } from "../../../services/fixtures/mockFetchProductData"
import { headerCells } from "./constants"
import { convertDateToIsoString, convertToInternationalCurrencySystem } from "../../utils"

const mockedNavigate = jest.fn()

jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useNavigate: () => mockedNavigate,
  }
})
describe("Table componet", () => {
  let app: Common.IApplication

  beforeEach(() => {
    app = new Application()
    initializeHome(app)
  })
  it("should see if getPosts have been called", async () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as ITableViewModel
    ;(viewModel as unknown as typeof TableViewModel).apiService.fetchProductData = jest
      .fn()
      .mockResolvedValue(mockFetchProductData)
    const { getByTestId } = renderWithMobx({ children: <TableContainer />, application: app })
    await waitForElementToBeRemoved(() => getByTestId("loading"))
    expect((viewModel as unknown as typeof TableViewModel).apiService.fetchProductData).toHaveBeenCalled()
    expect(getByTestId("table-page")).toBeTruthy()
  })

  it("should output table with data", async () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as ITableViewModel
    ;(viewModel as unknown as typeof TableViewModel).apiService.fetchProductData = jest
      .fn()
      .mockResolvedValue(mockFetchProductData)
    const { getByTestId, getAllByTestId, getAllByText, getByText } = renderWithMobx({
      children: <TableContainer />,
      application: app,
    })
    await waitForElementToBeRemoved(() => getByTestId("loading"))
    expect(getAllByTestId("square-with-first-app-name").length).toBe(1)
    expect(getAllByTestId("google-play-store-icon").length).toBe(2)
    headerCells.forEach((headerCell) => {
      expect(getAllByText(headerCell.label)[0]).toBeInTheDocument()
    })
    mockFetchProductData.data.items.forEach((item, index) => {
      expect(getByText(item.title)).toBeInTheDocument()
      expect(getAllByText(convertDateToIsoString(new Date(item.createdAt)))[index]).toBeInTheDocument()
      expect(getByText(convertDateToIsoString(new Date(item.updatedAt)))).toBeInTheDocument()
      if (item.avails) {
        expect(getByText(convertToInternationalCurrencySystem(item.avails))).toBeInTheDocument()
      }
      if (item.googlePlayStoreInfo) {
        expect(getByText(item.googlePlayStoreInfo.studio)).toBeInTheDocument()
        expect(getAllByText(item.googlePlayStoreInfo.contentRating)[index]).toBeInTheDocument()
      }
    })
  })

  it("should redirect to edit page when icon is clicked", async () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as ITableViewModel
    ;(viewModel as unknown as typeof TableViewModel).apiService.fetchProductData = jest
      .fn()
      .mockResolvedValue(mockFetchProductData)
    const { getByTestId, getAllByTestId } = renderWithMobx({
      children: <TableContainer />,
      application: app,
    })
    await waitForElementToBeRemoved(() => getByTestId("loading"))
    fireEvent.click(getAllByTestId("icon-button")[0])
    expect(getByTestId("edit-icon")).toBeInTheDocument()
    fireEvent.click(getByTestId("edit-icon"))
    expect(mockedNavigate).toHaveBeenCalledWith(`/app/${mockFetchProductData.data.items[0]._id}`)
  })
})

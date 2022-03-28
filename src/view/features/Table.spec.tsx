import * as React from "react"
import { Application } from "../../common/app/application"
import renderWithMobx from "../../testUtils"
import { initializeHome } from "../../viewModels/initTableViewModel"
import { TableContainer } from "./TablePage/TableContainer"
import { TABLE_SERVICE_KEY } from "../../constants/application"
import { waitForElementToBeRemoved } from "@testing-library/react"
import { ITableViewModel, TableViewModel } from "../../viewModels/tableViewModel"

describe("Home componet", () => {
  let app: Common.IApplication

  beforeEach(() => {
    app = new Application()
    initializeHome(app)
  })
  it("should see if getPosts have been called", async () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as ITableViewModel
    ;(viewModel as unknown as typeof TableViewModel).apiService.fetchProductData = jest
      .fn()
      .mockResolvedValue([{ id: 1, title: "test" }])
    const { getByTestId } = renderWithMobx({ children: <TableContainer />, application: app })
    await waitForElementToBeRemoved(() => getByTestId("loading"))
    expect((viewModel as unknown as typeof TableViewModel).apiService.fetchProductData).toHaveBeenCalled()
    expect(getByTestId("home-page")).toBeTruthy()
  })
})

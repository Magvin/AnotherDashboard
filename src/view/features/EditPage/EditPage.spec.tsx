import * as React from "react"
import { Application } from "../../../common/app/application"
import { renderWithMobxWithoutBrowserRouter } from "../../../testUtils"
import { TABLE_SERVICE_KEY } from "../../../constants/application"
import { ITableViewModel, TableViewModel } from "../../../viewModels/tableViewModel"
import { mockFetchProductData } from "../../../services/fixtures/mockFetchProductData"
import { EditApp } from "./EditPage"
import { MemoryRouter } from "react-router"

import { initTableViewModelMock } from "../../../viewModels/initTableViewModelMock"

const mockedNavigate = jest.fn()

jest.mock("react-router", () => {
  return {
    ...jest.requireActual("react-router"),
    useNavigate: () => mockedNavigate,
    useParams: () => ({
      id: "5fb3e231f8b0bfb7a0705d3a",
    }),
    useRouteMatch: () => ({ url: "/app/5fb3e231f8b0bfb7a0705d3a" }),
  }
})
describe("Edit page", () => {
  let app: Common.IApplication
  let model: ITableViewModel

  beforeEach(() => {
    app = new Application()
    initTableViewModelMock(app)
  })
  it("page should exist", async () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as TableViewModel
    viewModel.data = mockFetchProductData.data.items
    const { getByTestId, container } = renderWithMobxWithoutBrowserRouter({
      children: (
        <MemoryRouter
          initialEntries={[
            {
              key: "a",
              pathname: "/app/5fb3e231f8b0bfb7a0705d3a",
            },
          ]}
          initialIndex={0}
        >
          <EditApp />
        </MemoryRouter>
      ),
      application: app,
    })
    expect(getByTestId("edit-page")).toBeTruthy()
  })
  it("should have all fields as per design", () => {
    const viewModel = app.getService(TABLE_SERVICE_KEY) as TableViewModel
    viewModel.data = mockFetchProductData.data.items
    const { getByText, container } = renderWithMobxWithoutBrowserRouter({
      children: (
        <MemoryRouter
          initialEntries={[
            {
              key: "a",
              pathname: "/app/5fb3e231f8b0bfb7a0705d3a",
            },
          ]}
          initialIndex={0}
        >
          <EditApp />
        </MemoryRouter>
      ),
      application: app,
    })
    expect(getByText("App title")).toBeInTheDocument()
    expect(getByText("App ID")).toBeInTheDocument()
    expect(getByText("Categories")).toBeInTheDocument()
    expect(getByText("Publisher name")).toBeInTheDocument()
    expect(getByText("Tags")).toBeInTheDocument()
    expect(getByText("Description")).toBeInTheDocument()
    expect(getByText("Cancel")).toBeInTheDocument()
    expect(getByText("Save")).toBeInTheDocument()
  })
})

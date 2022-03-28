import { API_SERVICE_KEY, TABLE_SERVICE_KEY } from "../constants/application"
import { ApiService } from "../services/apiServices"
import { EditApp } from "../view/Details"
import { TableContainer } from "../view/features/TablePage/TableContainer"
import { TableViewModel } from "./tableViewModel"

export function initializeHome(application: Common.IApplication) {
  application
    .registerService(API_SERVICE_KEY, () => new ApiService())
    .registerService(TABLE_SERVICE_KEY, (app) => new TableViewModel(app.getService(API_SERVICE_KEY)))
    .registerFeature({
      key: "home",
      label: "Home",
      path: "/",
      getView: () => <TableContainer />,
    })
  application.registerFeature({
    key: "editApp",
    label: "Edit App",
    path: "/app/:id",
    getView: () => <EditApp />,
  })
  return application
}

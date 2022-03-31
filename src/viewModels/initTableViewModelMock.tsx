import { API_SERVICE_KEY, TABLE_SERVICE_KEY } from "../constants/application"
import { ApiServiceMock } from "../services/apiServicesMock."
import { TableViewModel } from "./tableViewModel"

export function initTableViewModelMock(application: Common.IApplication) {
  application
    .registerService(API_SERVICE_KEY, () => new ApiServiceMock())
    .registerService(TABLE_SERVICE_KEY, (app) => new TableViewModel(app.getService(API_SERVICE_KEY)))
}

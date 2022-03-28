import { useApplication } from "../common/app/provider"
import { useRef } from "react"
import { TableViewModel } from "./tableViewModel"
import { TABLE_SERVICE_KEY } from "../constants/application"

const useHomeViewModel = (tableViewModel?: TableViewModel) => {
  const app = useApplication()
  const viewModel = useRef(tableViewModel || app.getService<TableViewModel>(TABLE_SERVICE_KEY))
  return viewModel.current
}

export default useHomeViewModel

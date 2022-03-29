import { Backdrop, Box, CircularProgress, Paper } from "@mui/material"
import { observer } from "mobx-react"
import * as React from "react"
import { useAsync } from "react-async"
import useHomeViewModel from "../../../viewModels/useHomeViewModel"
import { AutoCompleteSearch } from "./components/autoComplete"
import { DataTable } from "./components/DataTable"

export const TableContainer = observer(() => {
  const { fetchData, pageNumber, pageSize, orderBy, order } = useHomeViewModel()

  const getData = React.useCallback(async () => {
    return await fetchData({ pageNumber, pageSize })
  }, [pageNumber, pageSize])

  const { isLoading, run: loadData } = useAsync({
    deferFn: getData,
  })

  React.useEffect(() => {
    loadData()
  }, [pageNumber, pageSize, order, orderBy])

  return (
    <Box
      data-testid="table-page"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#E5E5E5",
        paddingTop: "75px",
        position: "relative",
      }}
    >
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: () => 1 }} open={true} onClick={() => {}}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Paper sx={{ borderRadius: "16px", width: "1292px", marginBottom: "22px", position: "relative" }} elevation={0}>
        <AutoCompleteSearch />
      </Paper>
      <Paper sx={{ borderRadius: "16px", width: "1292px" }} elevation={0}>
        <DataTable />
      </Paper>
    </Box>
  )
})

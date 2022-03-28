import * as React from "react"
import Table from "@mui/material/Table"
import { DataTableHead } from "./DataHeader"
import { IData, TOrder } from "./types"
import { headerCells } from "../constants"
import { DataBody } from "./DataBody"
import { Box, TablePagination, IconButton, TableContainer } from "@mui/material"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import useHomeViewModel from "../../../../viewModels/useHomeViewModel"
import styled from "@emotion/styled"
import { observer } from "mobx-react"

export const DataTable = observer(() => {
  const [order, setOrder] = React.useState<TOrder>("asc")
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [orderBy, setOrderBy] = React.useState<keyof IData>("UPDATED ON")
  const { pageNumber, pageSize, setPageNumber, setPageSize, totalPages } = useHomeViewModel()

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof IData) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = [{ id: 1, name: "STATUS" }].map((n) => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }
  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 900 }}>
        <StyledTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <DataTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={headerCells.length}
          />
          <DataBody />
        </StyledTable>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages}
          rowsPerPage={pageSize}
          page={pageNumber}
          onPageChange={() => {}}
          onRowsPerPageChange={({ target }) => {
            setPageSize(target.value as unknown as number)
            setPageNumber(1)
          }}
          labelDisplayedRows={() => null}
          SelectProps={{
            native: false,
            renderValue: (value) => `${value} apps`,
            sx: () => ({
              border: "1px solid #e8e8e8",
              borderRadius: "8px",
            }),
          }}
          labelRowsPerPage=""
          ActionsComponent={(props) => {
            const { page } = props
            return (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <StyledIconButton
                  size="small"
                  disabled={page === 1}
                  onClick={() => {
                    const previousPage = page - 1
                    setPageNumber(previousPage)
                  }}
                >
                  <ArrowBackIosIcon fontSize="small" />
                  prev
                </StyledIconButton>
                <PageNumberHolder>
                  {props.page} of {totalPages}
                </PageNumberHolder>
                <StyledIconButton
                  disabled={totalPages === page}
                  onClick={() => {
                    const nextPage = page + 1
                    setPageNumber(nextPage)
                  }}
                  size="small"
                >
                  next
                  <ArrowForwardIosIcon fontSize="small" />
                </StyledIconButton>
              </Box>
            )
          }}
        />
      </TableContainer>
    </Box>
  )
})

const StyledTable = styled(Table)`
  width: calc(100% - 30px);
  margin: 0 auto;
  tr:last-child > td {
    border-bottom: 1px solid #e8e8e8;
  }
  tr {
    width: calc(100% - 8px);
  }
  td {
    border: none;
  }
`
const StyledIconButton = styled(IconButton)`
  font-size: 14px;
  color: #000;
  margin: 0 8px;
  transition: none;
  &:hover,
  &:focus,
  &:active {
    border-radius: 0;
  }
  svg {
    width: 0.7em;
    height: 0.7em;
    margin: 0 4px;
  }
`
const PageNumberHolder = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  display: flex;
  width: 60px;
  padding: 0 8px;
  text-align: center;
  align-items: center;
`

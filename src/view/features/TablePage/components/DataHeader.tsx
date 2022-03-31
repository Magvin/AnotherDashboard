import * as React from "react"
import CodeIcon from "@mui/icons-material/Code"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import { EnhancedTableProps, IData } from "./types"
import { headerCells } from "../constants"
import { TypographyAdmix } from "../../../../common/app/components/typography"
import { styled } from "@mui/material"
export function DataTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof IData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headerCells.map((headerCell) => {
          const hideSort = headerCell.label === "AGE" || headerCell.label === "CATEGORY" || headerCell.label === ""
          return (
            <TableCell
              key={headerCell.id}
              align="left"
              sortDirection={orderBy === headerCell.id ? order : false}
              sx={{ padding: "12px" }}
            >
              <TableSortLabel
                active={orderBy === headerCell.id}
                direction={orderBy === headerCell.id ? order : "asc"}
                onClick={createSortHandler(headerCell.id as keyof IData)}
                hideSortIcon={hideSort}
                IconComponent={() => {
                  return <OverideCodeIconStyle fontSize="small" />
                }}
              >
                <TypographyAdmix type="boldSmall" color="#858798" data-testid="table-header-label">
                  {headerCell.label}
                </TypographyAdmix>
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

const OverideCodeIconStyle = styled(CodeIcon)`
  margin-left: 11px;
  color: grey;
  transform: rotate(90deg);
  width: 18px;
  height: 18px;
`

import * as React from "react"
import CodeIcon from "@mui/icons-material/Code"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Box from "@mui/material/Box"
import { EnhancedTableProps } from "./types"
import { headerCells } from "../constants"
import { TypographyAdmix } from "../../../../common/app/components/typography"
import { styled } from "@mui/material"
export function DataTableHead(props: EnhancedTableProps) {
  const { order, orderBy } = props
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
                onClick={() => {}}
                hideSortIcon={hideSort}
                IconComponent={() => <OverideCodeIconStyle fontSize="small" />}
              >
                <TypographyAdmix type="boldSmall" color="#858798">
                  {headerCell.label}
                </TypographyAdmix>
                {orderBy === headerCell.id ? (
                  <Box component="span">{order === "desc" ? "sorted descending" : "sorted ascending"}</Box>
                ) : null}
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

import * as React from "react"
import { TableCell, Menu, MenuItem, TableBody, TableRow, IconButton, Avatar, styled, Box } from "@mui/material"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useHomeViewModel from "../../../../viewModels/useHomeViewModel"
import { convertToInternationalCurrencySystem } from "../../../utils"
import { TypographyAdmix } from "../../../../common/app/components/typography"
import { AntSwitch } from "../../../../common/app/components/antSwitch"
import { useNavigate } from "react-router"
import { CustomNoRowsOverlay } from "./emptyMessage"
import CircularProgress from "@mui/material/CircularProgress"
import { observer } from "mobx-react"
export const DataBody = observer(() => {
  const { data } = useHomeViewModel()
  const convertDateToIsoString = (date: Date) => {
    return date.toLocaleString("en-GB", { timeZone: "UTC", month: "numeric", day: "numeric", year: "numeric" })
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const mapDataToRow = () => {
    if (data.length === 0) {
      return <CustomNoRowsOverlay />
    }
    return data.map((item) => {
      const open = Boolean(anchorEl)
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
      }
      const handleClose = () => {
        setAnchorEl(null)
      }
      return (
        <TableRow key={item.id}>
          <TableCell align="left" width="75px">
            <AntSwitch disabled={item.isDeleted} size="small" />
          </TableCell>
          <TableCell align="left">
            <div style={{ display: "flex", width: "100%" }}>
              {item.googlePlayStoreInfo ? (
                <Avatar
                  variant="square"
                  sx={{ borderRadius: "8px", marginRight: "5.25px" }}
                  src={item.googlePlayStoreInfo.icon}
                />
              ) : (
                <Avatar variant="square" sx={{ borderRadius: "8px", marginRight: "5.25px" }}>
                  {item.title.charAt(0)}
                </Avatar>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TypographyAdmix
                  type="bodyBold"
                  color="#2622B5"
                  style={{
                    marginBottom: "4px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.title}
                </TypographyAdmix>
                {item.googlePlayStoreInfo && (
                  <TypographyAdmix type="small" color="#858798">
                    {item.googlePlayStoreInfo.studio}
                  </TypographyAdmix>
                )}
              </div>
            </div>
          </TableCell>
          <TableCell align="left" width="120px">
            {item.featured ? (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <BadgeCentered />
                <TypographyAdmix type="bodyBoldL18" color="#232747">
                  Featured
                </TypographyAdmix>
              </div>
            ) : null}
          </TableCell>
          <TableCell align="left" width="130px">
            <b>{convertToInternationalCurrencySystem(item.avails)}</b>
          </TableCell>
          <TableCell align="left" width="140px">
            {convertDateToIsoString(new Date(item.createdAt))}
          </TableCell>
          <TableCell align="left" width="150px">
            {convertDateToIsoString(new Date(item.updatedAt))}
          </TableCell>
          <TableCell align="left">
            <b>{item.googlePlayStoreInfo?.contentRating || ""}</b>
          </TableCell>
          <TableCell align="left" width="100px">
            <StyledTableCell>
              {item.tags &&
                item.tags.map((tag: string, index: number) => {
                  return <span key={index}>{tag} </span>
                })}
            </StyledTableCell>
          </TableCell>
          <TableCell sx={{ height: "45px", display: "flex", alignItems: "baseline" }}>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ background: "none !important" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              elevation={1}
              sx={{
                borderRadius: "8px",
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <ActionedButtonWrapper>
                <TypographyAdmix type="actioned" color="#C4CAD6">
                  ACTIONS
                </TypographyAdmix>
              </ActionedButtonWrapper>
              <MenuItem sx={{ width: "120px" }} onClick={() => navigate(`/app/${item._id}`)}>
                <MenuItemIconWrapper>
                  <BorderColorOutlinedIcon />
                  Edit
                </MenuItemIconWrapper>
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      )
    })
  }
  return <CenteredTable>{mapDataToRow()}</CenteredTable>
})

const CenteredTable = styled(TableBody)`
  width: 100%;
  position: relative;
  min-height: 100px;
  height: 100px;
  svg,
  .no-rows {
    display: flex;
    width: 100%;
    height: 100%;
    top: 20px;
    position: absolute;
    justify-content: center;
  }
  .no-rows {
    top: 110px;
  }
`
const MenuItemIconWrapper = styled("div")`
  display: flex;
  svg {
    margin-right: 8px;
  }
`
const ActionedButtonWrapper = styled("div")`
  padding: 4px 0px 8px 16px;
`
const StyledTableCell = styled("div")`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const BadgeCentered = styled("div")`
  height: 8px;
  width: 8px;
  background-color: #5287ed;
  border-radius: 50%;
`

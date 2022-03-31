import * as React from "react"
import { TableCell, Menu, MenuItem, TableBody, TableRow, IconButton, Avatar, styled } from "@mui/material"
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import useHomeViewModel from "../../../../viewModels/useHomeViewModel"
import { convertDateToIsoString, convertToInternationalCurrencySystem } from "../../../utils"
import { TypographyAdmix } from "../../../../common/app/components/typography"
import { AntSwitch } from "../../../../common/app/components/antSwitch"
import { useNavigate } from "react-router"
import { CustomNoRowsOverlay } from "./emptyMessage"
import { observer } from "mobx-react"
export const DataBody = observer(() => {
  const { data } = useHomeViewModel()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const navigate = useNavigate()

  const mapDataToRow = () => {
    if (data.length === 0) {
      return <CustomNoRowsOverlay />
    }
    return data.map((app) => {
      const open = Boolean(anchorEl?.id === app._id)
      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        document.querySelectorAll("tr").forEach((tr) => {
          if (tr.id === app._id) {
            tr.style.backgroundColor = "#EFF1F4"
          }
        })
      }
      const handleClose = () => {
        document.querySelectorAll("tr").forEach((tr) => {
          if (tr.id === app._id) {
            tr.style.backgroundColor = "#fff"
          }
        })
        setAnchorEl(null)
      }
      return (
        <TableRow key={app._id} id={app._id}>
          <TableCell align="left" width="75px">
            <AntSwitch defaultChecked={app.isDeleted} size="small" />
          </TableCell>
          <TableCell align="left">
            <span style={{ display: "flex", width: "100%" }}>
              {app.googlePlayStoreInfo ? (
                <Avatar
                  variant="square"
                  sx={{ borderRadius: "8px", marginRight: "5.25px" }}
                  src={app.googlePlayStoreInfo.icon}
                  data-testid="google-play-store-icon"
                />
              ) : (
                <Avatar
                  variant="square"
                  sx={{ borderRadius: "8px", marginRight: "5.25px" }}
                  data-testid="square-with-first-app-name"
                >
                  {app.title.charAt(0)}
                </Avatar>
              )}
              <span style={{ display: "flex", flexDirection: "column" }}>
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
                  {app.title}
                </TypographyAdmix>
                {app.googlePlayStoreInfo && (
                  <TypographyAdmix type="small" color="#858798">
                    {app.googlePlayStoreInfo.studio}
                  </TypographyAdmix>
                )}
              </span>
            </span>
          </TableCell>
          <TableCell align="left" width="120px">
            {app.featured ? (
              <span
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
              </span>
            ) : null}
          </TableCell>
          <TableCell align="left" width="130px">
            <b>{convertToInternationalCurrencySystem(app.avails)}</b>
          </TableCell>
          <TableCell align="left" width="140px">
            {convertDateToIsoString(new Date(app.createdAt))}
          </TableCell>
          <TableCell align="left" width="150px">
            {convertDateToIsoString(new Date(app.updatedAt))}
          </TableCell>
          <TableCell align="left">
            <b>{app.googlePlayStoreInfo?.contentRating || ""}</b>
          </TableCell>
          <TableCell align="left" width="100px">
            <StyledTableCell>
              {app.tags &&
                app.tags.map((tag: string, index: number) => {
                  return <span key={index}>{tag} </span>
                })}
            </StyledTableCell>
          </TableCell>
          <TableCell sx={{ height: "45px", display: "flex", alignItems: "baseline" }}>
            <IconButton
              id={app._id}
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ background: "none !important" }}
              data-testid="icon-button"
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
              <MenuItem sx={{ width: "120px" }} onClick={() => navigate(`/app/${app._id}`)} data-testid="edit-icon">
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

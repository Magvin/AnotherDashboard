import * as React from "react"
import { useParams } from "react-router"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import useHomeViewModel from "../viewModels/useHomeViewModel"
import { Divider, Box } from "@mui/material"
import { TypographyAdmix } from "../common/app/components/typography"
import { AntSwitch } from "../common/app/components/antSwitch"
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded"
import styled from "@emotion/styled"

export const EditApp = () => {
  const { data } = useHomeViewModel()

  if (data.length === 0) {
    console.log("no data")
  }
  const { id } = useParams()
  return (
    <Box sx={{ minWidth: 750, maxWidth: "1292px", margin: "0 auto", paddingTop: "57px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          <TypographyAdmix type="semiBodyBold" color="#858798">
            Inventory
          </TypographyAdmix>
        </Link>
        <TypographyAdmix type="semiBodyBold" color="black">
          Edit App
        </TypographyAdmix>
      </Breadcrumbs>
      <Divider
        sx={{
          marginTop: "30px",
          marginBottom: "12px",
        }}
      />
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <TypographyAdmix type="bodySmallL24" color="#858798">
          APP DETAILS
        </TypographyAdmix>
        <Box sx={{ display: "flex", justifyContent: "space-between", flex: "0 25%" }}>
          <Box sx={{ display: "flex" }}>
            <TypographyAdmix type="semiBodyBoldL18" color="#232747">
              Featured
            </TypographyAdmix>
            <FlippedIcon fontSize="small" sx={{ marginLeft: "5px", marginRight: "12px", color: "#C4CAD6" }} />
            <AntSwitch />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TypographyAdmix type="semiBodyBoldL18" color="#232747">
              Published
            </TypographyAdmix>
            <FlippedIcon fontSize="small" sx={{ marginLeft: "5px", marginRight: "12px", color: "#C4CAD6" }} />
            <AntSwitch />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const FlippedIcon = styled(ErrorOutlineRoundedIcon)`
  transform: rotate(180deg);
`

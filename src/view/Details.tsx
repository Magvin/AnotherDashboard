import * as React from "react"
import { useNavigate, useParams } from "react-router"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import useHomeViewModel from "../viewModels/useHomeViewModel"
import { Divider, Box } from "@mui/material"
import { TypographyAdmix } from "../common/app/components/typography"
import { AntSwitch } from "../common/app/components/antSwitch"
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded"
import styled from "@emotion/styled"
import InputBase from "@mui/material/InputBase"
import UnstyledSelectSimple from "../common/app/components/styledSelect"
import Chip from "@mui/material/Chip"
import CloseIcon from "@mui/icons-material/Close"

export const EditApp = () => {
  const { data } = useHomeViewModel()
  const navigate = useNavigate()
  const { id } = useParams()

  const handleClick = () => {
    console.info("You clicked the Chip.")
  }

  const handleDelete = () => {
    console.info("You clicked the delete icon.")
  }
  React.useEffect(() => {
    if (data.length === 0) {
      navigate("/")
    }
  }, [data])
  if (data.length === 0) {
    return null
  }
  const app = data.find((item) => item._id === id)
  console.log(app)
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
            <AntSwitch defaultChecked={app.featured} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TypographyAdmix type="semiBodyBoldL18" color="#232747">
              Published
            </TypographyAdmix>
            <FlippedIcon fontSize="small" sx={{ marginLeft: "5px", marginRight: "12px", color: "#C4CAD6" }} />
            <AntSwitch defaultChecked={app.isDeleted} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "12px" }}>
        <InputLabelWrapper margin="24px">
          <label htmlFor="app_title">
            <TypographyAdmix type="smallL21">App title</TypographyAdmix>
          </label>
          <StyledInput id="app_title" value={app.title} />
        </InputLabelWrapper>
        <InputLabelWrapper margin="24px">
          <label htmlFor="app_id">
            <TypographyAdmix type="smallL21">App ID</TypographyAdmix>
          </label>
          <StyledInput id="app_id" value={app._id} disabled />
        </InputLabelWrapper>
        <InputLabelWrapper margin="24px">
          <label htmlFor="app_category">
            <TypographyAdmix type="smallL21">Categories</TypographyAdmix>
          </label>
          <UnstyledSelectSimple value={[{ value: 1, title: "Some" }]} />
          <Box sx={{ marginTop: "16px" }}>
            {app.googlePlayStoreInfo?.genre.split(",").map((item: string, index: number) => (
              <Chip
                key={index}
                label={item}
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<CloseIcon />}
                sx={{ width: "93px", height: "24px" }}
              />
            ))}
          </Box>
        </InputLabelWrapper>
      </Box>
    </Box>
  )
}
const FlippedIcon = styled(ErrorOutlineRoundedIcon)`
  transform: rotate(180deg);
`
const StyledInput = styled(InputBase)<{ disabled?: boolean }>`
  border: 1px solid #dcdfee;
  border-radius: 10px;
  max-width: 588.48px;
  width: 588.48px;
  height: 44px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  padding: 12px 14px;
  ${({ disabled }) => disabled && `background-color: #F5F5F5;`}
`
const InputLabelWrapper = styled.div<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ margin }) => margin};

  label {
    margin-bottom: 8px;
  }
`

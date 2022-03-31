import * as React from "react"
import { useNavigate, useParams } from "react-router"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import useHomeViewModel from "../../../viewModels/useHomeViewModel"
import { Divider, Box, styled, TextField, Button, Backdrop, CircularProgress } from "@mui/material"
import { TypographyAdmix } from "../../../common/app/components/typography"
import { AntSwitch } from "../../../common/app/components/antSwitch"
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded"
import InputBase from "@mui/material/InputBase"
import UnstyledSelectSimple from "../../../common/app/components/styledSelect"
import Chip from "@mui/material/Chip"
import CloseIcon from "@mui/icons-material/Close"
import "./details.css"
import { useFormik } from "formik"
import { useAsync } from "react-async"

export const EditApp = () => {
  const { data, updateProduct } = useHomeViewModel()
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
  }, [data, navigate])

  const app = data.find((item) => item._id === id)

  const formik = useFormik({
    initialValues: {
      app_title: app?.title,
      publisher_name: app?.googlePlayStoreInfo?.studio,
      app_category: "",
      app_description: "",
      isDeleted: app?.isDeleted,
      featured: app?.featured,
    },
    onSubmit: (values) => {},
  })

  const saveAppData = React.useCallback(async () => {
    const bodyQuery = {
      isDeleted: formik.values.isDeleted,
      featured: formik.values.featured,
    }
    if (app?._id) {
      return await updateProduct(app._id, bodyQuery)
    }
  }, [formik, app?._id, updateProduct])
  const {
    run: saveData,
    isLoading,
    isResolved,
  } = useAsync({
    deferFn: saveAppData,
  })

  if (data.length === 0) {
    return null
  }
  if (isResolved) {
    navigate("/")
  }
  return (
    <Box sx={{ minWidth: 750, maxWidth: "1292px", margin: "0 auto", paddingTop: "57px" }} data-testid="edit-page">
      {isLoading && (
        <Backdrop sx={{ color: "#fff", zIndex: () => 1 }} open={true} onClick={() => {}}>
          <CircularProgress color="inherit" data-testid="loading" />
        </Backdrop>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Box>
          <Button sx={{ marginRight: "50px" }} onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ padding: "10px 24px" }} onClick={() => saveData()}>
            Save
          </Button>
        </Box>
      </Box>

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
            <AntSwitch defaultChecked={formik.values.featured} onChange={formik.handleChange} id="featured" />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TypographyAdmix type="semiBodyBoldL18" color="#232747">
              Published
            </TypographyAdmix>
            <FlippedIcon fontSize="small" sx={{ marginLeft: "5px", marginRight: "12px", color: "#C4CAD6" }} />
            <AntSwitch defaultChecked={formik.values.isDeleted} onChange={formik.handleChange} id="isDeleted" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "12px", display: "flex" }}>
        <Box sx={{ marginRight: "33px" }}>
          <InputLabelWrapper margin="24px">
            <label htmlFor="app_title">
              <TypographyAdmix type="smallL21">App title</TypographyAdmix>
            </label>
            <StyledInput id="app_title" value={formik.values.app_title} onChange={formik.handleChange} />
          </InputLabelWrapper>
          <InputLabelWrapper margin="24px">
            <label htmlFor="app_id">
              <TypographyAdmix type="smallL21">App ID</TypographyAdmix>
            </label>
            <StyledInput id="app_id" defaultValue={app._id} disabled />
          </InputLabelWrapper>
          <InputLabelWrapper margin="24px">
            <label htmlFor="app_category">
              <TypographyAdmix type="smallL21">Categories</TypographyAdmix>
            </label>
            <UnstyledSelectSimple value={[{ value: 1, title: "Some" }]} placeholder="Choose category" />
            <Box sx={{ marginTop: "16px" }}>
              {app.googlePlayStoreInfo?.genre.split(",").map((item: string, index: number) => (
                <StyledChip
                  key={index}
                  label={item}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<CloseIcon />}
                  sx={{ width: "120px", height: "24px", marginRight: "8px" }}
                />
              ))}
            </Box>
          </InputLabelWrapper>
        </Box>
        <Box>
          <InputLabelWrapper margin="24px">
            <label htmlFor="app_title">
              <TypographyAdmix type="smallL21">Publisher name</TypographyAdmix>
            </label>
            <StyledInput id="publisher_name" value={formik.values.publisher_name} onChange={formik.handleChange} />
          </InputLabelWrapper>
          <InputLabelWrapper margin="24px">
            <label htmlFor="app_category">
              <TypographyAdmix type="smallL21">Tags</TypographyAdmix>
            </label>
            <UnstyledSelectSimple value={[{ value: 1, title: "Some" }]} placeholder="Choose keywords" />
            <Box sx={{ marginTop: "16px" }}>
              {app.tags?.map((item: string, index: number) => (
                <StyledChip
                  key={index}
                  label={item}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<CloseIcon />}
                  sx={{ width: "120px", height: "24px", marginRight: "8px", marginBottom: "11px" }}
                />
              ))}
            </Box>
          </InputLabelWrapper>
        </Box>
      </Box>
      <Box sx={{ marginTop: "56px" }}>
        <InputLabelWrapper margin="24px">
          <label htmlFor="app_description">
            <TypographyAdmix type="smallL21">Description</TypographyAdmix>
          </label>
          {/* I'm pretty sure you are missing description in response */}
          <StyledTextArea
            placeholder="Game description"
            multiline
            minRows={10}
            maxRows={40}
            id="app_description"
            value={formik.values.app_description}
            onChange={formik.handleChange}
          />
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
  background-color: #ffffff;
  ${({ disabled }) => disabled && `background-color: #F5F5F5;`}
`
const InputLabelWrapper = styled("div")<{ margin?: string }>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ margin }) => margin};

  label {
    margin-bottom: 8px;
  }
`
const StyledChip = styled(Chip)`
  background-color: ${({ theme }) => theme.palette.grey[300]};
`
const StyledTextArea = styled(TextField)`
  border-radius: 10px;
  background: #ffffff;
`

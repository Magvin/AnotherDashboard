import * as React from "react"
import TextField from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { Box, styled } from "@mui/system"
import useHomeViewModel from "../../../../viewModels/useHomeViewModel"
import { useAsync } from "react-async"
import { useNavigate } from "react-router"
import debounce from "lodash/debounce"
import { Link } from "react-router-dom"
import { TypographyAdmix } from "../../../../common/app/components/typography"
import { observer } from "mobx-react"
import { action } from "mobx"

const SEARCH_DEBOUNCE_TIME = 300
export const AutoCompleteSearch = () => {
  const [open, setOpen] = React.useState<boolean>(false)
  const [localSearchString, setLocalSearchString] = React.useState<string>("")
  const { fetchData, autoCompleteData, pageNumber, pageSize, searchString, setSearchString, setPageNumber } =
    useHomeViewModel()

  const delayedReq = React.useRef(
    debounce((q) => {
      setPageNumber(1)
      setLocalSearchString(q)
      setSearchString(q)
    }, SEARCH_DEBOUNCE_TIME)
  ).current

  const getData = React.useCallback(async () => {
    return await fetchData({ pageNumber, pageSize })
  }, [searchString, fetchData])

  const { isLoading, run: loadData } = useAsync({
    deferFn: getData,
  })

  React.useEffect(
    action(() => {
      if (localSearchString && localSearchString.length > 1) {
        loadData()
      }
    }),
    [localSearchString, loadData]
  )

  return (
    <>
      <StyledAutocompleteWrapper>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StyledIcon>
            <SearchIcon />
          </StyledIcon>
          <TextField
            label="Search app name"
            onChange={(e) => {
              setOpen(true)
              delayedReq(e.target.value)
            }}
            onBlur={() => {
              setOpen(false)
            }}
          />
        </Box>
      </StyledAutocompleteWrapper>
      {autoCompleteData && autoCompleteData.length > 0 && open && (
        <Box sx={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)" }}>
          <ul
            style={{
              position: "absolute",
              background: "#f7f7f7",
              top: "40px",
              left: "20px",
              padding: "10px 20px",
              minHeight: 100,
              zIndex: 1,
              width: 400,
              listStyle: "none",
            }}
          >
            {autoCompleteData.map((item, index) => (
              <StyledLi key={index}>
                <StyledLink to={`/app/${item._id}`}>
                  <TypographyAdmix type="semiBodyBold" color="#2622B5">
                    {item.title}
                  </TypographyAdmix>
                </StyledLink>
              </StyledLi>
            ))}
          </ul>
        </Box>
      )}
    </>
  )
}

const StyledLi = styled("li")`
  margin: 4px 0;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
const StyledAutocompleteWrapper = styled("div")`
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
  label[data-shrink="true"] {
    display: none;
  }
  input {
    width: 100%;
  }
`
const StyledIcon = styled("div")`
  svg {
    margin-left: 8px;
  }
`

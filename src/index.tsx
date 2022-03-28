import { createTheme, ThemeProvider } from "@mui/material"
import { configure } from "mobx"
import { Observer } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Application } from "./common/app/application"
import { AppProvider } from "./common/app/provider"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { initializeHome } from "./viewModels/initTableViewModel"
configure({
  enforceActions: "always",
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
})
const application = new Application()
initializeHome(application)
const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
  },
})

ReactDOM.render(
  <AppProvider application={application}>
    <ThemeProvider theme={theme}>
      <Observer>
        {() => (
          <BrowserRouter>
            <Routes>
              {application.features.map((feature) => (
                <Route key={feature.key} path={feature.path} element={feature.getView()} />
              ))}
            </Routes>
          </BrowserRouter>
        )}
      </Observer>
    </ThemeProvider>
  </AppProvider>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

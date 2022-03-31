import React from "react"

import { ThemeProvider } from "@mui/material"
import { configure } from "mobx"
import { Observer } from "mobx-react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Application } from "./common/app/application"
import { AppProvider } from "./common/app/provider"
import { Theme } from "./common/styles/theme"
import { initializeHome } from "./viewModels/initTableViewModel"
configure({
  enforceActions: "always",
})

const application = new Application()

initializeHome(application)

ReactDOM.render(
  <AppProvider application={application}>
    <ThemeProvider theme={Theme}>
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

import { render } from "@testing-library/react"
import { AppProvider } from "./common/app/provider"
import React, { ReactElement } from "react"
import { ThemeProvider } from "@emotion/react"
import { Observer } from "mobx-react"
import { BrowserRouter } from "react-router-dom"
import { Theme } from "./common/styles/theme"

export default function renderWithMobx({
  children,
  application,
}: {
  children: ReactElement
  application: Common.IApplication
}) {
  return render(
    <AppProvider application={application}>
      <ThemeProvider theme={Theme}>
        <Observer>{() => <BrowserRouter>{children}</BrowserRouter>}</Observer>
      </ThemeProvider>
    </AppProvider>
  )
}

export const renderWithMobxWithoutBrowserRouter = ({
  children,
  application,
}: {
  children: ReactElement
  application: Common.IApplication
}) => {
  return render(
    <AppProvider application={application}>
      <Observer>{() => <>{children}</>}</Observer>
    </AppProvider>
  )
}

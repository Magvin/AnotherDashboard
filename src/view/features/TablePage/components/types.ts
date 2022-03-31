export type TOrder = EOrder.ASC | EOrder.DESC

export enum EOrder {
  ASC = "asc",
  DESC = "desc",
}
export interface IData {
  STATUS: string
  "APP TITLE & PUBLISHER": string
  "DAILY AVAILS": string
  "DATE ADDED": string
  "UPDATED ON": string
}

export enum EColumn {
  STATUS = "STATUS",
  "APP TITLE & PUBLISHER" = "APP TITLE & PUBLISHER",
  "DAILY AVAILS" = "DAILY AVAILS",
  "DATE ADDED" = "DATE ADDED",
  "UPDATED ON" = "UPDATED ON",
}
export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: TOrder
  orderBy: string
  rowCount: number
}

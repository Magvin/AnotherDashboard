export type TOrder = "asc" | "desc"
export interface IData {
  STATUS: string
  "APP TITLE & PUBLISHER": string
  "DAILY AVAILS": string
  "DATE ADDED": string
  "UPDATED ON": string
}
export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IData) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: TOrder
  orderBy: string
  rowCount: number
}

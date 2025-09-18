export const propsTableStyles = {
  propsTable: 'propsTable',
  tableHeader: 'tableHeader',
  tableCell: 'tableCell',
  propName: 'propName',
  propDescription: 'propDescription'
} as const;

export type PropsTableStylesType = typeof propsTableStyles;
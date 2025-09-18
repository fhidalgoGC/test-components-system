export const propsTableStyles = {
  propsTable: 'propsTable',
  tableHeader: 'tableHeader',
  tableCell: 'tableCell',
  propName: 'propName',
  propDescription: 'propDescription',
  propType: 'propType',
  propExample: 'propExample'
} as const;

export type PropsTableStylesType = typeof propsTableStyles;
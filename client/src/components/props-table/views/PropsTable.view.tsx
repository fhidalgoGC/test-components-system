import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PropsTableProps } from '../types/PropsTable.types';
import { usePropsTable } from '../hooks';
import { processProps } from '../utils/PropsTable.utils';
import styles from '../css/PropsTable.module.css';

export const PropsTableView: React.FC<PropsTableProps> = ({
  props,
  titleKey,
  descriptionKey,
  title,
  description,
  className = ""
}) => {
  const { t, displayTitle, displayDescription } = usePropsTable({
    props,
    titleKey,
    descriptionKey,
    title,
    description
  });

  const processedProps = processProps(props);

  if (!processedProps.length) {
    return null;
  }

  return (
    <Card className={className}>
      <CardContent className="p-0">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground">{displayTitle}</h3>
          <p className="text-sm text-muted-foreground">{displayDescription}</p>
        </div>
        <div className="p-6">
          <Table className={styles.propsTable}>
            <TableHeader>
              <TableRow className={styles.tableHeader}>
                <TableHead className={styles.tableCell}>
                  {t('propsTable.propName') || 'Property'}
                </TableHead>
                <TableHead className={styles.tableCell}>
                  {t('propsTable.propType') || 'Type'}
                </TableHead>
                <TableHead className={styles.tableCell}>
                  {t('propsTable.propDescription') || 'Description'}
                </TableHead>
                <TableHead className={styles.tableCell}>
                  {t('propsTable.propExample') || 'Example'}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedProps.map((prop, index) => (
                <TableRow key={`${prop.name}-${index}`}>
                  <TableCell className={`${styles.tableCell} ${styles.propName}`}>
                    {prop.name}
                  </TableCell>
                  <TableCell className={`${styles.tableCell} ${styles.propType}`}>
                    {prop.type}
                  </TableCell>
                  <TableCell className={`${styles.tableCell} ${styles.propDescription}`}>
                    {prop.description}
                  </TableCell>
                  <TableCell className={`${styles.tableCell} ${styles.propExample}`}>
                    {prop.example}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
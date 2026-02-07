import { useState } from "react";
import {
  BaseTable,
  useTableState,
} from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import { HeaderCell, TextCell } from "@/lib/ui-library/components/BaseTable/web/components";
import styles from "../css/BaseTableDemo.module.scss";

const allData = [
  { id: 1, product: "MacBook Pro 16\"", category: "Laptops", price: "$2,499", stock: 23 },
  { id: 2, product: "iPhone 15 Pro", category: "Phones", price: "$999", stock: 156 },
  { id: 3, product: "iPad Air M2", category: "Tablets", price: "$599", stock: 89 },
  { id: 4, product: "AirPods Pro 2", category: "Audio", price: "$249", stock: 312 },
  { id: 5, product: "Apple Watch Ultra", category: "Wearables", price: "$799", stock: 45 },
  { id: 6, product: "Mac Mini M2", category: "Desktops", price: "$599", stock: 67 },
  { id: 7, product: "HomePod Mini", category: "Audio", price: "$99", stock: 201 },
  { id: 8, product: "Magic Keyboard", category: "Accessories", price: "$299", stock: 134 },
  { id: 9, product: "Studio Display", category: "Monitors", price: "$1,599", stock: 12 },
  { id: 10, product: "AirTag 4-Pack", category: "Accessories", price: "$99", stock: 445 },
  { id: 11, product: "MacBook Air 15\"", category: "Laptops", price: "$1,299", stock: 78 },
  { id: 12, product: "iPhone 15", category: "Phones", price: "$799", stock: 234 },
];

const ITEMS_PER_PAGE = 5;

const columns: ColumnConfig[] = [
  {
    metadata: { columnId: "id", order: 0 },
    header: { cell: { render: <HeaderCell text="ID" />, horizontalAlign: "center" } },
    cell: {
      horizontalAlign: "center",
      render: (value: any) => <TextCell text={String(value)} />,
    },
    minWidth: 60,
    maxWidth: 80,
  },
  {
    metadata: { columnId: "product", order: 1 },
    header: { cell: { render: <HeaderCell text="Producto" /> } },
    cell: { render: (value: any) => <TextCell text={value} /> },
    minWidth: 180,
    maxWidth: "stretch",
  },
  {
    metadata: { columnId: "category", order: 2 },
    header: { cell: { render: <HeaderCell text="Categoria" />, horizontalAlign: "center" } },
    cell: {
      horizontalAlign: "center",
      render: (value: any) => <TextCell text={value} />,
    },
    minWidth: 120,
    maxWidth: "stretch",
  },
  {
    metadata: { columnId: "price", order: 3 },
    header: { cell: { render: <HeaderCell text="Precio" />, horizontalAlign: "right" } },
    cell: {
      horizontalAlign: "right",
      render: (value: any) => <TextCell text={value} />,
    },
    minWidth: 100,
    maxWidth: 140,
  },
  {
    metadata: { columnId: "stock", order: 4 },
    header: { cell: { render: <HeaderCell text="Stock" />, horizontalAlign: "center" } },
    cell: {
      horizontalAlign: "center",
      render: (value: any) => <TextCell text={String(value)} />,
    },
    minWidth: 80,
    maxWidth: 100,
  },
];

export function StretchDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageData = allData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE);

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>StretchDemo.tsx</div>
      <h2 className={styles.section__title}>8. Stretch Mode (Filas)</h2>
      <p className={styles.section__description}>
        Las filas se reparten el espacio vertical equitativamente segun <code>stretchCount</code>.
        La tabla mantiene un alto fijo y cada fila ocupa exactamente <code>100% / stretchCount</code> del body.
        Si hay menos datos que <code>stretchCount</code>, el espacio sobrante queda vacio.
      </p>

      <div className={styles.infoBox}>
        <span><strong>heightMode:</strong> 'stretch' — reparte el alto del body entre stretchCount filas</span>
        <span><strong>stretchCount:</strong> {ITEMS_PER_PAGE} — coincide con itemsPerPage para que cada pagina llene la tabla</span>
        <span><strong>layout.heightMode:</strong> 'fixed' con height: 350px — la tabla tiene un alto definido</span>
      </div>

      <div
        className={styles.demoBox}
        data-testid="demo-stretch-table"
        style={{ height: 350 }}
      >
        <BaseTable
          data={pageData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "full",
            },
            headersDefault: {
              dividers: true,
              cell: {
                verticalAlign: "middle",
              },
            },
            cellsDefault: {
              verticalAlign: "middle",
            },
            rowsDefault: {
              heightMode: "stretch",
              stretchCount: ITEMS_PER_PAGE,
              hoverable: true,
              dividers: true,
            },
          }}
        />
      </div>

      <div className={styles.controls}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={styles.controls}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: page === currentPage ? "2px solid #3b82f6" : "1px solid #d1d5db",
              background: page === currentPage ? "#3b82f6" : "#fff",
              color: page === currentPage ? "#fff" : "#374151",
              cursor: "pointer",
              fontWeight: page === currentPage ? 600 : 400,
              fontSize: "0.875rem",
            }}
            onClick={() => setCurrentPage(page)}
            data-testid={`btn-stretch-page-${page}`}
          >
            Pagina {page} ({page === totalPages ? allData.length - (page - 1) * ITEMS_PER_PAGE : ITEMS_PER_PAGE} filas)
          </button>
        ))}
      </div>
    </section>
  );
}

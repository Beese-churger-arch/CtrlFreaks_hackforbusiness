import { useTable } from 'react-table';
import React from 'react';
import { useAsync } from 'react-use';

export default function DynamicPricing() {
  const { value: data = [] } = useAsync(async () => {
    const response = await fetch('http://localhost:5000/pricing-data');
    return response.json();
  }, []);

  const columns = React.useMemo(() => [
    { Header: 'Product ID', accessor: 'product_id' },
    { Header: 'Our Price', accessor: 'current_price' },
    { Header: 'Competitor', accessor: 'competitor_price' },
    { Header: 'Demand', accessor: 'demand_score' },
    { Header: 'Stock', accessor: 'stock_level' },
    { Header: 'Trend', accessor: 'trend_score' },
    { Header: 'Last Sale', accessor: 'last_sale' }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div role="region" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading">Dynamic Pricing Analysis</h2>
      <table {...getTableProps()} className="accessible-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

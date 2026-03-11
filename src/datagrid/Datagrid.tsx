import { Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Button } from '@fluentui/react-components';
import { ArrowLeftRegular, ArrowRightRegular } from '@fluentui/react-icons';
import { countDocuments } from '../rest-client/AxiosInstance';
import { useEffect, useRef, useState } from 'react';
import { usePagination } from '../context/PaginationContext';
import AsyncTooltip from './AsyncTooltip';

interface DatagridDataProps {
  documents: Record<string, any>;
  itemsPerPage: number;
  sortColumn: string;
  sortDirection: 'ascending' | 'descending';
  onSortChange: (col: string, dir: 'ascending' | 'descending') => void;
}

export default function Datagrid({ documents, itemsPerPage, sortColumn, sortDirection, onSortChange }: DatagridDataProps) {
  const { currentPage, setCurrentPage } = usePagination();
  const [items, setItems] = useState(Object.values(documents.rows) as Record<string, []>[]);
  const [totalPages, setTotalPages] = useState(0);
  const tableRef = useRef<HTMLTableElement | null>(null);

  const columns = (Object.values(documents.columns) as string[]).map((key) => ({
    columnId: key,
  }));

  const handleHeaderClick = (colId: string) => {
    if (colId === sortColumn) {
      onSortChange(colId, sortDirection === 'ascending' ? 'descending' : 'ascending');
    } else {
      onSortChange(colId, 'ascending');
    }
  };

  useEffect(() => {
    countDocuments().then((totalDocuments) => {
      setTotalPages(Math.ceil(totalDocuments / itemsPerPage));
    });
  }, [itemsPerPage]);

  useEffect(() => {
    setItems(Object.values(documents.rows) as Record<string, []>[]);
  }, [documents]);

  return (
    <div className='table-container' style={{ overflow: 'auto' }}>
      <Table ref={tableRef} sortable>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHeaderCell
                sortable
                key={col.columnId}
                sortDirection={sortColumn === col.columnId ? sortDirection : undefined}
                onClick={() => handleHeaderClick(col.columnId)}
              >
                {col.columnId}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, rowIndex) => (
            <AsyncTooltip key={rowIndex} efta_number={`${item[1]}`}>
              <TableRow>
                {columns.map((col, colIndex) => 
                  
                  {if (col.columnId === 'extraction_timestamp') return <TableCell key={col.columnId}>{new Date(item[colIndex] as unknown as string).toLocaleString('en-US')}</TableCell>
                    else if (col.columnId === 'file_size') return <TableCell key={col.columnId}>{item[colIndex]} bytes</TableCell>
                    else return <TableCell key={col.columnId}>{item[colIndex]}</TableCell>
                  })
                  
                  }


              </TableRow>
            </AsyncTooltip>
          ))}
        </TableBody>
      </Table>

      <div className='flex-container'>
        <p className='page-info'>Page {currentPage} of {totalPages}</p>
        <div className='right-group'>
          <Button appearance='transparent' icon={<ArrowLeftRegular />} onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 0} />
          <Button appearance='transparent' icon={<ArrowRightRegular />} onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= totalPages - 1} />
        </div>
      </div>
    </div>
  );
}
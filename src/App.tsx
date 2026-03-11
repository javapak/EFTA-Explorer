import { useEffect, useState } from 'react'
import './App.css'
import api from './rest-client/AxiosInstance';
import { FluentProvider, Spinner, webDarkTheme } from '@fluentui/react-components'
import Datagrid from './datagrid/Datagrid';
import Navigation from './nav/Navigation';
import { PaginationProvider } from './context/PaginationContext';
import { NavProvider, type NavView } from './context/NavContext';
import ERFlow from './flows/ERFlow';

function App() {
  const [view, setView] = useState<NavView>('Table view');
  const [documents, setDocuments] = useState({});
  const [pages, setPages] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {

        const orderDir = sortDirection === 'ascending' ? 'ASC' : 'DESC';

        const sql = `SELECT id, efta_number, dataset, total_pages, extraction_timestamp, file_size
             FROM documents
             ORDER BY ${sortColumn} ${orderDir}
             LIMIT ${itemsPerPage} OFFSET ${currentPage * itemsPerPage};`;

        const [documentsResponse, pagesResponse] = await Promise.all([
          api.get('/jee/full_text_corpus.json', { params: { sql } }),
          api.get('/jee/full_text_corpus/pages.json')
        ]);

        setDocuments(documentsResponse.data);
        setPages(pagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, sortColumn, sortDirection]);

  useEffect(() => {
    if (Object.keys(documents).length > 0 && Object.keys(pages).length > 0) {
      setIsReady(true);
    }
  }, [documents, pages]);

  const handleSortChange = (col: string, dir: 'ascending' | 'descending') => {
    setSortColumn(col);
    setSortDirection(dir);
    setCurrentPage(0); // reset to first page on sort change
  };

  return (
    <FluentProvider theme={webDarkTheme}>
      {isReady ? (
        <NavProvider value={{ view, setView }}>
          <Navigation />
          <PaginationProvider value={{ currentPage, setCurrentPage }}>
            <div style={{ paddingLeft: '100px', paddingRight: '100px' }} />
            {view === 'Table view' && (
              <div className='data-grid'>
                <Datagrid
                  documents={documents}
                  itemsPerPage={itemsPerPage}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSortChange={handleSortChange}
                />
              </div>
            )}
          </PaginationProvider>
          {view === 'Entity-Relationship flow graph' && <ERFlow />}
        </NavProvider>
      ) : (
        <Spinner />
      )}
    </FluentProvider>
  );
}

export default App;
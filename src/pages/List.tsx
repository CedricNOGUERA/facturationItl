import React from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import HeaderList from "../components/list/HeaderList";
import DeleteModal from "../components/list/DeleteModal";
import FilterList from "../components/list/FilterList";
import ItemList from "../components/list/ItemList";
import { Spinner } from "react-bootstrap";
import TopTable from "../components/list/TopTable";

const List: React.FC = () => {


  
  const [invoicesData2, setInvoicesData2] = useOutletContext<any>();

  const [filteredInvoice, setFilteredInvoice] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sort, setSort] = React.useState<string>("createdAt");
  const [asc, setAsc] = React.useState<boolean>(false);
  const [startPagination, setStartPagination] = React.useState<number>(0);
  const [endPagination, setEndPagination] = React.useState<number>(3);
  
  
  const [isErrorSearch, setIsErrorSearch] = React.useState<string>("none");
  
  const [statusFilter, setStatusFilter] = React.useState<string>('');
  const [dateFilter, setDateFilter] = React.useState<string>('');


  React.useEffect(() => {
    getInvoices2()
  }, []);


  React.useEffect(() => {
    getInvoices2()
  }, [startPagination]);



  React.useEffect(() => {
      
    if(searchTerm === ""){
      getInvoices2()
      setFilteredInvoice([])
    }
    invoiceSearch()

   
  
    
    
  }, [searchTerm]);




  const getInvoices2 = async () => {
    let { data: invoices, error } = await supabase
      .from("invoices2")
      .select("*, detailBill(*)")
      .range(startPagination, endPagination)
      .order(sort, { ascending: asc });

    if (invoices) {
      setInvoicesData2(invoices)
      setIsLoading(false)
      setIsErrorSearch("none")
    }
    if (error) {
      console.log(error)
      setIsLoading(true)
    }
  };

  const nextPagination = () => {
    setStartPagination(startPagination + 4)
    setEndPagination(endPagination + 4)
    getInvoices2()
  }

  const previousPagination = () => {
    if(startPagination > 0)
    setStartPagination(startPagination - 4)
    setEndPagination(endPagination - 4)
    getInvoices2()
  }

  const pagination = (st: any, end: any) => {
    setStartPagination(st)
    setEndPagination(end)
    getInvoices2()
  }

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const invoiceSearch = () => {
    const escapedSearchOrder = escapeRegExp(searchTerm)

    if (escapedSearchOrder.length > 2) {
      setFilteredInvoice(
        invoicesData2.filter((bill: any) => {
          return (
            bill.name_customer?.match(new RegExp(escapedSearchOrder, 'i')) ||
            bill?.email_customer?.match(new RegExp(escapedSearchOrder, 'i'))
          )
        })
      )
    }
    return undefined
  }



const filterListProps = {searchTerm, setSearchTerm, invoiceSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter}
const topTableProps = {setAsc, setSort, getInvoices2, asc}

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='card' id='invoiceList'>
          <HeaderList />
          <FilterList filterListProps={filterListProps} />
          <div className='card-body'>
            <div>
              <div className='table-responsive table-card'>
                <table className='table align-middle table-nowrap' id='invoiceTable'>
                  <TopTable topTableProps={topTableProps} />
                  <tbody className='list form-check-all' id='invoice-list-data'>
                    {isLoading ? (
                      <tr>
                        <td colSpan={8} className='text-center'>
                          <Spinner animation='border' variant='secondary' />
                        </td>
                      </tr>
                    ) : filteredInvoice.length > 0 ? (
                      filteredInvoice?.map((bill: any) =>
                        !statusFilter || statusFilter === bill.status ? (
                          <ItemList key={Math.random()} bill={bill} />
                        ) : null
                      )
                    ) : filteredInvoice.length === 0 && searchTerm.length > 2 ? (
                      <tr>
                        <td colSpan={8} className='text-center'>
                          <div className='noresult' style={{ display: isErrorSearch }}>
                            <div className='text-center'>
                              <lord-icon
                                src='https://cdn.lordicon.com/msoeawqm.json'
                                trigger='loop'
                                colors='primary:#121331,secondary:#08a88a'
                                style={{ width: '75px', height: '75px' }}
                              ></lord-icon>
                              <h5 className='mt-2'>Désolé! Aucun résultat trouvé</h5>
                              <p className='text-muted mb-0'>
                                Nous avons consulter plus de 150 factures, nous n'avons pas
                                trouver de correspondance à votre recherche
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      invoicesData2?.map((bill: any) =>
                        !statusFilter || statusFilter === bill.status ? (
                          <ItemList key={Math.random()} bill={bill} />
                        ) : null
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-end mt-3'>
                <div className='pagination-wrap hstack gap-2'>
                  <span
                    className='page-item pagination-prev disabled m-auto'
                    onClick={previousPagination}
                  >
                    Précédent
                  </span>
                  <ul className='pagination listjs-pagination mb-0'>
                      {Array.from({ length: 
                    ((invoicesData2.length / 4)+1)
                    })?.map((list: any, indx: any) => (

                        <li key={Math.random()} onClick={() => pagination(indx*4, (indx*4)+3)} >
                      <span className='page-item pagination-prev disabled m-auto'>{indx+1}</span>
                    </li>
                      ))}
                 

                  </ul>
                  <span className='page-item pagination-next' onClick={nextPagination}>
                    Suivant
                  </span>
                </div>
              </div>
            </div>

            <div
              className='modal fade flip'
              id='deleteOrder'
              tabIndex={-1}
              aria-labelledby='deleteOrderLabel'
              aria-hidden='true'
            >
              <DeleteModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default List;

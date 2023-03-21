import React from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import HeaderList from "../../components/list/HeaderList";
import DeleteModal from "../../components/list/DeleteModal";
import FilterList from "../../components/list/FilterList";
import ItemList from "../../components/list/ItemList";
import { Spinner } from "react-bootstrap";
import TopTable from "../../components/list/TopTable";
import { _getDocById, _handleCancel } from "../../utils/function";

const List: React.FC = () => {
  
  const [invoicesData, setInvoicesData] = useOutletContext<any>();
  const [globalData, setGlobalData] = React.useState<any>([]);

  const [filteredInvoice, setFilteredInvoice] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sort, setSort] = React.useState<string>("createdAt");
  const [asc, setAsc] = React.useState<boolean>(false);
  const [startPagination, setStartPagination] = React.useState<number>(0);
  const [endPagination, setEndPagination] = React.useState<number>(9);
  
  const [statusFilter, setStatusFilter] = React.useState<string>('');
  const [dateFilter, setDateFilter] = React.useState<string>('');
  
  const [docId, setDocId] = React.useState<string>('');
  const [selectedData, setSelectedData] = React.useState<any>([]);
  



  React.useEffect(() => {
    getInvoices()
    getGlobalData()
  }, []);


  React.useEffect(() => {
    getInvoices()
  }, [startPagination]);



  React.useEffect(() => {
      
    if(searchTerm === "" && searchTerm.length === 0){
      setFilteredInvoice([])
      setStartPagination(0)
      setEndPagination(9)
    }
    
    if(searchTerm.length > 0){
      setStartPagination(0)
      setEndPagination(9)
      
    }
    invoiceSearch()
  
  }, [searchTerm]);


  React.useEffect(() => {
      
    if(dateFilter === ""){
      setFilteredInvoice([])
    }
    if(statusFilter === ""){
      setFilteredInvoice([])
    }
    invoiceSearch()
  }, [dateFilter, statusFilter]);





  const getGlobalData = async () => {
    let { data: invoices, error } = await supabase
      .from("invoices2")
      .select("*, detailBill(*)")

    if (invoices) {
      setGlobalData(invoices)
      setIsLoading(false)
    }
    if (error) {
      console.log(error)
      setIsLoading(true)
    }
  };

  const getInvoices = async () => {
    let { data: invoices, error } = await supabase
      .from("invoices2")
      .select("*, detailBill(*)")
      .range(startPagination, endPagination)
      .order(sort, { ascending: asc });

    if (invoices) {
      setInvoicesData(invoices)
      setIsLoading(false)
    }
    if (error) {
      console.log(error)
      setIsLoading(true)
    }
  };

  const nextPagination = () => {
    setStartPagination(startPagination + 10)
    setEndPagination(endPagination + 10)
  }

  const previousPagination = () => {
    if(startPagination > 1)
    setStartPagination(startPagination - 10)
    setEndPagination(endPagination - 10)
  }

  const pagination = (st: any, end: any) => {
    setStartPagination(st)
    setEndPagination(end)
  }

  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const invoiceSearch = () => {
    const escapedSearchOrder = escapeRegExp(searchTerm)
  
    if (escapedSearchOrder.length > 2) {
      setFilteredInvoice(
        globalData.filter((bill: any) => {
          return (
            bill.invoiceNum?.match(new RegExp(escapedSearchOrder, 'i')) ||
            bill.name_customer?.match(new RegExp(escapedSearchOrder, 'i')) ||
            bill?.email_customer?.match(new RegExp(escapedSearchOrder, 'i'))
          )
        })
      )
    }
    return undefined
  }
  
  const invoiceSearchByDate = () => {
    const escapedSearchOrder = escapeRegExp(dateFilter)

    if (escapedSearchOrder.length > 2) {
      setFilteredInvoice(
        globalData.filter((bill: any) => {
          return (
            bill.createdAt?.match(new RegExp(escapedSearchOrder, 'i')) 
          )
        })
      )
    }
    return undefined
  }





  const handleCancel = async(id: any) => {

    const { data, error } = await supabase
  .from('invoices2')
  .update({ status: 'Annulée' })
  .eq('id', id)

  
  if(!error){
    console.log('Facture annuléeeeee')
    getInvoices()
  }



  if(data){
    console.log('Facture annulée')
  }

  if(error){
    console.log(error)
  }


  }



const filterListProps = {searchTerm, setSearchTerm, invoiceSearch, invoiceSearchByDate, statusFilter, setStatusFilter, dateFilter, setDateFilter}
const topTableProps = {setAsc, setSort, getInvoices, asc}

  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='card' id='invoiceList'>
          <HeaderList title='facture' />
          <FilterList filterListProps={filterListProps} title='FACTURE' />
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
                          <ItemList key={Math.random()} bill={bill} setDocId={setDocId} title='FACTURE' _getDocById={_getDocById} setSelectedData={setSelectedData} />
                        ) : null
                      )
                      ) : (filteredInvoice.length === 0 && searchTerm.length > 2) || (filteredInvoice.length === 0 && dateFilter.length > 2) ? (
                        <tr>
                          <td colSpan={8} className='text-center'>
                            <div className='noresult' style={{ display: "block" }}>
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
                        invoicesData?.map((bill: any) =>
                          !statusFilter || statusFilter === bill.status ? (
                            <ItemList key={Math.random()} bill={bill} setDocId={setDocId} _getDocById={_getDocById} setSelectedData={setSelectedData} title='FACTURE' />
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
                        ((globalData.length / 10)  +1)
                    })?.map((list: any, indx: any) => (

                        <li key={Math.random()} onClick={() => pagination(indx*10, (indx*10)+9)} >
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
              <DeleteModal deleteDocId={docId} handleCancel={handleCancel}  trigger='FACTURE' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default List;

import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'
import HeaderList from '../../components/list/HeaderList'
import DeleteModal from '../../components/list/DeleteModal'
import FilterList from '../../components/list/FilterList'
import ItemList from '../../components/list/ItemList'
import { Spinner } from 'react-bootstrap'
import TopTable from '../../components/list/TopTable'
import { _escapeRegExp, _getDocById, _getGlobalData, _handleCancel } from '../../utils/function'
import { _nextPagination, _pagination, _previousPagination } from '../../utils/pagination'

const List: React.FC = () => {
  const [invoicesData, setInvoicesData] = useOutletContext<any>()
  const [globalData, setGlobalData] = React.useState<any>([])

  const [filteredInvoice, setFilteredInvoice] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const [searchTerm, setSearchTerm] = React.useState('')
  const [sort, setSort] = React.useState<string>('createdAt')
  const [asc, setAsc] = React.useState<boolean>(false)
  const [startPagination, setStartPagination] = React.useState<number>(0)
  const [endPagination, setEndPagination] = React.useState<number>(9)

  const [statusFilter, setStatusFilter] = React.useState<string>('')
  const [dateFilter, setDateFilter] = React.useState<string>('')

  const [docId, setDocId] = React.useState<string>('')
  const [selectedData, setSelectedData] = React.useState<any>([])
  const [checkedState, setCheckedState] = React.useState<any>(new Array(globalData.length).fill(false));
  const [allCheckedState, setAllCheckedState] = React.useState<boolean>(false);

  React.useEffect(() => {
    getInvoices()
    _getGlobalData('invoices2', '*, detailBill(*)', setGlobalData )
    // setCheckedState(new Array(globalData.length).fill(false))
  }, [])

  React.useEffect(() => {

    setCheckedState(new Array(globalData.length).fill(false))
  }, [globalData])


  React.useEffect(() => {
    getInvoices()
  }, [startPagination])

  React.useEffect(() => {
    if (searchTerm === '' && searchTerm.length === 0) {
      setFilteredInvoice([])
      setStartPagination(0)
      setEndPagination(9)
    }

    if (searchTerm.length > 0) {
      setStartPagination(0)
      setEndPagination(9)
    }
 
    if (statusFilter === '') {
      setFilteredInvoice([])
    }
    invoiceSearch()
  }, [searchTerm, statusFilter])

  React.useEffect(() => {
      
    if(dateFilter === ""){
      getInvoices()
      setFilteredInvoice([])
    }
    invoiceSearchByDate()
  }, [dateFilter]);



  
  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item: any, index: any) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  const handleOnChangeAll = () => {
    setCheckedState(new Array(globalData.length).fill(!allCheckedState))
  };

  const getInvoices = async () => {
    let { data: invoices, error } = await supabase
      .from('invoices2')
      .select('*, detailBill(*)')
      .range(startPagination, endPagination)
      .order(sort, { ascending: asc })

    if (invoices) {
      setInvoicesData(invoices)
      setIsLoading(false)
    }
    if (error) {
      console.log(error)
      setIsLoading(true)
    }
  }

  const invoiceSearch = () => {
    const escapedSearchOrder = _escapeRegExp(searchTerm)

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
    const escapedSearchOrder = _escapeRegExp(dateFilter)

    if (escapedSearchOrder.length > 1) {
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

  const handleCancel = async (id: any) => {
    const { data, error } = await supabase
      .from('invoices2')
      .update({ status: 'Annulée' })
      .eq('id', id)

    if (!error) {
      console.log('Facture annulée')
      getInvoices()
    }

    if (error) {
      console.log(error)
    }
  }

  const filterListProps = {
    searchTerm,
    setSearchTerm,
    invoiceSearch,
    invoiceSearchByDate,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
  }

  const topTableProps = { setAsc, setSort, getInvoices, asc, allCheckedState, setAllCheckedState, handleOnChangeAll }

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
                      filteredInvoice?.map((bill: any, index: any) =>
                        !statusFilter || statusFilter === bill.status ? (
                          <ItemList
                            key={Math.random()}
                            bill={bill}
                            setDocId={setDocId}
                            title='FACTURE'
                            _getDocById={_getDocById}
                            setSelectedData={setSelectedData}
                            handleOnChange={handleOnChange} 
                            checkedState={checkedState}
                            index={index}
                          />
                        ) : null
                      )
                    ) : (filteredInvoice.length === 0 && searchTerm.length > 2) ||
                      (filteredInvoice.length === 0 && dateFilter.length > 2) ? (
                      <tr>
                        <td colSpan={8} className='text-center'>
                          <div className='noresult' style={{ display: 'block' }}>
                            <div className='text-center'>
                              <lord-icon
                                src='https://cdn.lordicon.com/msoeawqm.json'
                                trigger='loop'
                                colors='primary:#121331,secondary:#08a88a'
                                style={{ width: '175px', height: '75px' }}
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
                      invoicesData?.map((bill: any, index: any) =>
                        !statusFilter || statusFilter === bill.status ? (
                          <ItemList
                            key={Math.random()}
                            bill={bill}
                            setDocId={setDocId}
                            _getDocById={_getDocById}
                            setSelectedData={setSelectedData}
                            title='FACTURE'
                            handleOnChange={handleOnChange} 
                            checkedState={checkedState}
                            index={index}
                          />
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
                    onClick={() => _previousPagination(startPagination, setStartPagination, endPagination, setEndPagination)}

                  >
                    Précédent
                  </span>
                  <ul className='pagination listjs-pagination mb-0'>
                    {Array.from({ length: globalData.length / 10 + 1 })?.map(
                      (list: any, indx: any) => (
                        <li
                          key={Math.random()}
                          onClick={() => _pagination(indx * 10, indx * 10 + 9, setStartPagination, setEndPagination)}
                        >
                          <span className='page-item pagination-prev disabled m-auto'>
                            {indx + 1}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                  {globalData.length > 10 ? (
                    <span className='page-item pagination-next' onClick={() => _nextPagination(startPagination, setStartPagination, endPagination, setEndPagination)}>

                      Suivant
                    </span>
                  ) : (
                    <span className='page-item pagination-next disabled'>Suivant</span>
                  )}
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
              <DeleteModal deleteDocId={selectedData.id} handleCancel={handleCancel} trigger='FACTURE' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List

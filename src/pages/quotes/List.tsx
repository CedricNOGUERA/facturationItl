import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { supabase } from '../../utils/supabaseClient'
import HeaderList from '../../components/list/HeaderList'
import FilterList from '../../components/list/FilterList'
import ItemList from '../../components/list/ItemList'
import TopTable from '../../components/quotes/list/TopTable'
import DeleteModal from '../../components/list/DeleteModal'
import ValidateModal from '../../components/quotes/ValidateModal'
import {
  _escapeRegExp,
  _getDocById,
  _getGlobalData,
  _getTotalTva,
  _htAmount,
} from '../../utils/function'
import { v4 as uuidv4 } from 'uuid'
import { notification } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { _nextPagination, _pagination, _previousPagination } from '../../utils/pagination'

const List: React.FC = () => {
  const navigate = useNavigate()
  const [quoteData, setQuoteData] = useOutletContext<any>()
  const [globalData, setGlobalData] = React.useState<any>([])

  const [filteredInvoice, setFilteredInvoice] = React.useState<any>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const [searchTerm, setSearchTerm] = React.useState('')
  const [sort, setSort] = React.useState<string>('createdAt')
  const [asc, setAsc] = React.useState<boolean>(false)
  const [startPagination, setStartPagination] = React.useState<number>(0)
  const [endPagination, setEndPagination] = React.useState<number>(10)

  const [statusFilter, setStatusFilter] = React.useState<string>('')
  const [dateFilter, setDateFilter] = React.useState<string>('')

  const [docId, setDocId] = React.useState<string>('')
  const [selectedData, setSelectedData] = React.useState<any>([])
  const [checkedState, setCheckedState] = React.useState<any>(
    new Array(globalData.length).fill(false)
  )
  const [allCheckedState, setAllCheckedState] = React.useState<boolean>(false)

  /////////////// succes notification ////////////////

  const [api, contextHolder] = notification.useNotification()
  const openNotification = () => {
    api.open({
      message: 'Félicitation',
      description: 'Votre facture est enregistrée.',
      icon: <CheckCircleTwoTone twoToneColor='#52c41a' />,
    })
  }

  React.useEffect(() => {
    _getGlobalData('quotes', '*, detailQuote(*)', setGlobalData)
    getQuotes()
  }, [])

  React.useEffect(() => {
    setCheckedState(new Array(globalData.length).fill(false))
  }, [globalData])

  React.useEffect(() => {
    getQuotes()
  }, [startPagination])

  React.useEffect(() => {
    if (searchTerm === '') {
      getQuotes()
      setFilteredInvoice([])
    }
    invoiceSearch()
  }, [searchTerm])

  React.useEffect(() => {
    if (dateFilter === '') {
      getQuotes()
      setFilteredInvoice([])
    }
  }, [dateFilter])

  const amountHT = _htAmount(selectedData?.detailQuote)
  const totalTva_13 = _getTotalTva(selectedData?.detailQuote, 0.13)
  const totalTva_16 = _getTotalTva(selectedData?.detailQuote, 0.16)

  const handleOnChange = (position: any) => {
    const updatedCheckedState = checkedState.map((item: any, index: any) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const handleOnChangeAll = () => {
    setCheckedState(new Array(globalData.length).fill(!allCheckedState))
  }

  const getQuotes = async () => {
    let { data: invoices, error } = await supabase
      .from('quotes')
      .select('*, detailQuote(*)')
      .range(startPagination, endPagination)
      .order(sort, { ascending: asc })

    if (invoices) {
      setQuoteData(invoices)
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

    if (escapedSearchOrder.length > 2) {
      setFilteredInvoice(
        globalData.filter((bill: any) => {
          return bill.createdAt?.match(new RegExp(escapedSearchOrder, 'i'))
        })
      )
    }
    return undefined
  }

  const handleCancel = async (id: any) => {
    const { data, error } = await supabase
      .from('quotes')
      .update({ status: 'Annulé' })
      .eq('id', id)

    if (!error) {
      console.log('Devis annulé')
      getQuotes()
    }

    if (data) {
      console.log('Devis annulé')
    }

    if (error) {
      console.log(error)
    }
  }

  const handleValidate = async (id: any) => {
    const { data, error } = await supabase
      .from('quotes')
      .update({ status: 'Validé' })
      .eq('id', id)

    if (!error) {
      console.log('Devis validé')
      getQuotes()

      const invoiceId: any = uuidv4()

      const { data: dataz, error: errorz } = await supabase.from('invoices2').insert([
        {
          id: invoiceId,
          invoiceNum: selectedData?.invoiceNum,
          createdAt: selectedData?.createdAt,
          status: 'Impayée',
          name_customer: selectedData?.name_customer,
          email_customer: selectedData?.email_customer,
          customer_info: {
            name: selectedData?.customer_info.name,
            email: selectedData?.customer_info.email,
            phone: selectedData?.customer_info.phone,
            avatar: selectedData?.customer_info.avatar,
            address: selectedData?.customer_info.address,
          },

          amount_ht: selectedData?.amount_ht,
          amount_ttc: parseInt(
            (amountHT + totalTva_13 + totalTva_16 + amountHT * 0.01).toFixed(2)
          ),
        },
      ])
      if (dataz) {
        console.log(dataz)
      }

      if (errorz) {
        console.log(errorz)
      } else {
        const promises = selectedData?.detailQuote?.map((prod: any, indx: any) => {
          return supabase.from('detailBill').insert([
            {
              designation: prod.designation,
              detailDesignation: prod.detailDesignation,
              qty: prod.qty,
              price: prod.price,
              amount_ttc: parseInt((prod.qty * prod.price * (1 + prod.tva + 0.01)).toFixed(2)),
              amount_ht: prod.qty * prod.price,
              invoice_id: invoiceId,
              tva: prod.tva,
            },
          ])
        })

        try {
          await Promise.all(promises)
          console.log('good aussi')

          openNotification()

          setTimeout(() => {
            navigate('/list-devis')
          }, 2500)
        } catch (error) {
          console.log(error)
        }
      }
    }

    if (data) {
      console.log('Devis validé')
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
  const topTableProps = {
    setAsc,
    setSort,
    getQuotes,
    asc,
    allCheckedState,
    setAllCheckedState,
    handleOnChangeAll,
  }

  return (
    <div className='row'>
      {contextHolder}
      <div className='col-lg-12'>
        <div className='card' id='invoiceList'>
          <HeaderList title='devis' />
          <FilterList filterListProps={filterListProps} title='DEVIS' />
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
                            _getDocById={_getDocById}
                            setSelectedData={setSelectedData}
                            title='DEVIS'
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
                      quoteData?.map((bill: any, index: any) =>
                        !statusFilter || statusFilter === bill.status ? (
                          <ItemList
                            key={Math.random()}
                            bill={bill}
                            setDocId={setDocId}
                            _getDocById={_getDocById}
                            setSelectedData={setSelectedData}
                            title='DEVIS'
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
                    onClick={() =>
                      _previousPagination(
                        startPagination,
                        setStartPagination,
                        endPagination,
                        setEndPagination
                      )
                    }
                  >
                    Précédent
                  </span>
                  <ul className='pagination listjs-pagination mb-0'>
                    {Array.from({ length: globalData.length / 10 + 1 })?.map(
                      (list: any, indx: any) => (
                        <li
                          key={Math.random()}
                          onClick={() =>
                            _pagination(
                              indx * 10,
                              indx * 10 + 9,
                              setStartPagination,
                              setEndPagination
                            )
                          }
                        >
                          <span className='page-item pagination-prev disabled m-auto'>
                            {indx + 1}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                  {globalData.length > 10 ? (
                    <span
                      className='page-item pagination-next'
                      onClick={() =>
                        _nextPagination(
                          startPagination,
                          setStartPagination,
                          endPagination,
                          setEndPagination
                        )
                      }
                    >
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
              <DeleteModal deleteDocId={docId} handleCancel={handleCancel} trigger='DEVIS' />
            </div>
            <div className='modal fade flip' id='validate' tabIndex={-1} aria-hidden='true'>
              <ValidateModal
                validateDocId={docId}
                handleValidate={handleValidate}
                trigger='DEVIS'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List

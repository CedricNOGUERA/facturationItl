import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import { useParams } from 'react-router-dom'
import BottomTable from '../../components/detail/BottomTableDetail'
import ButtonTable from '../../components/detail/ButtonTableDetail'
import HeaderDetail from '../../components/detail/HeaderDetail'
import ProductItemDetail from '../../components/detail/ProductItemDetail'
import { supabase } from '../../utils/supabaseClient'

const Detail = () => {
  const [filteredInvoice, setFilteredInvoice] = React.useState<any>()
  const componentRef: any = useRef();

  const params = useParams()

  React.useEffect(() => {
    getInvoiceById()
  }, [])

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });

  const getInvoiceById = async () => {
    let { data: invoices2, error } = await supabase
      .from('invoices2')
      .select('*, detailBill(*)')
      .eq('id', params.id)
      .single()

    if (invoices2) {
      setFilteredInvoice(invoices2)
    }
    if(error){
      console.log(error)
    }
  }

  const htAmount = filteredInvoice?.detailBill?.reduce(
    (acc: any, current: any) => acc + current.price * current.qty,
    0
  )

  const totalTva_13 = filteredInvoice?.detailBill
    ?.filter((bill: any) => bill.tva === 0.13)
    ?.reduce((acc: any, current: any) => acc + current.price * current.tva, 0)
  const totalTva_16 = filteredInvoice?.detailBill
    ?.filter((bill: any) => bill.tva === 0.16)
    ?.reduce((acc: any, current: any) => acc + current.price * current.tva, 0)

  return (
    <div className='row justify-content-center'>
      <div className='col-xxl-9 '>
        <div className='card ' id='demo' ref={componentRef}>
          <div className='row '>
            <HeaderDetail filteredInvoice={filteredInvoice} />
            <div className='col-lg-12'>
              <div className='card-body px-4'>
                <div className='table-responsive'>
                  <table className='table  table-striped table-borderless text-center table-nowrap align-middle mb-0' >
                    <thead>
                      <tr className='table-active'>
                        <th scope='col' style={{ width: '50px' }}>
                          #
                        </th>
                        <th scope='col'>Désignations</th>
                        <th scope='col'>Tva</th>
                        <th scope='col'>Prix</th>
                        <th scope='col'>Quantité</th>
                        <th scope='col'>Montant Tva</th>
                        <th scope='col' className='text-end'>
                          Montant HT
                        </th>
                      </tr>
                    </thead>
                    <tbody id='products-list'>
                      {filteredInvoice?.detailBill?.map((prod: any, indx: any) => (
                        <ProductItemDetail key={prod.id} prod={prod} indx={indx} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <BottomTable
                  htAmount={htAmount}
                  totalTva_13={totalTva_13}
                  totalTva_16={totalTva_16}
                />
                <ButtonTable handlePrint={handlePrint} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

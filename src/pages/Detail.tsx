import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import BottomTable from '../components/detail/BottomTableDetail'
import ButtonTable from '../components/detail/ButtonTableDetail'
import HeaderDetail from '../components/detail/HeaderDetail'
import ProductItemDetail from '../components/detail/ProductItemDetail'
import { supabase } from '../utils/supabaseClient'

const Detail = () => {
  const [invoicesData] = useOutletContext<any>()
  const [filteredInvoice, setFilteredInvoice] = React.useState<any>();


  const params = useParams()




  React.useEffect(() => {
    
  
    getInvoiceById()
  }, []);


  const getInvoiceById = async() => {

    
let { data: invoices2, error } = await supabase
.from('invoices2')
.select('*, detailBill(*)')
.eq('id', params.id)
.single()

if(invoices2){
  setFilteredInvoice(invoices2)
console.log(invoices2)
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
    <div className='row justify-content-center pt-0'>
      <div className='col-xxl-9 '>
        <div className='card d-print-bloc' id='demo'>
          <div className='row'>
            <HeaderDetail filteredInvoice={filteredInvoice} />
            <div className='col-lg-12'>
              <div className='card-body px-4'>
                <div className='table-responsive'>
                  <table className='table table-borderless text-center table-nowrap align-middle mb-0'>
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
                        // <ProductItemDetail prod={prod} indx={indx} />
                        <tr key={prod.id}>
                        <th scope="row">{indx + 1}</th>
                        <td className="text-start">
                          <span className="fw-medium">
                            {prod.designation}
                          </span>
                          <p className="text-muted mb-0">
                            {prod.detailDesignation}
                          </p>
                        </td>
                        <td>{prod.tva *100} %</td>
                        <td>{prod.price}</td>
                        <td>{prod.qty}</td>
                        <td>{prod.price * prod.tva}</td>
                        <td className="text-end">
                          {prod.price * prod.qty}
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <BottomTable
                  htAmount={htAmount}
                  totalTva_13={totalTva_13}
                  totalTva_16={totalTva_16}
                />
                <ButtonTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Detail

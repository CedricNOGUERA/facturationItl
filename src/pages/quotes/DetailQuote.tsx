import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams } from 'react-router-dom'
import BottomTable from '../../components/detail/BottomTableDetail'
import ButtonTable from '../../components/detail/ButtonTableDetail'
import HeaderDetail from '../../components/detail/HeaderDetail'
import ProductItemDetail from '../../components/detail/ProductItemDetail'
import { _getQuoteById } from '../../utils/quotes/function';
import { _getTotalTva, _htAmount } from '../../utils/function';
import { Button, Modal } from 'react-bootstrap';
import QrCode from '../../components/ui/QrCode';

const DetailQuote = () => {


///////States//////////

  const [filteredQuote, setFilteredInvoice] = React.useState<any>()
  const componentRef: any = useRef();
  const params = useParams()

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


//////useEffect/////////

  React.useEffect(() => {
    _getQuoteById(params.id, setFilteredInvoice)
  }, [params.id])


//////Events/////////


  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });



  return (
    <div className='row justify-content-center'>
      <div className='col-xxl-9 '>
        <div className='card ' id='demo' ref={componentRef}>
          <div className='row '>
            <HeaderDetail filteredInvoice={filteredQuote} title='DEVIS' />
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
                      {filteredQuote?.detailQuote?.map((prod: any, indx: any) => (
                        <ProductItemDetail key={prod.id} prod={prod} indx={indx} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <BottomTable
                  htAmount={_htAmount(filteredQuote?.detailQuote)}
                  totalTva_13={_getTotalTva(filteredQuote?.detailQuote, 0.13)}
                  totalTva_16={_getTotalTva(filteredQuote?.detailQuote, 0.16)}
                />
                <ButtonTable handlePrint={handlePrint} handleShow={handleShow} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body className='w-75 p-5 m-auto'>

         <QrCode orderNum={'http://localhost:3000/bfc48f44-4cdb-4fbb-858a-3eca595fc8a3/devis'} />
        </Modal.Body>
        <Modal.Footer>
     
          <Button variant="primary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DetailQuote

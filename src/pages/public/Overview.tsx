import React, { useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import BottomTable from '../../components/detail/BottomTableDetail';
import ButtonTableDetail from '../../components/detail/ButtonTableDetail';
import HeaderDetail from '../../components/detail/HeaderDetail';
import ProductItemDetail from '../../components/detail/ProductItemDetail';
import PrintModal from '../../components/ui/PrintModal';
import TableTopDetail from '../../components/ui/TableTopDetail';
import { _getTotalTva, _htAmount } from '../../utils/function';
import { _getInvoiceById, _getQuoteById } from '../../utils/quotes/function';

const Overview = () => {

    ///////States//////////

  const [filteredData, setFilteredData] = React.useState<any>()
  const componentRef: any = useRef();
  const params = useParams()
  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });
  const dataFile = params.name === 'devis' ? filteredData?.detailQuote :  filteredData?.detailBill


  const [showPrintModal, setShowPrintModal] = React.useState(false);

  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowPrintModal = () => setShowPrintModal(true);





    //////useEffect/////////

  React.useEffect(() => {
    if(params.name === 'devis'){

        _getQuoteById(params.id, setFilteredData)
    }
    if(params.name === 'facture'){

        _getInvoiceById(params.id, setFilteredData)
    }
  }, [params.id, params.name])



//////Events/////////


  return (
    <div className='row justify-content-center my-lg-5 px-lg-5 my-md-3 px-md-3 px-xs-5 m-auto'>
      <div className='col-xxl-9 col-xs-12 '>
        <div className='card ' id='demo' ref={componentRef}>
          <div className='row '>
            <HeaderDetail
              filteredInvoice={filteredData}
              title={params?.name}
              overview={true}
            />
            <div className='col-lg-12'>
              <div className='card-body px-4'>
                <div className='table-responsive'>
                  <table className='table  table-striped table-borderless text-center table-nowrap align-middle mb-0'>
                  <TableTopDetail />
                    <tbody id='products-list'>
                      {dataFile?.map((prod: any, indx: any) => (
                        <ProductItemDetail key={prod.id} prod={prod} indx={indx} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <BottomTable
                  htAmount={_htAmount(dataFile)}
                  totalTva_13={_getTotalTva(dataFile, 0.13)}
                  totalTva_16={_getTotalTva(dataFile, 0.16)}
                />
                <ButtonTableDetail handlePrint={handleShowPrintModal} handleShow='' handleShowSendModal=''
                  docId={dataFile?.id}
                
                title='overview' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrintModal show={showPrintModal} handleClose={handleClosePrintModal}
                  handlePrint={handlePrint}
                  />

    </div>
  )
}

export default Overview

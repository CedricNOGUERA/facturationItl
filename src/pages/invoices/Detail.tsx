import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useParams, useNavigate } from 'react-router-dom'
import BottomTable from '../../components/detail/BottomTableDetail'
import ButtonTable from '../../components/detail/ButtonTableDetail'
import HeaderDetail from '../../components/detail/HeaderDetail'
import ProductItemDetail from '../../components/detail/ProductItemDetail'
import { supabase } from '../../utils/supabaseClient'
import QrCodeModal from '../../components/list/QrCodeModal';
import { _getTotalTva, _htAmount } from '../../utils/function';
import emailjs from '@emailjs/browser';
import SendEmailModal from '../../components/ui/SendEmailModal';
import TableTopDetail from '../../components/ui/TableTopDetail';
import PrintModal from '../../components/ui/PrintModal';


const Detail = () => {

  const [filteredInvoice, setFilteredInvoice] = React.useState<any>()
  const [isMail, setIsMail] = React.useState<boolean>(false)



  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showSendModal, setShowSendModal] = React.useState(false);

  const handleCloseSendModal = () => setShowSendModal(false);
  const handleShowSendModal = () => setShowSendModal(true);

  const [showPrintModal, setShowPrintModal] = React.useState(false);

  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowPrintModal = () => setShowPrintModal(true);

  const componentRef: any = useRef();


  const params = useParams()

  const navigate = useNavigate()

  

  const numInvoice = filteredInvoice?.invoiceNum
  const qrData = `${params.id}`
  const form: any = useRef();



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

  const sendEmail = (e: any) => {
    e.preventDefault();
    console.log(form?.current.doc_type.value)

    setIsMail(true)
    // _popUpMail()
    
   
    emailjs.sendForm('invoiceitl_service', 'template_pnr0mid', form?.current, 'GivYhKQYsq1vBus6G')
      .then((result) => {
          console.log(form?.current?.invoice_id.value);
          handleClose()
          setIsMail(false)
          navigate('/')
    //       setIsMailOk(true)
         
        }, (error) => {
          console.log(error.text);
          alert(error.text)
          setIsMail(false)
        });
    //     setIsMailOk(false)

  };

  return (
    <div className='row justify-content-center'>
      <div className='col-xxl-9 '>
        <div className='card ' id='demo' ref={componentRef}>
          <div className='row '>
            <HeaderDetail filteredInvoice={filteredInvoice} title='facture' overview={false} />
            <div className='col-lg-12'>
              <div className='card-body px-4'>
                <div className='table-responsive'>
                  <table className='table  table-striped table-borderless text-center table-nowrap align-middle mb-0'>
                  <TableTopDetail />
                    <tbody id='products-list'>
                      {filteredInvoice?.detailBill?.map((prod: any, indx: any) => (
                        <ProductItemDetail key={prod.id} prod={prod} indx={indx} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <BottomTable
                  htAmount={_htAmount(filteredInvoice?.detailBill)}
                  totalTva_13={_getTotalTva(filteredInvoice?.detailBill, 0.13)}
                  totalTva_16={_getTotalTva(filteredInvoice?.detailBill, 0.16)}
                />
                <ButtonTable
                  handlePrint={handleShowPrintModal}
                  handleShow={handleShow}
                  handleShowSendModal={handleShowSendModal}
                  title='facture'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrintModal show={showPrintModal} handleClose={handleClosePrintModal}
                  handlePrint={handlePrint}
                  />

      <SendEmailModal
        showSendModal={showSendModal}
        handleCloseSendModal={handleCloseSendModal}
        form={form}
        sendEmail={sendEmail}
        filteredData={filteredInvoice}
        isMail={isMail}
        docType={'facture'}
      />
      <QrCodeModal
        title='Facture'
        numDoc={numInvoice}
        qrData={qrData}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  )
}

export default Detail

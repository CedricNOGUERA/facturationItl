import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useParams, useNavigate } from 'react-router-dom'
import BottomTable from '../../components/detail/BottomTableDetail'
import ButtonTable from '../../components/detail/ButtonTableDetail'
import HeaderDetail from '../../components/detail/HeaderDetail'
import ProductItemDetail from '../../components/detail/ProductItemDetail'
import { _getQuoteById } from '../../utils/quotes/function'
import { _getTotalTva, _htAmount } from '../../utils/function'
import QrCodeModal from '../../components/list/QrCodeModal'
import SendEmailModal from '../../components/ui/SendEmailModal'
import emailjs from '@emailjs/browser'
import TableTopDetail from '../../components/ui/TableTopDetail'
import PrintModal from '../../components/ui/PrintModal'
import {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas'

const DetailQuote = () => {
  ///////States//////////

  const componentRef: any = useRef()
  const form: any = useRef()
  const params = useParams()
  const navigate = useNavigate()
  
  const [filteredQuote, setFilteredQuote] = React.useState<any>()
  const [isMail, setIsMail] = React.useState<boolean>(false)
  const [canvasss, setCanvasss] = React.useState<any>()


  const [show, setShow] = React.useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showSendModal, setShowSendModal] = React.useState(false)
  const handleCloseSendModal = () => setShowSendModal(false)
  const handleShowSendModal = () => setShowSendModal(true)

  const [showPrintModal, setShowPrintModal] = React.useState(false);
  const handleClosePrintModal = () => setShowPrintModal(false);
  const handleShowPrintModal = () => setShowPrintModal(true);

  const numQuote = filteredQuote?.invoiceNum
  const qrData = `${params.id}`



  
  //////useEffect/////////

  React.useEffect(() => {
    _getQuoteById(params.id, setFilteredQuote)
  }, [params.id])


  // React.useEffect(() => {
  //   setCanvasss(html2canvas(componentRef?.current).then((canvas: any) => {
  //     document.body.appendChild(canvas)
  // }))
  // }, [componentRef])


  //////Events/////////

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  })

  const sendEmail = (e: any) => {
    e.preventDefault()
    console.log(form?.current.doc_type.value)

    setIsMail(true)
    // _popUpMail()

    emailjs
      .sendForm('invoiceitl_service', 'template_pnr0mid', form?.current, 'GivYhKQYsq1vBus6G')
      .then(
        (result) => {
          console.log(form?.current?.invoice_id.value)
          handleClose()
          setIsMail(false)
          navigate('/list-devis')
        },
        (error) => {
          console.log(error.text)
          alert(error.text)
          setIsMail(false)
        }
      )
    //     setIsMailOk(false)
  }



//   const canvass: any = html2canvas(componentRef).then((canvas: any) => {
//     document.body.appendChild(canvas)
// });

// const element = document.getElementById('demo');
// if (element instanceof HTMLElement) {

// setCanvasss(html2canvas(componentRef?.current).then((canvas: any) => {
//     document.body.appendChild(canvas)
// }))
// }

  // const htmlToPdf = () => {
  //   doc.text("<p>Hello</p>",10, 10)
  //    doc.save('pdf_name')
    
  //   };
  

  // const htmlToPdf = () => {
    // doc.html(element, {
    //   async callback(doc) {
    //     await doc.save('pdf_name');
    //   },
    // });
  // }


  const htmlToPdf = () => {
    const doc = new jsPDF("p", "pt", "a4")
    doc.html(componentRef?.current, {
      async callback(doc) {
        await doc.save('pdf_name');
      },
    });
  }
  

  return (
    <div className='row justify-content-center general-font'>
      <div className='col-xxl-9 '>
        <div className='card ' id='demo' ref={componentRef}>
          <div className='row '>
            <HeaderDetail filteredInvoice={filteredQuote} title='DEVIS' overview={false} />
            <div className='col-lg-12'>
              <div className='card-body px-4'>
                <div className='table-responsive'>
                  <table className='table  table-striped table-borderless text-center table-nowrap align-middle mb-0'>
                  <TableTopDetail />
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
                <ButtonTable
                  handlePrint={handleShowPrintModal}
                  htmlToPdf={htmlToPdf}
                  handleShow={handleShow}
                  handleShowSendModal={handleShowSendModal}
                  docId={filteredQuote?.id}
                  title='devis'
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
        filteredData={filteredQuote}
        isMail={isMail}
        docType={'devis'}
      />

      <QrCodeModal
        title={'devis'}
        numDoc={numQuote}
        qrData={qrData}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  )
}

export default DetailQuote

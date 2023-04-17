import React from 'react'
import BankAccountData from '../ui/BankAccountData'
import { Col, Row } from 'react-bootstrap'

interface bottomTableProps {
  htAmount: any
  totalTva_13: any
  totalTva_16: number
}

const BottomTable: React.FC<bottomTableProps> = ({ htAmount, totalTva_13, totalTva_16 }) => {
  const numStr = (a: any, b: any) => {
    a = '' + a;
    b = b || ' ';
    var c = '',
        d = 0;
    while (a.match(/^0[0-9]/)) {
      a = a.substr(1);
    }
    for (var i = a.length-1; i >= 0; i--) {
      c = (d !== 0 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
      d++;
    }
    return c;
  };
  return (
    <>
      <div className='row bottom-doc border-top border-top-dashed mt- mb-4 '>
        <div className='col-md-6 col-sm-12 pt-5'>
         <BankAccountData />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <table
            className='general-font table table-borderless table-nowrap table-sm align-middle mb-0 ms-auto'
            style={{ width: '250px' }}
          >
            <tbody>
              <tr className=''>
                <td>Total HT</td>
                <td className='text-end'>{new Intl.NumberFormat().format(htAmount)}</td>
              </tr>

              {totalTva_13 !== 0 && (
                <tr>
                  <td>Tva 13%</td>
                  <td className='text-end'>{numStr(totalTva_13.toFixed(0), "")}</td>
                  {/* <td className='text-end'>{new Intl.NumberFormat().format(totalTva_13)}</td> */}
                </tr>
              )}
              {totalTva_16 !== 0 && (
                <tr>
                  <td>Tva 16%</td>
                  <td className='text-end'>{numStr(totalTva_16.toFixed(0), "")}</td>
                </tr>
              )}

              <tr>
                <td>CPS 1%</td>
                <td className='text-end'>{
                 numStr ((htAmount * 0.01).toFixed(0), "")
                  }</td>
              </tr>
              <tr className='border-top border-top-dashed fs-15'>
                <th scope='row'>Total TTC</th>
                <th className='text-end'>{numStr(((htAmount + totalTva_13 + totalTva_16 + htAmount * 0.01).toFixed(0)), "")}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='note bottom-relative d-noe d-print-block border-top pt-3'>
        <div className='al alert-in bottom-fix'>
          <p className='mb-0'>
            <span className='fw-semibold'>NOTES  : </span>
            
              
                
                <Row className="mb-2">
                  <Col>
                  Nom: 
                  </Col>
                  <Col>
                  A:
              
                  </Col>
                  <Col>
                  Le:
                  </Col>

                </Row>
                
                <p className="text-end">
                Signature (précédée de la mention "Bon pour accord")
                </p>
          </p>
        </div>
      </div>
    </>
  )
}

export default BottomTable

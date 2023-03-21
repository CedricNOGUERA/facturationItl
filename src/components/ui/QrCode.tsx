import React from 'react'
import QRCode from "react-qr-code";


const QrCode = ({id, title}: any) => {

  return (
    <QRCode
      size={256}
      style={{
        height: "auto",
        maxWidth: "100%",
        width: "100%",
      }}
      fgColor="#3262a8"
      value={`http://192.168.1.138:3000/${id}/overview/${title.toLowerCase()}`}
      viewBox={`0 0 256 256`}
    />
  );
}

export default QrCode
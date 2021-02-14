import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
const QRCode = require('qrcode');

const QrCode = (props) => {
  const { qrString } = props;
  const canvas = React.createRef();

  useEffect(() => {
    async function converter() {
      await QRCode.toCanvas(canvas.current, qrString, function (error) {
        if (error) console.error(error);
      });
    }
    converter();
  }, [qrString]);

  return (
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  );
};
QrCode.defaultProps = {
  qrString:
    '1@S29fMGdSMT8v16DFjwCXrRFygRz9K/bgOTuPkKAmlX5naX7Pw+uizIXThL6iQ5Mw1W9tayQvihThzg==,QpPdqiyPqO3vtZwEwrnkzL9SOFSxyLRfV3Jm3ZnTtnc=,nTXqtrHqML5HpdChrUOXfQ==',
};
QrCode.prototypes = {
  qrString: PropTypes.string,
};
export default QrCode;

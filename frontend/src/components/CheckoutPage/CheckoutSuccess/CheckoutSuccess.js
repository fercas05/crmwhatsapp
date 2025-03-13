import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import QRCode from 'react-qr-code';
import { SuccessContent, Total } from './style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import { useDate } from "../../../hooks/useDate";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/Auth/AuthContext";

function CheckoutSuccess(props) {

  const { pix } = props;
  const [pixString,] = useState(pix.qrcode.qrcode);
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  //   const socketManager = useContext(SocketContext);
  const { user, socket } = useContext(AuthContext);


  const { dateToClient } = useDate();

  useEffect(() => {
    const companyId = user.companyId;
    if (companyId) {
      // const socket = socketManager.GetSocket();

      const onCompanyPayment = (data) => {

        if (data.action === "CONCLUIDA") {
          toast.success(`Su licencia ha sido renovada hasta ${dateToClient(data.company.dueDate)}!`);
          setTimeout(() => {
            history.push("/");
          }, 4000);
        }
      }

      socket.on(`company-${companyId}-payment`, onCompanyPayment);

      return () => {
        socket.off(`company-${companyId}-payment`, onCompanyPayment);
      }
    }
  }, [socket]);

  const handleCopyQR = () => {
    setTimeout(() => {
      setCopied(false);
    }, 1 * 1000);
    setCopied(true);
  };

  return (
    <React.Fragment>
      <Total>
        <span>TOTAL</span>
        <strong>USD{pix.valor.original.toLocaleString('es', { minimumFractionDigits: 2 })}</strong>
      </Total>
      <SuccessContent>
        <QRCode value={pixString} />
        <CopyToClipboard text={pixString} onCopy={handleCopyQR}>
          <button className="copy-button" type="button">
            {copied ? (
              <>
                <span>Copiado</span>
                <FaCheckCircle size={18} />
              </>
            ) : (
              <>
                <span>Copiar código QR</span>
                <FaCopy size={18} />
              </>
            )}
          </button>
        </CopyToClipboard>
        <span>
          Para finalizar simplemente realiza el pago escaneando o pegando el
          Código Pix arriba :)
        </span>
      </SuccessContent>
    </React.Fragment>
  );
}

export default CheckoutSuccess;

import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Button, CircularProgress, Box, Typography, Popover } from '@mui/material';
import { Invoice } from './components'

import { api, INVOICE_STATE_UNPAID, INVOICE_STATE_PAID } from './lib/api.js'

const PARTNER_API_URL = "https://api.strike.me/v1";
const THEME_DEFAULT = 'default';
const THEME_NONE = 'none';

const getDefaultCurrency = profile => {
  return profile.currencies.find(c => c.isDefaultCurrency).currency;
}

const createInvoice = async (handle, amount, currency) => {
  return await api.createInvoice(handle, amount, currency);
};

const createQuote = async invoiceId => {
  return await api.createQuote(invoiceId);
};

const getInvoice = async invoiceId => {
  return await api.getInvoice(invoiceId);
};

// Initialise the app
export default function App({ apikey, handle, amount = 1, theme = THEME_DEFAULT }) {
  api.init(PARTNER_API_URL, apikey);

  const [profile, setProfile] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [quote, setQuote] = useState(null);
  const [isFetchingInvoice, setIsFetchingInvoice] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setQuote(null);
    setAnchorEl(null);
  };

  //
  // Button click handler
  //
  const hanldeButtonClick = async (event, amount) => {
    setAnchorEl(event.currentTarget);
    setIsFetchingInvoice(true);

    var updatedInvoice = invoice;
    if (!updatedInvoice) {
      updatedInvoice = await createInvoice(handle, amount, profile.currencies.find(c => c.isDefaultCurrency).currency);
      setInvoice(updatedInvoice);
    }

    const updatedQuote = await createQuote(updatedInvoice.invoiceId);
    setQuote(updatedQuote)

    setIsFetchingInvoice(false);
  };

  //
  // Widget Initialisation
  //
  useEffect(async () => {
    var profile = await api.getProfile(handle)
    setProfile(profile);
  }, []);


  //
  // Inhoice interactions.
  //
  useEffect(() => {
    if (quote === null) {
      return;
    }

    var successTimeoutId;
    const refreshTimerId = setTimeout(async () => {
      const updatedInvoice = await getInvoice(invoice.invoiceId);
      setInvoice(updatedInvoice);

      if (updatedInvoice.state !== INVOICE_STATE_UNPAID) {
        setQuote(null);
        successTimeoutId = setTimeout(() => { setInvoice(null); }, 3000);
      }

      if (new Date(quote.expiration) < new Date()) {
        setQuote(null);
      }
    }, 1000);

    return () => {
      clearTimeout(refreshTimerId);
      clearTimeout(successTimeoutId);
    }
  }, [invoice, quote]);

  const isUnpaid = invoice?.state === INVOICE_STATE_UNPAID && quote !== null;
  const isPaid = invoice?.state === INVOICE_STATE_PAID;

  if (!profile) {
    return null
  };

  return (
    <div>
      <Button variant="contained" onClick={e => hanldeButtonClick(e, amount)} fullWidth>
        {isFetchingInvoice && <CircularProgress size={24} />}
        {isPaid ? "Thank You!" : `Tip ${handle} ${amount} ${getDefaultCurrency(profile)}`}
      </Button>

      <Popover
        open={isUnpaid}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
          {isUnpaid && <Invoice quote={quote} size={250} m={2} />}
      </Popover>
    </div>
  );
}

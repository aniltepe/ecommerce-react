import { useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

export function useSnackBar() {
  const [items, setItems] = useState([]);
  const add = function(item) {
    setItems(items.concat(item));
  };
  return {add, items, setItems};
}

export default function SnackBar(props) {
  const sbMargin = (window.innerWidth < 600) ? 8 : 24;
  const sbHeight = 48;
  const handleClose = (event, reason, sb) => {
    if (reason !== "clickaway") 
      props.setItems(props.items.filter(itm => itm !== sb));
  }
  return (
    <>
      {props.items.slice().reverse().map((sb, i) => {
        return <Snackbar key={i} open={true} message={sb.message} autoHideDuration={sb.autohide}
          onClose={(event, reason) => handleClose(event, reason, sb)}
          sx={{bottom: (i * sbHeight + (i + 1) * sbMargin) + 'px !important', right: "auto" }}
          ContentProps={{sx: {minWidth: "150px !important"}}}
          action={(<IconButton size="small" color="inherit" onClick={(event) => handleClose(event, "closeicon", sb)} ><Close fontSize="small" /></IconButton>)}
        />
      })}
    </>
  );
}
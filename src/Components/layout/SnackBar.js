import { Snackbar, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSnackbarItem, selectSnackbarItems } from '../../slices/uiSlice';

export default function SnackBar() {
  const dispatch = useDispatch();
  const items = useSelector(selectSnackbarItems);
  const sbMargin = (window.innerWidth < 600) ? 8 : 16;
  const sbHeight = 33.5938;
  const handleClose = (event, reason, i) => {
    if (reason !== "clickaway") 
      dispatch(deleteSnackbarItem(i));
  }
  return (
    <>
      {items.slice().reverse().map((sb, i) => {
        return <Snackbar key={i} open={true} message={sb.message} autoHideDuration={sb.autohide}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          onClose={(event, reason) => handleClose(event, reason, i)}
          sx={{top: (i * sbHeight + (i + 1) * sbMargin) + 'px !important', left: {xs: "50%"}, transform: {xs: "translateX(-50%)"}}}
          ContentProps={{sx: { minWidth: "150px !important", lineHeight: 0.4, flexGrow: "unset", ".MuiSnackbarContent-action": {marginRight: "12px", paddingLeft: "0px"} }}}
          action={(<IconButton sx={{position: "absolute"}} size="small" color="inherit" onClick={(event) => handleClose(event, "closeicon", i)} ><Close fontSize="small" /></IconButton>)}
        />
      })}
    </>
  );
}
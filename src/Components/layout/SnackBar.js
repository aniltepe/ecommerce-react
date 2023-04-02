import { Snackbar, IconButton, Alert } from '@mui/material';
import { Close, TaskAlt, ReportProblemOutlined, InfoOutlined, ReportOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSnackbarItem, selectSnackbarItems } from '../../slices/uiSlice';

export default function SnackBar() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const items = useSelector(selectSnackbarItems);
  const sbHeight = 38;
  const handleClose = (event, reason, i) => {
    if (reason !== "clickaway") 
      dispatch(deleteSnackbarItem(i));
  }
  return (
    <>
      {items.slice().reverse().map((sb, i) => {
        return <Snackbar key={i} open={true} autoHideDuration={sb.autohide}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          onClose={(event, reason) => handleClose(event, reason, i)}
          sx={{top: {xs: (i * sbHeight + (i + 1) * 8) + 'px !important', sm: (i * sbHeight + (i + 1) * 16) + 'px !important'}, left: {xs: "50%"}, transform: {xs: "translateX(-50%)"}, width: "fit-content", 
          ".MuiAlert-root": {color: theme.palette.contrast.main, backgroundColor: theme.palette.drawer.main, lineHeight: 0.4, padding: "0px 16px", minHeight: sbHeight + "px", 
            boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)" }}}
        >
          <Alert sx={{".MuiAlert-message": {lineHeight: 0.4, display: "flex", alignItems: "center", whiteSpace: "nowrap"}, 
            ".MuiAlert-action": {marginRight: "12px", padding: "0px", alignItems: "center"},
            ".MuiAlert-icon": { color: sb.type === "success" ? "#2e7d32" : (sb.type === "error" ? "#d32f2f" : (sb.type === "info" ? "#0288d1" : (sb.type === "warning" ? "#eda502" : "#00000000"))) }}}
            action={(<IconButton sx={{position: "absolute"}} size="small" color="inherit" onClick={(event) => handleClose(event, "closeicon", i)}>
              <Close fontSize="small" />
            </IconButton>)}
            icon={sb.type === "success" ? <TaskAlt /> : (sb.type === "error" ? <ReportOutlined /> : (sb.type === "info" ? <InfoOutlined /> : (sb.type === "warning" ? <ReportProblemOutlined /> : false)))} >
              {sb.message}
          </Alert>
        </Snackbar>
      })}
      </>
    );
  }
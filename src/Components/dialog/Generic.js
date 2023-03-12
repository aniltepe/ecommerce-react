import React from 'react';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setGenericDialog, selectGenericDialog } from '../../slices/uiSlice';
import { Close } from '@mui/icons-material';

function Generic() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const type = useSelector(selectGenericDialog)
    const theme = useTheme();

    return (
        <Dialog
            open={type !== ""} 
            scroll="paper" 
            onClose={() => dispatch(setGenericDialog(""))} 
            sx={{ ".MuiBackdrop-root": { backdropFilter: "blur(2px)", filter: "blur(0px)" } }}
            PaperProps={{ sx: { backgroundColor: theme.palette.dialog.main } }}>
            <DialogTitle sx={{ textAlign: "center", marginBottom: "8px", color: theme.palette.contrast.main, fontFamily: "inherit" }}>
                { type === "terms" && t("termsandconditions")}
                <Close sx={{float: "right", marginTop: "-8px", marginRight: "-16px"}} onClick={() => dispatch(setGenericDialog(""))} />
            </DialogTitle>
            <DialogContent sx={{color: theme.palette.contrast.main, whiteSpace: "pre-line", overflowY: "scroll" }}>
                { type === "terms" && t("terms:terms") }
            </DialogContent>
        </Dialog>
    );
}
export default Generic;
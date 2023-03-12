export const validateOnChange = (event, control, setControl, t) => {
    const rules = control[event.target.id].rules;
    if (rules) {
        let fieldValue = event.target.value;
        if (rules.maskedchars && rules.maskedchars.length > 0) {
            for (let i = 0; i < rules.maskedchars.length; i++) {
                fieldValue = fieldValue.replaceAll(rules.maskedchars[i], "");
            }
        }
        let customRegex = "[^0-9a-zA-Z";
        if (rules.allowedchars && rules.allowedchars.length > 0) {
            const specials = [".", "*", "\\"];
            for (let i = 0; i < rules.allowedchars.length; i++) {
                customRegex += !specials.includes(rules.allowedchars[i]) ? rules.allowedchars[i] : "\\" + rules.allowedchars[i];
            }
            customRegex += "]";
        }

        if (rules.maxlength && fieldValue.length > rules.maxlength) {
            let helperTxt = t("validation:fieldmaxlength").replace("<0></0>", control[event.target.id].label).replace("<1></1>", rules.maxlength);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, chgvlderr: true, helperText: helperTxt } } );
        }
        else if (rules.allowedchars && rules.allowedchars.length > 0 && new RegExp(customRegex).test(fieldValue)) {
            let helperTxt = t("validation:fieldinvalid").replace("<0></0>", control[event.target.id].label);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, chgvlderr: true, helperText: helperTxt } } );
        }
        else if (rules.uniquefuncimmdt && !rules.uniquefuncimmdt(fieldValue) && rules.minlength && fieldValue.length >= rules.minlength ) {
            let helperTxt = t("validation:fieldinuse").replace("<0></0>", control[event.target.id].label);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, chgvlderr: true, helperText: helperTxt } } );
        }
        else if (rules.mustequal && fieldValue !== document.getElementById(rules.mustequal).value && fieldValue !== "") {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: t('validation:passwordsnomatch') } } );
        }
        else {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: false, chgvlderr: false, helperText: control[event.target.id].dfltHelper } } );
        }
    }
}
export const validateOnBlur = (event, control, setControl, t) => {
    const rules = control[event.target.id].rules;
    if (rules && !control[event.target.id].chgvlderr) {
        let fieldValue = event.target.value;
        if (rules.maskedchars && rules.maskedchars.length > 0) {
            for (let i = 0; i < rules.maskedchars.length; i++) {
                fieldValue = fieldValue.replaceAll(rules.maskedchars[i], "");
            }
        }

        if (rules.minlength && fieldValue.length < rules.minlength && fieldValue !== "") {
            let helperTxt = t("validation:fieldminlength").replace("<0></0>", control[event.target.id].label).replace("<1></1>", rules.minlength);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: helperTxt } } );
        }
        else if (rules.mustcontainlower && !/[a-z]/.test(fieldValue) && rules.minlength && fieldValue.length >= rules.minlength) {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: t('validation:passwordincludes') } } );
        }
        else if (rules.mustcontainupper && !/[A-Z]/.test(fieldValue) && rules.minlength && fieldValue.length >= rules.minlength) {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: t('validation:passwordincludes') } } );
        }
        else if (rules.mustcontainnumber && !/\d/.test(fieldValue) && rules.minlength && fieldValue.length >= rules.minlength) {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: t('validation:passwordincludes') } } );
        }
        else if (rules.match && !rules.match.test(fieldValue) && fieldValue !== "") {
            let helperTxt = t("validation:fieldinvalid").replace("<0></0>", control[event.target.id].label);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: helperTxt } } );
        }
        else if (rules.uniquefunclazy && !rules.uniquefunclazy(fieldValue)) {
            let helperTxt = t("validation:fieldinuse").replace("<0></0>", control[event.target.id].label);
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: helperTxt } } );
        }
        else if (rules.mustequal && fieldValue !== document.getElementById(rules.mustequal).value && fieldValue !== "") {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: true, helperText: t('validation:passwordsnomatch') } } );
        }
        else {
            setControl({ ...control, [event.target.id]: { ...control[event.target.id], error: false, helperText: control[event.target.id].dfltHelper } } );
        }
    }
}
export const validateOnSubmit = (control, setControl, t) => {
    let ctrl = control;
    let isValid = true;
    const controlKeys = Object.keys(ctrl);
    for (let i = 0; i < controlKeys.length; i++) {
        let c = controlKeys[i];
        if (ctrl[c].error) {
            isValid = false;
            continue;
        }
        let fieldValue = document.getElementById(ctrl[c].id).value;
        let fieldType = document.getElementById(ctrl[c].id).type;
        let fieldChecked = document.getElementById(ctrl[c].id).checked;
        if (ctrl[c].rules.maskedchars && ctrl[c].rules.maskedchars.length > 0) {
            for (let i = 0; i < ctrl[c].rules.maskedchars.length; i++) {
                fieldValue = fieldValue.replaceAll(ctrl[c].rules.maskedchars[i], "");
            }
        }
        if (ctrl[c].rules && ctrl[c].rules.required && fieldType !== "checkbox" && fieldValue === "") {
            let helperTxt = t("validation:fieldrequired").replace("<0></0>", ctrl[c].label);
            ctrl = { ...ctrl, [ctrl[c].id]: { ...ctrl[ctrl[c].id], error: true, helperText: helperTxt } };
            isValid = false;
        }
        else if (ctrl[c].rules && ctrl[c].rules.required && fieldType === "checkbox" && !fieldChecked) {
            ctrl = { ...ctrl, [ctrl[c].id]: { ...ctrl[ctrl[c].id], error: true, helperText: "" } };
            isValid = false;
        }
        else {
            ctrl = { ...ctrl, [ctrl[c].id]: { ...ctrl[ctrl[c].id], error: false, helperText: ctrl[c].dfltHelper } };
        }
    }
    setControl(ctrl);
    return isValid;
}
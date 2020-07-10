//notes
/*
    - probably not a good idea to have update fire each an every time 
    for all forms on the page even though user only interacts with one at any time
    - probably dont want to trigger validation each and every time the user triggers blur event, perhaps just when they click the submit button
*/
export const validate = (element, formData = []) => {
    let error = [true, ''];
    
    if(element.validation.email){
        //check if the format is correct
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'this field is required' : ''}`;
        error = !valid ? [valid,message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formData[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error
}

export const update = (element, formData, formName) => {
    const formDataCopy = { // copy data
        ...formData
    };
    const newformDataCopy = { // could rename this..
        ...formDataCopy[element.id]
    } 
    newformDataCopy.value = element.event.target.value;

    if(element.blur){
        newformDataCopy.touched = element.blur;
        //validate
        let validData = validate(newformDataCopy, formData);
        newformDataCopy.valid = validData[0];
        newformDataCopy.validationMessage = validData[1];
    }

    formDataCopy[element.id] = newformDataCopy;

    return formDataCopy;
}

export const trimData = (formData, formName) => {
    const dataForSubmit = {};
    for(let key in formData){
        if (key !== 'confirmPassword'){
        dataForSubmit[key] = formData[key].value;
        }
    }
    return dataForSubmit;
}

export const checkData = (formData, formName) => {
    //overall validation
    let formStatus = true;

    for(let key in formData){
        formStatus = formData[key].valid && formStatus;
    }

    return formStatus;
}

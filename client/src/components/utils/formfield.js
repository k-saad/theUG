import React from 'react';

const FormField = ({formdata, change, id}) => {
    
    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div>
                    {formdata.validationMessage}
                </div>
            )
        }
        return errorMessage;
    };

    const renderTemplate = () => {
        let formTemplate = null;

        switch(formdata.element){
            case ('input'): 
                formTemplate = (
                <div className='formBlock'>
                    <input
                        {...formdata.config}
                        value={formdata.value}
                        onBlur={(event)=>{change({event,id,blur:true})}}
                        onChange={(event)=>{change({event,id})}}
                    />
                    {showError()}
                </div>
                );
                break;
            default: 
                formTemplate = null;
                break
        }
        return formTemplate;
    }

    return (
        <div className="formBlock">
            {renderTemplate()}
        </div>
    );
};

export default FormField;
import React from 'react';

import '../style/FormInputs.scss';

const FormInputs = (props) => {
    const { placeholder, type, name, value, onChange } = props;

    return (
        <div className='formInputs-container'>
            <label>{(type === 'range' && value.length > 0) ? value : placeholder}</label>
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                step={type === 'time' ? 1 : (name === 'spiciness_scale' ? 1 : (name === 'diameter' ? 0.01 : undefined))}
                min={type === 'range' ? 1 : (type === 'number' ? 1 : undefined)}
                max={type === 'range' ? 10 : undefined}
                required
            />
        </div>
    )
}

export default FormInputs;
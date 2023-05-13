import React from 'react';

import '../style/FormSelection.scss';

const FormInputs = (props) => {
    const { name, placeholder, values, value, onChange } = props;
    return (
        <div className='formSelection-container'>
            <label>{placeholder}</label>
            <select placeholder={placeholder} name={name} onChange={onChange} required>
                {values.map((opt, i) => (
                    <option value={opt} key={i}>{opt}</option>
                ))}
            </select>
        </div>
    )
}

export default FormInputs;
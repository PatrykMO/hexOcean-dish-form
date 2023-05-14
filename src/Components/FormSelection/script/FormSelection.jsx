import React from 'react';
import { motion } from "framer-motion";
import '../style/FormSelection.scss';

const FormInputs = (props) => {
    const { name, placeholder, values, value, onChange } = props;
    return (
        <motion.div
            className='formSelection-container'
            whileHover={{scale: 1.05}}
        >
            <label>{placeholder}</label>
            <select placeholder={placeholder} name={name} onChange={onChange} required>
                {values.map((opt, i) => (
                    <option value={opt} key={i}>{opt}</option>
                ))}
            </select>
        </motion.div>
    )
}

export default FormInputs;
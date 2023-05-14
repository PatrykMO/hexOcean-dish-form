import { useState } from 'react';
import { motion } from "framer-motion";
import { HashLoader } from 'react-spinners'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';

import '../style/Form.scss';
import FormInputs from '../../FormInputs/script/FormInputs';
import FormSelection from '../../FormSelection/script/FormSelection';

const Form = () => {
  const [dish, setDish] = useState({
    name: '',
    preparation_time: '00:00:00',
    type: '',
    no_of_slices: 0,
    diameter: 0,
    spiciness_scale: 0,
    slices_of_bread: 0,
  });

  const [errors, setErrors] = useState([]);
  const [submitted, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);

  const types = ['pizza', 'soup', 'sandwich'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const changedValues = {};
      for (const key in dish) {
        const value = dish[key];
        if (value !== '' && value !== 0) {
          changedValues[key] = value;
        }
      }

      const response = await fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedValues),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setErrors([]);
        setLoading(false)
        setSubmited(true);
      } else {
        const data = await response.json();
        console.log('Request failed with validation errors');
        console.log(data);
        if (data.errors) {
          const validationErrors = Object.values(data.errors).flat();
          setErrors(validationErrors);
        }
      }
    } catch (error) {
      console.error('An error occurred while submitting the form:', error);
    }
  };

  const onChange = (e) => {
    setDish({...dish, [e.target.name]: e.target.value});
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <HashLoader color="#A020F0" size="75px" />
        </div>
      ) : submitted ? (
        <motion.div
          className="submitted-container"
          animate={{
            scale: [1, 1.25, 1.25, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        >
          <DoneOutlineIcon
            className='submitted-icon'
            onClick={() => window.location.reload(false)}/>
        </motion.div>
      ) : (
        <motion.div
          className="form-container"
          animate={{ y: [0, 150, 0], opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: [0.5, 0.6, 0.75, 1],
          }}
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}

            <FormInputs
              name="name"
              placeholder="Dish name"
              type="text"
              value={dish.name}
              onChange={onChange}
            />
            <FormInputs
              name="preparation_time"
              placeholder="Preparation time"
              type="time"
              value={dish.preparation_time}
              onChange={onChange}
            />
            <FormSelection
              name="type"
              placeholder="Dish type"
              values={types}
              value={dish.type}
              onChange={onChange}
            />
            {dish.type.length > 0 && (() => {
              switch (dish.type) {
                case "pizza":
                  return (
                    <>
                      <FormInputs
                        placeholder="Number of Slices"
                        name="no_of_slices"
                        type="number"
                        value={dish.no_of_slices}
                        onChange={onChange}
                      />
                      <FormInputs
                        placeholder="Diameter"
                        name="diameter"
                        type="number"
                        value={dish.diameter}
                        onChange={onChange}
                      />
                    </>
                  );
                case "soup":
                  return (
                    <FormInputs
                      placeholder="Spiciness scales"
                      name="spiciness_scale"
                      type="range"
                      value={dish.spiciness_scale}
                      onChange={onChange}
                    />
                  );
                case "sandwich":
                  return (
                    <FormInputs
                      placeholder="Number of bread slices"
                      name="slices_of_bread"
                      type="number"
                      value={dish.slices_of_bread}
                      onChange={onChange}
                    />
                  );
                default:
                  return null;
              }
            })()}
            <div className="button-container">
              <button
                className={buttonActive ? "animate" : ""}
                type="submit"
                onClick={() => {
                  setButtonActive(true);
                  setTimeout(() => {
                    setButtonActive(false);
                  }, 600);
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </>
  );
};

export default Form;
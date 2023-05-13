import { useState } from 'react';
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

  const types = ['pizza', 'soup', 'sandwich'];

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else {
        const data = await response.json();
        console.log('Request failed with validation errors');
        console.log(data); // Log the response data to examine the validation errors
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
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 &&
          (<ul className='error-messages'>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
          </ul>)}

        <FormInputs
          name='name'
          placeholder='Dish name'
          type='text'
          value={dish.name}
          onChange={onChange}
        />
        <FormInputs
          name='preparation_time'
          placeholder='Preparation time'
          type='time'
          value={dish.preparation_time}
          onChange={onChange}
        />
        <FormSelection
          name='type'
          placeholder='Dish type'
          values={types}
          value={dish.type}
          onChange={onChange}
        />
        {dish.type.length > 0
          &&
            (() => {
              switch (dish.type) {
                case 'pizza':
                  return (
                    <>
                      <FormInputs
                        placeholder='Number of Slices'
                        name='no_of_slices'
                        type='number'
                        value={dish.no_of_slices}
                        onChange={onChange}
                      />
                      <FormInputs
                        placeholder='Diameter'
                        name='diameter'
                        type='number'
                        value={dish.diameter}
                        onChange={onChange}
                      />
                    </>
                  );
                case 'soup':
                  return (
                    <FormInputs
                        placeholder='Spiciness scales'
                        name='spiciness_scale'
                        type='range'
                        value={dish.spiciness_scale}
                        onChange={onChange}
                      />
                    );
                case 'sandwich':
                  return (
                    <FormInputs
                      placeholder='Number of bread slices'
                      name='slices_of_bread'
                      type='number'
                      value={dish.slices_of_bread}
                      onChange={onChange}
                    />
                  )
                default:
                  return null
              }
            })()
        }
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Form;
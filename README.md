Modern UI Dish form
=======


![Screenshot 2023-05-14 at 15 33 16](https://github.com/PatrykMO/hexOcean-dish-form/assets/104906717/bab900a6-7363-4999-b813-e4419ed6565a)

Requirements
-------

Create a form that will contain the following fields:
  - name - dish name (text field)
  - preparation_time - preparation time (duration field, would be nice if the input will be formatted like 00:00:00)
  - type - dish type (select field with the following options: pizza, soup, sandwich)
  - after selecting dish type, conditionally display other fields:
      - for pizza:
        * no_of_slices - # of slices (number field)
        * diameter - diameter (float field)
      - for soup:
        * spiciness_scale - spiciness scale (1-10)
      - for sandwich:
        * slices_of_bread - number of slices of bread required (number field)

All fields should be required (fields depending on the dish type should be required conditionally based on what type of dish is selected).

Data should be submitted via POST request as a JSON to xxx and the form should support returned validation errors (if any).

Usage
-------

In the project directory, you can run:

`npm install` - to install all dependencies

`npm run dev` - to run app

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.


Demo
-------
Checkout [Demo](https://dish-form-bay.vercel.app/)!





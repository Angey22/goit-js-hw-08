// Connected the library "lodash.throttle".
import throttle from 'lodash.throttle';

// Make key for localStorage.
const STORAGE_KEY = 'feedback-form-state';

// Links on the elements of HTML document.
const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector('.feedback-form input'),
    message: document.querySelector('.feedback-form textarea'),
};

// Add Listeners on for events 'submit' & 'input'.
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

// Filling form inputs from saved data in localStorage.
fillingFormInputsFromSavedInStorage();

// Auxiliary variable for storing intermediate data in the JSON format.
let formData = {};

// The function code for filling the input form from the saved data in localStorage
function fillingFormInputsFromSavedInStorage() {
    // Get data from localStorage in JSON format
    const savedData = localStorage.getItem(STORAGE_KEY);

    // Checking for stored data
    if (savedData) {
        // Convert data from JSON format to object.
        const data = JSON.parse(savedData);

        // Filling in the fields from the saved data.
        if (data.email) refs.email.value = refs.email.value + data.email;
        if (data.message) refs.message.value = refs.message.value + data.message;
    }
}

// The function code for Form Submit.
function onFormSubmit(e) {
    // Resetting the default form settings.
    e.preventDefault(); 

    //! Check before submission:
    // 1. Get data from localStorage in JSON format.
    const storageData = localStorage.getItem(STORAGE_KEY);

    // 2. Convert data from JSON format to object.
    const consolData = JSON.parse(storageData);

    // 3. Verification conditions.
    if (Object.keys(consolData).length !== 2 || Object.values(consolData).some(el => el === '')) {
        alert('Fill all fields of this Form to Submit!');
        return;
    }

    // logging in console "Submit" form data as object
    console.log('Form "Submit" =>', consolData);

    // Removing visible text from fields, clearing localStorage & formData value.
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
}

// The function code for input text registration. 
function onFormInput(e) {
    // Get data from localStorage in JSON format
    const savedData = localStorage.getItem(STORAGE_KEY);

    // Checking for stored data
    if (savedData) {
        // Convert data from JSON format to object.
        const data = JSON.parse(savedData);

        // Fill "formData" value from stored data.
        formData = data;
    }


    // Logging data entered into each individual form field.
    formData[e.target.name] = e.target.value;

    // Converting data to JSON format
    const obgForm = JSON.stringify(formData);

    // Saving data in localStorage under the given key
    localStorage.setItem(STORAGE_KEY, obgForm);
}


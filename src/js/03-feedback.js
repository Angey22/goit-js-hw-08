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
const formData = {};

// The function code for filling the input form from the saved data in localStorage
function fillingFormInputsFromSavedInStorage() {
    // Get data from localStorage in JSON format
    const savedData = localStorage.getItem(STORAGE_KEY);

    // Checking for stored data
    if (savedData) {
        // Convert data from JSON format to object.
        const data = JSON.parse(savedData);

        // Remove "udefinde" if one of the fields is not filled in stored data.
        if (!data.email) data.email = '';
        if (!data.message) data.message = '';

        // Filling in the fields from the saved data.
        refs.email.value = data.email;
        refs.message.value = data.message;
    }
}

// The function code for Form Submit.
function onFormSubmit(e) {
    // Resetting the default form settings.
    e.preventDefault();

    // Getting data from localStorage, Convert it from JSON format to object & logging them in console.
    const consolData = localStorage.getItem(STORAGE_KEY);
    console.log('Form "Submit" =>', JSON.parse(consolData));

    // Removing visible text from fields & clearing localStorage.
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

// The function code for input text registration. 
function onFormInput(e) {
    // Logging data entered into each individual form field.
    formData[e.target.name] = e.target.value;

    // Converting data to JSON format
    const obgForm = JSON.stringify(formData);

    // Saving data in localStorage under the given key
    localStorage.setItem(STORAGE_KEY, obgForm);
}


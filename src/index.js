const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btn: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();

  const inputData = refs.input.value;
  console.log(inputData);
}

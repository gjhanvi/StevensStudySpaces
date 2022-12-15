const staticForm = document.getElementById('newpost-form');

if (staticForm) {


  staticForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      alert ("Hello World!");
      return true;
    } catch (e) {

    }
  });
}
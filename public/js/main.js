
let stringChecker = (string, field) => { //given a string and field where field is what we are testing ie name input. check if type is string, is empty, undefined, is all spaces
  if (typeof string !== "string") {
    throw field + " Not a string";
  }
  if (string.length == 0) {
    throw field + " Empty";
  }
  if (string === undefined) {
    throw field + " string is undefined";
  }
  string = string.trim();
  if (!string) throw field + " nothing";
  if (typeof string !== "string") throw field + " not a stringstring";
  if (string.trim().length === 0) throw field + "empty/all spaces";
  test = string.replace(/^\s+|\s+$/g, "");
  if (test.length == 0) {
    throw field + " All Spaces";
  }
  return string;
};

let checkRating = (rating, type) => { //type is either location, noise, or view
  //rating needs to be integer 0 to 5
  const validRating = ['0','1','2','3','4','5'];
  if (!validRating.includes(rating)) throw `Rating for ${type} must be integer number from 0 to 5`;
  return rating;
};

const staticForm = document.getElementById('newpost-form');
const errorContainer = document.getElementById("error-container");
const errorTextElement =
  errorContainer.getElementsByClassName("text-goes-here")[0];

if (staticForm) {


  staticForm.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      var formData = new FormData(staticForm)
      let output = []
      for (const [key, value] of formData) {
        output.push(`${value}`);
      }

      console.log(checkRating(output[4], "Noise"))
      submit()
    } catch (e) {
      errorTextElement.textContent = e;
      errorContainer.classList.remove("hidden");
    }
  });
}
const submit = async () => {
  try {
    staticForm.submit(); 
  } catch (error) {
    errorTextElement.textContent = e;
    errorContainer.classList.remove("hidden");
  }
};
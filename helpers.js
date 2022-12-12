//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

let stringChecker = (string, field) => { //given a string and field where field is what we are testing ie name input. check if type is string, is empty, eundefined, is all spaces
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

let letterSpaceNumber = (string) => {
  if (/^[A-Za-z0-90/\s/]*$/.test(string)) {
  } else {
    throw "string contains special chars or punc";
  }
};

let letterSpacesOnly = (string) => {
  if (/^[A-Za-z/\s/]*$/.test(string)) {
  } else {
    throw "string contains special chars or punc or numbers";
  }
};

let letterOnly = (string) => {
  if (/^[A-Za-z]*$/.test(string)) {
  } else {
    throw "string contains special chars or punc or numbers";
  }
};

let letternumberonly = (string) => {
  if (/^[A-Za-z0-90]*$/.test(string)) {
  } else {
    throw "string contains special chars or punc";
  }
  return string;
};

let passwordChecker = (string) =>
{
  if(string.includes(".*\\s.*") || password.length < 6 || /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)) //Is the password checker from hw 10, test 3
{
  throw "Password invalid"
}
};

let checkFoodNear = (foodNear) => {
  if (foodNear !== 'Yes' || foodNear !== 'No'){
    throw 'Input for food nearby should only be "Yes" or "No"'
  }
  return foodNear;
};

let checkStudentCapacity = (studentCapacity) => {
  const validCapacity = ['0','1','2','3','4','5', '6','7','8','9','10','11',
                       '12','13','14','15','16','17','18','19','20'];
  if (!validCapacity.includes(studentCapacity)) throw 'Student capacity must be integer from 1 to 20';
  return studentCapacity;
};


let checkRating = (rating, type) => { //type is either location, noise, or view
  //rating needs to be integer 0 to 5
  const validRating = ['0','1','2','3','4','5'];
  if (!validRating.includes(rating)) throw `Rating for ${type} must be integer number from 0 to 5`;
  return rating;
};

let checkUsername = async (username) =>{
  //check if username is a valid string
  username = username.trim();
  username = username.toLowerCase();
  if(!username){
    throw "username or password is missing";
  }
  username = stringChecker(username);
  //create a length requirement for username
  if(username.length < 4){
    throw "username needs to be at least 4 characters long";
  }
  //check if the numbers (if any are at the end of the username)
  if(/\d/.test(username)){
    let numbers = false; 
    let numIndex= 0;
    for(let i =0; i < username.length; i++){
      if(!isNaN(username[i])){
        numbers = true;
        numIndex=username[i];
        break;
      }
    }
    //checks for letters after the first number
    for(i = numIndex; i< username.length;i++){
      if(isNaN(username[i])){
        throw " cant have letters after numbers in the username";
      }
    }}


    return username;
}


let checkPassword = async (password) =>{
  password = password.trim();
  if(password.includes(" ")){
    throw "password cannot have spaces";
  }
  if(password.length <= 5){
    throw "password needs to be at least 6 characters long";
  }
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!specialChars.test(password)){
    throw "password needs at least 1 special character";
  }
  if(!/[A-Z]/.test(password)){
    throw "password needs at least 1 upper case character";
  }
  if(!/\d/.test(password)){
    throw "password needs at least 1 number";
  }
  //returns password
  return password;
}

  module.exports = {stringChecker,letternumberonly,letterSpaceNumber,letterSpacesOnly,letterOnly,passwordChecker,checkUsername,checkPassword, checkRating,
  checkFoodNear, checkStudentCapacity};


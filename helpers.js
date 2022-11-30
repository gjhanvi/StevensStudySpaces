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
  if (!string) throw field + " nothing";
  if (typeof string !== "string") throw field + " not a stringstring";
  if (string.trim().length === 0) throw field + "empty/all spaces";
  test = string.replace(/^\s+|\s+$/g, "");
  if (test.length == 0) {
    throw field + " All Spaces";
  }
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
};

let passwordChecker = (string) =>
{
  if(string.includes(".*\\s.*") || password.length < 6 || /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/.test(password)) //Is the password checker from hw 10, test 2
{
  throw "Password invalid"
}
};


  module.exports = {stringChecker,letternumberonly,letterSpaceNumber,letterSpacesOnly,letterOnly,passwordChecker};

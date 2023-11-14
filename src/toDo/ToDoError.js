export default function error(formValue) {
  const tempError = {};

  if (formValue.heading == "") {
    tempError.heading = "input shold not be Empty";
  } else if (formValue.heading.length < 3) {
    tempError.heading = "Enter a minimum 3 latter";
  }

  if (formValue.description == "") {
    tempError.description = "description input shold not be Empty";
  } else if (formValue.description.length < 5) {
    tempError.description = "Enter a minimum 5 latter";
  }

  if (formValue.color == "") {
    tempError.color = "color should not be empty";
  }

  return tempError;
}

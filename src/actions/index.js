export const buttonClicked = (firstname, lastname, age, place) => ({
  type: 'BUTTON_CLICKED',
  f_name: firstname,
  l_name: lastname,
  f_age: age,
  f_place: place
});
export const exampleActions = {
  BUTTON_CLICKED: 'BUTTON_CLICKED'
};

export const buttonClicked = (firstName, lastName, age, place) => ({
  type: formActions.BUTTON_CLICKED,
  actionFirstName: firstName,
  actionLastName: lastName,
  actionAge: age,
  actionPlace: place
});
export const formActions = {
  BUTTON_CLICKED: 'BUTTON_CLICKED'
};

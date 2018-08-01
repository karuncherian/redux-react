const initialState = {
  FirstName: "",
  LastName: "",
  Age: "",
  Place: ""
};
const example = (state = initialState, action) => {
  switch (action.type) {
    case 'BUTTON_CLICKED':
      return {
        ...state,
        FirstName: action.f_name,
        LastName: action.l_name,
        Age: action.f_age,
        Place: action.f_place
      };
    default:
      return state;
  }
}
export default example;

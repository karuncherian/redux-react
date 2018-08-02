import { formActions } from "../actions";

const initialState = {
  FirstName: "",
  LastName: "",
  Age: "",
  Place: ""
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case formActions.BUTTON_CLICKED:
      return {
        ...state,
        FirstName: action.actionFirstName,
        LastName: action.actionLastName,
        Age: action.actionAge,
        Place: action.actionPlace
      };
    default:
      return state;
  }
}
export default reducer;

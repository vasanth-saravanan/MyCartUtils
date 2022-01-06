const initialState = {
  loanedData: [],
  availableData: [],
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STORE_LOANED': {
      return {
        ...state,
        loanedData: action.payload,
      };
    }
    case 'STORE_AVAILABLE': {
      return {
        ...state,
        availableData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;

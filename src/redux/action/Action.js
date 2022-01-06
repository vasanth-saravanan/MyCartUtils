export const storeLoanedData = data => {
  return {
    type: 'STORE_LOANED',
    payload: data,
  };
};

export const storeAvailableData = data => {
  return {
    type: 'STORE_AVAILABLE',
    payload: data,
  };
};

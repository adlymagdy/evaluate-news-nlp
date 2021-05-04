function checkInput (input) {
  if (input.includes('www') || input.includes('http')) {
      return true
  } else {
      return false
  }
};

export { checkInput }
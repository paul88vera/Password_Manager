export const capitalizeFirstWord = (sentence) => {
  if (sentence.split(" ")) {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } else {
    return sentence
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
};

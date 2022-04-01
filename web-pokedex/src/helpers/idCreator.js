export const createId = (id) => {
  let hash = "#";
  if (id < 10) {
    hash += `00${id}`;
  } else if (id < 100) {
    hash += `0${id}`;
  } else {
    hash += `${id}`;
  }
  return hash;
};

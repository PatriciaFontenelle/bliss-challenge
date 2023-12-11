export const formatDate = (date) => {
  const dateItem = new Date(date);

  const day =
    dateItem.getDate() < 10 ? `0${dateItem.getDate()}` : dateItem.getDate();
  const month =
    dateItem.getMonth() < 10 ? `0${dateItem.getMonth()}` : dateItem.getMonth();

  return `${day}/${month}/${dateItem.getFullYear()}`;
};

export const validateEmail = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
};

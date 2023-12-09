export const formatDate = (date) => {
    const dateItem = new Date(date);

    const day = dateItem.getDate() < 10 ? `0${dateItem.getDate()}` : dateItem.getDate();
    const month = dateItem.getMonth() < 10 ? `0${dateItem.getMonth()}` : dateItem.getMonth();

    return `${day}/${month}/${dateItem.getFullYear()}`;
}
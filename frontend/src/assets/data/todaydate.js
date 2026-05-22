export function todayDate() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hour = date.getHours();

  return [
    { day, month, year },
    { seconds, minutes, hour },
  ];
}

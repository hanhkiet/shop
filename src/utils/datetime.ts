export const convertMillisecondsToDate = (milliseconds: number): String => {
  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate;
};

export const isNewPost = (dateString: string) => {
  const twoWeeks = 1000 * 60 * 60 * 24 * 14;

  const currentDate = new Date();
  const inputDate = new Date(dateString);
  const timeDiff = Math.abs(currentDate.getTime() - inputDate.getTime());

  return timeDiff < twoWeeks;
};

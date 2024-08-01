export const getGreeting = (): string => {
  const now = new Date();
  const hour = now.getHours();

  switch (hour) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 22:
    case 23:
      return "Good night";
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return "Good morning";
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
      return "Good afternoon";
    case 17:
    case 18:
    case 19:
    case 20:
    case 21:
      return "Good evening";
    default:
      return "Good day";
  }
};

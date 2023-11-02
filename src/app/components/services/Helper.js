export function calcPostAge(createdAt) {
  const givenDateTime = new Date(createdAt);
  const currentDateTime = new Date();
  const totalMilliseconds = currentDateTime - givenDateTime;

  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = totalSeconds % 60;

  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;

  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;

  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;

  const months = Math.floor(totalDays / 30);

  if (months >= 1) {
    return months + (months >= 2 ? ` months ` : ` month `) + "ago";
  } else if (days) {
    return days + (days >= 2 ? ` days ` : ` day `) + "ago";
  } else if (hours) {
    return hours + (hours >= 2 ? ` hours ` : ` hour `) + "ago";
  } else if (minutes) {
    return minutes + (minutes >= 2 ? ` minutes ` : ` minute `) + "ago";
  } else if (seconds) {
    return seconds + (seconds >= 2 ? ` seconds ` : ` second `) + "ago";
  }
  return "Just Now";
}

export function calcCommentAge(createdAt) {
  const givenDateTime = new Date(createdAt);
  const currentDateTime = new Date();
  const totalMilliseconds = currentDateTime - givenDateTime;

  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const seconds = totalSeconds % 60;

  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;

  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;

  const totalDays = Math.floor(totalHours / 24);
  const days = totalDays % 30;

  const months = Math.floor(totalDays / 30);

  if (months >= 1) {
    return months + "m";
  } else if (days) {
    return days + "d";
  } else if (hours) {
    return hours + "h";
  } else if (minutes) {
    return minutes + "m";
  } else if (seconds) {
    return seconds + "s";
  }
  return "Just Now";
}

export function displayShortContent(content) {
  if (content.length > 60) {
    return content.slice(0, 60) + "..."; // ... added to indicate truncation
  }
  return content; // return the original content if it's less than or equal to 30 characters
}

export function getFileExtension(url) {
  const isValid = (() => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  })();

  if (isValid) {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const filename = pathname.split("/").pop();
    const parts = filename.split(".");

    return parts.length > 1 && parts.pop();
  }
  return null;
}

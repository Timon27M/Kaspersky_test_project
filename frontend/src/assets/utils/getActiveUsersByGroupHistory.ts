export function getActiveUsersByGroupHistory() {
    const activeUsersByGroupHistory = sessionStorage.getItem("activeUsersgroup");
    if (activeUsersByGroupHistory) {
      return activeUsersByGroupHistory;
    }
  
    return "all";
  }
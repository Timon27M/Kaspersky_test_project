import { createSelector } from "@reduxjs/toolkit";
import {
  getActiveUserCardsSelector,
  getUsersSelector,
} from "./usersSlice/usersSlice";
import { getSearchValueSelector } from "./searchSlice/searchSlice";

export const getUsersByGroup = createSelector(
  [getActiveUserCardsSelector, getUsersSelector, getSearchValueSelector],
  (activeUserCards, users, searchValue) => {
    if (activeUserCards === "all" && !searchValue) {
      return users;
    }
    return users.filter(({ group, name, surname }) => {
      if (!searchValue) return group === activeUserCards;

      const fullName = `${name} + " " + ${surname}`.toLowerCase();
      const query = searchValue.toLowerCase();
      return (
        (activeUserCards === "all" ? true : group === activeUserCards) && fullName.includes(query)
      );
    });
  }
);

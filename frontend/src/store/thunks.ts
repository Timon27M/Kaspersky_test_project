import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/AxiosService/UserService/UserService";
import { setUsers } from "./usersSlice/usersSlice";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await UserService.GetUsers();

      if (!response) {
        throw new Error("Ошибка получения данных");
      }

      dispatch(setUsers(response));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  }
);

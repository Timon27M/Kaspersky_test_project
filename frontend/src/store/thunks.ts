import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/AxiosService/UserService/UserService";
import { setUsers } from "./usersSlice/usersSlice";
import { setUserData } from "./userSlice/userSlice";
import type { TUser, TUserWithoutId } from "../assets/types";

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

export const getUser = createAsyncThunk(
  "user/getUser",
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      const response = await UserService.GetUser(id);

      if (!response) {
        throw new Error("Ошибка получения данных");
      }

      dispatch(setUserData(response));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async function (userData: TUser, { rejectWithValue, dispatch }) {
    try {
      const response = await UserService.UpdateUser(userData);

      if (!response) {
        throw new Error("Ошибка получения данных");
      }

      dispatch(setUserData(response));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async function (id: string, { rejectWithValue, dispatch }) {
    try {
      const response = await UserService.DeleteUser(id);

      if (!response) {
        throw new Error("Ошибка получения данных");
      }

      dispatch(getUsers());
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  }
)


export const createUser = createAsyncThunk(
  "user/createUser",
  async function (userData: TUserWithoutId, { rejectWithValue, dispatch }) {
    try {
      const response = await UserService.CreateUser(userData);

      if (!response) {
        throw new Error("Ошибка получения данных");
      }

      dispatch(getUsers());
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return error;
    }
  }
)

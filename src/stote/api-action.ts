import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute } from "../const";
import { UserType } from "../types/table";
import { api } from "./store";


export const fetchLittleDataAction = createAsyncThunk(
  'app/fetchLittleData',
  async () => {
    try {
      const { data } = await api.get<UserType>(APIRoute.LittleData);
      return data
    } catch (error) {
      // errorHandle(error)
    }
  },
);

export const fetchBigDataAction = createAsyncThunk(
  'app/fetchBigData',
  async () => {
    try {
      const { data } = await api.get<UserType>(APIRoute.BigData);
      return data
    } catch (error) {
      // errorHandle(error)
    }
  },
);

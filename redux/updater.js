import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const hostingAddress = "https://gp5.onrender.com";

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patientList: [],
    selectedPatient: {},
    testList: [],
    selectedTest: {},
  },
  reducers: {
    setPatientList: (state, action) => {
      state.patientList = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setSelectedTest: (state, action) => {
      state.selectedTest = action.payload;
    },
    log: (state) => {
      console.log(state.testList.length);
    },
    filterPatientList: (state, action) => {
      state.patientList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.patientList = action.payload;
    });
    builder.addCase(getPatientValidTests.fulfilled, (state, action) => {
      state.testList = action.payload;
    });
    builder.addCase(getPatientByID.fulfilled, (state, action) => {
      state.selectedPatient = action.payload;
    });
  },
});

export const getPatients = createAsyncThunk("patient/dataFetch", () => {
  return axios
    .get(`${hostingAddress}/patients`)
    .then((res) => {
      if (res.status === 200) {
        return res.data.data;
      } else {
        return [];
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});

export const getPatientByID = createAsyncThunk(
  "patient/individualFetch",
  (id) => {
    return axios
      .get(`${hostingAddress}/patients/${id}`)
      .then((res) => {
        if (res.status === 200) {
          return res.data.data;
        } else {
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
);

export const getPatientValidTests = createAsyncThunk(
  "patient/testFetch",
  (id) => {
    return axios
      .get(`${hostingAddress}/patients/${id}/tests`)
      .then((res) => {
        if (res.status === 200) {
          return res.data.data.reverse();
        } else {
          return [];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const {
  setPatientList,
  log,
  setSelectedPatient,
  setSelectedTest,
  filterPatientList,
} = patientSlice.actions;
export default patientSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forms: [],
  selectedForm: { id: Date.now().toString(), title: "New Form", fields: [] },
  selectedField: null,
  responses: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addForm: (state) => {
      state.forms.push({ ...state.selectedForm, id: Date.now().toString() });
      state.selectedForm = { id: Date.now().toString(), title: "New Form", fields: [] };
    },
    addField: (state, action) => {
      state.selectedForm.fields.push({ ...action.payload, id: Date.now().toString() });
    },
    selectField: (state, action) => {
      state.selectedField = action.payload;
    },
    addResponse: (state, action) => {
      state.responses.push(action.payload);
    }
  },
});

export const { addForm, addField, selectField, addResponse } = formSlice.actions;
export default formSlice.reducer;

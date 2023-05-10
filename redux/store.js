import { configureStore} from "@reduxjs/toolkit";
import patientReducer from './updater';


export default configureStore({
    reducer: {
        patient: patientReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
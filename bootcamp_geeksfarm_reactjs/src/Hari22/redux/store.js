// src/Hari22/redux/store.js

import { createStore } from "redux";
import countReducer from "./reducer";

// Membuat store dari redux
const store = createStore(countReducer);

export default store;

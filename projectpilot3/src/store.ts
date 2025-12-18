import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {initialProjectState, projectReducer} from './projects/state/projectReducer';
import { type ProjectState } from "./projects/state/projectTypes";

const rootReducer = combineReducers({
    //Add your reducers here
    projectState: projectReducer
});

export type AppState = { 
    projectState: ProjectState;
};

export const initialAppState: AppState = {
    projectState: initialProjectState
};

//Create the store using redux toolkit's configureStore
export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {}
});
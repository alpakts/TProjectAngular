import { responseModel } from "./response-mode";

export interface singleResponseModel<T> extends responseModel {
    data:T 
}
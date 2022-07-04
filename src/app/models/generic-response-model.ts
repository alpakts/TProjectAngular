import { responseModel } from "./response-mode";

export interface genericResponseModel<T> extends responseModel{
    data:T[];

}
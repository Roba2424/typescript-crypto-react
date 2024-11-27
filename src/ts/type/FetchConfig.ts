import { HttpMethods } from "../enums/HttpMethods";

export type FetchConfig = {
  method?:HttpMethods;
  url: string;
  header?: object;
  body?: object;
};
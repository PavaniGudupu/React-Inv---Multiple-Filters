import { response } from "express";

export const success = (data) => ({
    success: true,
    response: data,
    failure: false,
    reason: null,
});


export const failure = (data) => ({
    success: false,
    response: null,
    failure: true,
    reason: data,
});
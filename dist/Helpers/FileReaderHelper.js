"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (file) => {
    const fileReader = new FileReader();
    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);
    // wrap the filereader callback in a promise
    return new Promise(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
    });
};

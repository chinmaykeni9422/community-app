export let tempDataStore = {};

// Function to set temporary data
export const setTempData = async (key, value) => {
    tempDataStore[key] = value;
};

// Function to get temporary data
export const getTempData = async (key) => {
    return tempDataStore[key];
};

// Function to clear temporary data
export const clearTempData = async (key) => {
    delete tempDataStore[key];
};
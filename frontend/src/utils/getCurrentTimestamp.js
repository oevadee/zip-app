const date = new Date();
export const getCurrentTimestamp = () => date.toString().split('+' || '-')[0];
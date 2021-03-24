const date = new Date();
const getCurrentTimestamp = () => date.toString().split('+' || '-')[0];

export default getCurrentTimestamp;

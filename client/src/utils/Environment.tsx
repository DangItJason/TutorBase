export const ApiBaseAddress = process.env.REACT_APP_API_BASE_ADDRESS;
export const ClientIdPlaceholder = (process.env.NODE_ENV==="development" ? process.env.REACT_APP_CLIENTID_PLACEHOLDER ?? "" : "");
export const TutorIdPlaceholder = (process.env.NODE_ENV==="development" ? process.env.REACT_APP_TUTORID_PLACEHOLDER ?? "" : "");
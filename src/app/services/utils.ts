export const mainEndpoint  = 'http://181.123.243.5:8080';
export const getFechaForQuery = (fecha: Date)=> {
    const month = (fecha.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const date = (fecha.getDate() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const fechaQuery:string = fecha.getFullYear() + month + date;
    return fechaQuery;
}
export function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero indexed
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
}
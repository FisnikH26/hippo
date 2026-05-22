export function formatDate(isoString) {
    // Parse the ISO date string into a Date object
    const date = new Date(isoString);

    // Extract the day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    // Return the formatted date in dd/mm/yyyy format
    return `${day}/${month}/${year}`;
}
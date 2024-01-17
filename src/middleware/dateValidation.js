export function validateDateParams (req, res, next) {
    let { start, end } = req.query;

    console.log('Antes de trim - Start:', start, 'End:', end);
    start = start.trim();
    end = end.trim();

    console.log('Después de trim - Start:', start, 'End:', end);

    if (!isDateValid(start) || !isDateValid(end)) {
        return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD.' });
    }
    next();
}
function isDateValid (dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString) && !isNaN(Date.parse(dateString));
}

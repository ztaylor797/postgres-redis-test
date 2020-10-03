// Short-circuiting, and saving a parse operation. Using bitwise for performance.
export default function isInt (value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}
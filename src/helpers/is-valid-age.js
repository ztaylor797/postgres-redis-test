export default function isValidAge (age) {
  return !isNaN(age) && 
         parseInt(Number(age)) == age && 
         !isNaN(parseInt(age, 10));
}

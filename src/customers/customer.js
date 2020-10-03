import requiredParam from '../helpers/required-param';
import { InvalidPropertyError } from '../helpers/errors';
import isValidEmail from '../helpers/is-valid-email.js';
import isValidAge from '../helpers/is-valid-age.js';
import upperFirst from '../helpers/upper-first';

export default function makeCustomer (
    customerInfo = requiredParam('customerInfo')
    ) {
        const validCustomer = validate(customerInfo);
        const normalCustomer = normalize(validCustomer);
        return Object.freeze(normalCustomer); // Taking advantage of function-hoisting here to put this at the top for clarity on what this function returns.
        
        function validate ({
            firstname = requiredParam('firstname'),
            lastname = requiredParam('lastname'),
            email = requiredParam('email'),
            age,
            ...otherInfo
        } = {}) {
            validateName('first', firstname);
            validateName('last', lastname);
            validateEmail(email);
            validateAge(age);
            return { firstname, lastname, email, age, ...otherInfo };
        }
        
        function validateName (label, name) {
            if (name.length < 2) {
                throw new InvalidPropertyError(
                    `A customer's ${label} name must be at least 2 characters long.`
                    );
                }
            }
            
            function validateEmail (email) {
                if (!isValidEmail(email)) {
                    throw new InvalidPropertyError('Invalid customer email address.');
                }
            }

            function validateAge (age) {
                if (age && !isValidAge(age)) {
                    throw new InvalidPropertyError('Invalid customer age.');
                }
            }            
            
            function normalize ({ email, firstname, lastname, age, ...otherInfo }) {
                return {
                    ...otherInfo,
                    firstname: upperFirst(firstname),
                    lastname: upperFirst(lastname),
                    email: email.toLowerCase(),
                    age
                };
            }
        }
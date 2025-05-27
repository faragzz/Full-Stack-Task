"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Formats an array of ValidationError objects into a simplified structure.
 *
 * @param {ValidationError[]} errors - The array of ValidationError objects to format.
 * @returns {Array<{property: string, messages: string[], children: any[]}>}
 *          An array of objects containing the property name, error messages, and nested children errors.
 */
function formatValidationErrors(errors) {
    return errors.map(err => {
        const constraints = err.constraints
            ? Object.values(err.constraints)
            : [];
        return {
            property: err.property,
            messages: constraints,
            children: err.children ? formatValidationErrors(err.children) : [],
        };
    });
}
exports.default = formatValidationErrors;

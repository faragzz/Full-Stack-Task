import {ValidationError} from "class-validator";

function formatValidationErrors(errors: ValidationError[]) {
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

export default formatValidationErrors;

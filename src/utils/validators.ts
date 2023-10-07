import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export const DontMatch = (
  to: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, name: string) => {
    console.log(object, 'object', name, 'name');
    registerDecorator({
      name: 'dontMatch',
      target: object.constructor,
      propertyName: name,
      validator: DontMatchValidator,
      constraints: [to],
      options: validationOptions,
    });
  };
};
@ValidatorConstraint()
class DontMatchValidator implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const to = validationArguments.constraints[0];
    const object = validationArguments.object;
    const toValue = object[to];
    return value !== toValue;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    const to = validationArguments.constraints[0];
    const property = validationArguments.property;
    return `${property} should not equal to ${to} `;
  }
}
export function helloMessage(
  validationArguments?: ValidationArguments,
): string {
  const to = validationArguments.constraints[0];
  const property = validationArguments.property;
  return `${property} should not Hello to ${to} `;
}

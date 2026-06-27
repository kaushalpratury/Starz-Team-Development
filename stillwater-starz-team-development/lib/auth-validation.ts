export interface RegistrationFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export type RegistrationField = keyof RegistrationFields;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string) {
  if (!email.trim()) return "Email is required.";
  if (!emailPattern.test(email.trim())) return "Enter a valid email address.";
  return undefined;
}

export function validateRegistrationField(
  field: RegistrationField,
  values: RegistrationFields,
): string | undefined {
  const value = values[field];

  switch (field) {
    case "firstName":
      return value.trim() ? undefined : "First name is required.";
    case "lastName":
      return value.trim() ? undefined : "Last name is required.";
    case "email":
      return validateEmail(value);
    case "phone": {
      if (!value.trim()) return "Phone number is required.";
      const digits = value.replace(/\D/g, "");
      return digits.length === 10 ? undefined : "Enter a 10-digit phone number.";
    }
    case "password":
      if (!value) return "Password is required.";
      return value.length >= 8 ? undefined : "Use at least 8 characters.";
    case "confirmPassword":
      if (!value) return "Please confirm your password.";
      return value === values.password ? undefined : "Passwords do not match.";
  }
}

export function validateRegistration(values: RegistrationFields) {
  return (Object.keys(values) as RegistrationField[]).reduce<RegistrationErrors>(
    (errors, field) => {
      const message = validateRegistrationField(field, values);
      if (message) errors[field] = message;
      return errors;
    },
    {},
  );
}

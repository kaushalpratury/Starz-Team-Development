export const abilityLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Competitive",
] as const;

export type AbilityLevel = (typeof abilityLevels)[number];

export interface SwimmerFields {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  abilityLevel: AbilityLevel | "";
  notes: string;
}

export type SwimmerField = keyof SwimmerFields;
export type SwimmerErrors = Partial<Record<SwimmerField, string>>;

export const emptySwimmerFields: SwimmerFields = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  abilityLevel: "",
  notes: "",
};

export function validateSwimmerField(
  field: SwimmerField,
  values: SwimmerFields,
): string | undefined {
  const value = values[field];

  switch (field) {
    case "firstName":
      return value.trim() ? undefined : "First name is required.";
    case "lastName":
      return value.trim() ? undefined : "Last name is required.";
    case "dateOfBirth": {
      if (!value) return "Date of birth is required.";
      const birthDate = new Date(`${value}T00:00:00`);
      if (Number.isNaN(birthDate.getTime())) return "Enter a valid date of birth.";
      if (birthDate > new Date()) return "Date of birth cannot be in the future.";
      return undefined;
    }
    case "abilityLevel":
      return abilityLevels.includes(value as AbilityLevel)
        ? undefined
        : "Select an ability level.";
    case "notes":
      return value.length <= 500 ? undefined : "Notes must be 500 characters or fewer.";
  }
}

export function validateSwimmer(values: SwimmerFields) {
  return (Object.keys(values) as SwimmerField[]).reduce<SwimmerErrors>(
    (errors, field) => {
      const message = validateSwimmerField(field, values);
      if (message) errors[field] = message;
      return errors;
    },
    {},
  );
}

export function calculateAge(dateOfBirth: string, today = new Date()) {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  let age = today.getFullYear() - year;
  const birthdayHasPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!birthdayHasPassed) age -= 1;
  return Math.max(0, age);
}

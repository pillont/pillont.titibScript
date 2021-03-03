import { String } from "typescript-string-operations";
import { isNumber } from "./validation.functions";

/**
 * apply prompt for number
 */
export function promptNumber(message: string): number {
  const value = prompt(message);
  if (String.IsNullOrWhiteSpace(value)) {
    throw new Error("validation not confirmed");
  }

  if (!isNumber(value)) {
    alert("la valeur n est pas un nombre !");
    throw new Error("value is not a number");
  }

  return Number(value);
}

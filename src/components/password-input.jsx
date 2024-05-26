import { Input } from "@nextui-org/react";
import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

/**
 * PasswordInput component represents an input field for password with visibility toggle.
 * @param {Object} props - The properties passed to the PasswordInput component.
 * @param {string} [props.label="Password"] - The label for the password input.
 * @param {function} props.onChange - The function to handle onChange event of the input.
 * @param {boolean} [props.isInvalid=false] - A boolean indicating whether the input is invalid.
 * @param {string} [props.errorMessage] - The error message to display when the input is invalid.
 * @returns {JSX.Element} The JSX element representing the password input.
 */
export default function PasswordInput({
  label,
  onChange,
  isInvalid = false,
  errorMessage,
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  /**
   * Toggles the visibility of the password.
   */
  const toggleVisibility = () => setIsVisible((isVisible) => !isVisible);

  return (
    <Input
      label={label ?? "Password"}
      variant="underlined"
      color="primary"
      placeholder="••••••••••"
      onChange={onChange}
      isInvalid={isInvalid}
      errorMessage={isInvalid ? errorMessage ?? "Enter a valid password" : ""}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <IoEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
}

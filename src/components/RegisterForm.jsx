import {
  confirmPassword,
  validateEmail,
  validatePassword,
} from "../utils/loginValidator.js";
import { useEffect, useState } from "react";
import registerUser from "../services/registerUser.service.js";

const RegisterForm = ({ onRegistered }) => {
  const [regEmail, setRegEmail] = useState("");
  const [isRegEmailTouched, setIsRegEmailTouched] = useState(false);
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [isRegEmailValid, setIsRegEmailValid] = useState(true);
  const [isRegPasswordValid, setIsRegPasswordValid] = useState(true);
  const [isRegConfirmPasswordValid, setIsRegConfirmPasswordValid] =
    useState(true);
  const [isRegFormValid, setIsRegFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegEmailChange = (event) => {
    const regEmail = event.target.value;
    setRegEmail(regEmail);
    setIsRegEmailTouched(true);
    setIsRegEmailValid(validateEmail(regEmail));
  };

  const handleRegPasswordChange = (event) => {
    const regPassword = event.target.value;
    setRegPassword(regPassword);
    setIsRegPasswordValid(validatePassword(regPassword));
  };

  const handleRegConfirmPasswordChange = (event) => {
    const regConfirmPassword = event.target.value;
    setRegConfirmPassword(regConfirmPassword);
    setIsRegConfirmPasswordValid(
      confirmPassword(regPassword, regConfirmPassword)
    );
  };

  useEffect(() => {
    setIsRegFormValid(
      isRegEmailTouched &&
        isRegEmailValid &&
        isRegPasswordValid &&
        isRegConfirmPasswordValid
    );
  }, [
    isRegEmailTouched,
    isRegEmailValid,
    isRegPasswordValid,
    isRegConfirmPasswordValid,
  ]);

  useEffect(() => {
    setIsRegFormValid(
      isRegEmailTouched && isRegEmailValid && isRegPasswordValid
    );
  }, [isRegEmailTouched, isRegEmailValid, isRegPasswordValid]);

  const handleRegister = async () => {
    if (isRegFormValid) {
      try {
        const res = await registerUser(regEmail, regPassword);
        if (res.status === 201) {
          onRegistered();
        }
      } catch (e) {
        console.log("error", e);
        setErrorMessage(e.message);
      }
    }
  };

  return (
    <form>
      <div className="row mb-3">
        <label htmlFor="registerEmail" className="col-sm-4 col-form-label">
          Email
        </label>
        <div className="col-sm-8">
          <input
            type="email"
            className={`${isRegEmailValid ? "" : "is-invalid"} form-control`}
            id="registerEmail"
            placeholder="example@example.com"
            autoComplete="username"
            value={regEmail}
            onChange={handleRegEmailChange}
            required
          />
          {!isRegEmailValid && (
            <div className="invalid-feedback">
              The email address you inputted is invalid.
            </div>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="registerPassword" className="col-sm-4 col-form-label">
          Password
        </label>
        <div className="col-sm-8">
          <input
            type="password"
            className={`form-control ${isRegPasswordValid ? "" : "is-invalid"}`}
            id="registerPassword"
            placeholder="Enter a password..."
            autoComplete="new-password"
            value={regPassword}
            onChange={handleRegPasswordChange}
            required
          />
          {!isRegPasswordValid && (
            <div className="invalid-feedback">
              The password must be at least 8 characters long and contain at
              least one uppercase letter, one number, and one special character.
            </div>
          )}
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="confirmPassword" className="col-sm-4 col-form-label">
          Confirm Password
        </label>
        <div className="col-sm-8">
          <input
            type="password"
            className={`form-control ${
              isRegConfirmPasswordValid ? "" : "is-invalid"
            }`}
            id="confirmPassword"
            placeholder="Confirm the password..."
            autoComplete="new-password"
            value={regConfirmPassword}
            onChange={handleRegConfirmPasswordChange}
            required
          />
          {!isRegConfirmPasswordValid && (
            <div className="invalid-feedback">
              Your password inputs do not match.
            </div>
          )}
        </div>
      </div>
      <button
        name="register"
        type="button"
        className="btn"
        style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
        disabled={!isRegFormValid}
        onClick={handleRegister}
      >
        Register
      </button>
      {errorMessage && (
        <p
          style={{
            color: "red",
            marginTop: "5px",
          }}
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;

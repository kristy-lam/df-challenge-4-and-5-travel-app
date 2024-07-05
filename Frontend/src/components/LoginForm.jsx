import { validateEmail, validatePassword } from "../utils/loginValidator.js";
import { useEffect, useState } from "react";
import loginUser from "../services/loginUser.service.js";
import { useUser } from "../context/context.js";

const LoginForm = () => {
  const { isLoggedIn, setLoggedIn } = useUser();
  const [userEmail, setUserEmail] = useState("");
  const [isUserEmailTouched, setIsUserEmailTouched] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [isUserEmailValid, setIsUserEmailValid] = useState(true);
  const [isUserPasswordValid, setIsUserPasswordValid] = useState(true);
  const [isLoginFormValid, setIsLoginFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleUserEmailChange = (event) => {
    const userEmail = event.target.value;
    setUserEmail(userEmail);
    setIsUserEmailTouched(true);
    setIsUserEmailValid(validateEmail(userEmail));
  };

  const handleUserPasswordChange = (event) => {
    const userPassword = event.target.value;
    setUserPassword(userPassword);
    setIsUserPasswordValid(validatePassword(userPassword));
  };

  useEffect(() => {
    setIsLoginFormValid(
      isUserEmailTouched && isUserEmailValid && isUserPasswordValid
    );
  }, [isUserEmailTouched, isUserEmailValid, isUserPasswordValid]);

  const handleLogin = async () => {
    if (isLoginFormValid) {
      try {
        const res = await loginUser(userEmail, userPassword);
        setLoggedIn(userEmail, userPassword);
        setMessage(res.data.message);
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <form>
          <div className="row mb-3">
            <label htmlFor="loginEmail" className="col-sm-4 col-form-label">
              User Email
            </label>
            <div className="col-sm-8">
              <input
                type="email"
                className={`form-control ${isUserEmailValid ? "" : "is-invalid"}`}
                id="loginEmail"
                placeholder="example@example.com"
                autoComplete="username"
                value={userEmail}
                onChange={handleUserEmailChange}
                required
              />
              {!isUserEmailValid && (
                <div className="invalid-feedback">
                  The email address you inputted is invalid.
                </div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="loginPassword" className="col-sm-4 col-form-label">
              User Password
            </label>
            <div className="col-sm-8">
              <input
                type="password"
                className={`form-control ${
                  isUserPasswordValid ? "" : "is-invalid"
                }`}
                id="loginPassword"
                placeholder="Enter your password..."
                autoComplete="current-password"
                value={userPassword}
                onChange={handleUserPasswordChange}
                required
              />
              {!isUserPasswordValid && (
                <div className="invalid-feedback">
                  The password must be at least 8 characters long and contain at
                  least one uppercase letter, one number, and one special
                  character.
                </div>
              )}
            </div>
          </div>
          <button
            name="login"
            type="button"
            className="btn"
            style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
            disabled={!isLoginFormValid}
            onClick={handleLogin}
          >
            Login
          </button>
          {errorMessage && (
            <p
              style={{
                color: "red",
              }}
            >
              {errorMessage}
            </p>
          )}
        </form>
      ) : (
        <>
          {message && <p>{message}</p>}
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: "#2EC4B6", color: "#FFFFFF" }}
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </>
      )}
    </>
  );
};

export default LoginForm;

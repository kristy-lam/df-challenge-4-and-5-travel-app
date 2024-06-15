import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const RegisterModal = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistered = () => {
    setIsRegistered(true);
  };

  return (
    <>
      <div
        className="modal-fullscreen modal fade text-center"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="registerModalLabel"
                style={{ color: "#2EC4B6", fontWeight: "bold" }}
              >
                Welcome to DF Travel!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h6 style={{ color: "#2EC4B6", fontWeight: "bolder" }}>
                Register to enjoy adding a location to your favourites!
              </h6>
              <br />
              {isRegistered ? (
                <LoginForm />
              ) : (
                <RegisterForm onRegistered={handleRegistered} />
              )}
              {isRegistered && <p>Registration Success.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;

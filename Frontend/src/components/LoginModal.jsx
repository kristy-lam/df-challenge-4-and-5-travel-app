import LoginForm from "./LoginForm.jsx";

const LoginModal = () => {
  return (
    <>
      <div
        className="modal-fullscreen modal fade text-center"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id="loginModalLabel"
                style={{ color: "#2EC4B6", fontWeight: "bold" }}
              >
                Welcome back!
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
                Login to manage your favourite locations!
              </h6>
              <br />
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;

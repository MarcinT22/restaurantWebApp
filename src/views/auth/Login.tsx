import React, { FormEvent, useState } from "react";
import "../../scss/auth.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Alert from "../../components/Alert";

interface LoginProps {
  signIn: () => void;
}

const Login: React.FC<LoginProps> = ({ signIn }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertMessage("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      signIn();
      navigate("/dashboard/");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Invalid login credentials");
      setIsLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__header auth__header--main">RestaurantApp</h1>
        <div className="auth__content">
          <h2 className="auth__header auth__header--highlight">Sign in</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
              <input
                type="email"
                className="auth__input"
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="auth__field">
              <input
                type="password"
                className="auth__input"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {alertMessage && <Alert message={alertMessage} type={alertType} />}

            <button type="submit" className="auth__button" disabled={isLoading}>
              {!isLoading ? "Login" : <span></span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useValidation from '../hooks/useValidation';

const Register = (props) => {
  const { onRegister, isLoggedIn } = props;
  const { values, handleChange, resetForm } = useValidation({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.email, values.password);
  }

  useEffect(() => {
    if (isLoggedIn) resetForm();
  }, [isLoggedIn, resetForm]);

  return (
    <div className="auth">
      <div className="auth__wrapper">
        <form
          className="auth__form"
          name="auth-form"
          onSubmit={handleSubmit}
        >
          <h1 className="auth__title">Регистрация</h1>
          <div className="auth__input-container">
            <input
              type="email"
              className="auth__input"
              placeholder="Email"
              name="email"
              required={true}
              onChange={handleChange}
              value={values.email || ''}
            />
            <span className="auth__input-error"></span>
            <input
              type="password"
              className="auth__input"
              placeholder="Пароль"
              name="password"
              required={true}
              onChange={handleChange}
              value={values.password || ''}
            />
            <span className="auth__input-error"></span>
          </div>
          <button
            type="submit"
            className="auth__button"
          >
            Зарегистрироваться
          </button>
          <p className="auth__text">
            Уже зарегистрированы?&#160;
            <Link
              to="/sign-in"
              className="auth__text"
            >
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

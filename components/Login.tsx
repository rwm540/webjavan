import React, { useState } from 'react';
import { JavanWebiLogo, ArrowUturnLeftIcon } from './Icons';

interface LoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
  onGoToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBack, onGoToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('نام کاربری نمی‌تواند خالی باشد.');
      return;
    }

    if (!password) {
      setError('رمز عبور نمی‌تواند خالی باشد.');
      return;
    }

    // This is a mock login. In a real application, you'd verify credentials against a server.
    // For now, any valid input is considered a successful login.
    console.log(`Attempting login with Username: ${username}`);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}}>
      <div className="max-w-md w-full rounded-2xl shadow-2xl shadow-gray-500/10 p-8 space-y-6 border relative" style={{ backgroundColor: 'var(--color-card-background)', borderColor: 'var(--color-border)'}}>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Back to homepage"
        >
          <ArrowUturnLeftIcon className="w-6 h-6" />
        </button>
        <div className="text-center">
          <JavanWebiLogo className="w-16 h-16 mx-auto text-[var(--color-primary)]" />
          <h2 className="mt-4 text-3xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
            ورود به حساب کاربری
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            نام کاربری و رمز عبور خود را وارد کنید
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-right" style={{ color: 'var(--color-text-secondary)' }}>
              نام کاربری
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:text-sm transition-all duration-200"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-right" style={{ color: 'var(--color-text-secondary)' }}>
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:text-sm text-left transition-all duration-200"
              style={{ direction: 'ltr', borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)'}}
            />
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ color: 'var(--color-text-on-primary)'}}
            >
              ورود
            </button>
          </div>
          <div className="text-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)'}}>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              حساب کاربری ندارید؟{' '}
              <button
                type="button"
                onClick={onGoToRegister}
                className="font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
              >
                ثبت نام کنید
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
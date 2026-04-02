import { useState } from 'react';
import FormInput from './FormInput';
import { validateEmail } from '../../../utils/validation';
import { useAppDispatch } from '../../../app/hooks';
import { setAuthenticated, setUserRole, setUsernameValue } from '../../roles/roleSlice';
import { Loader2 } from 'lucide-react';

const SignInForm = ({ onSuccess, role = 'viewer' }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getEmailError = () => {
    if (!formData.email) return 'Email is required';
    if (!validateEmail(formData.email)) return 'Please enter a valid email address';
    return '';
  };

  const getPasswordError = () => {
    if (!formData.password) return 'Password is required';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (successMessage) setSuccessMessage('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const isFormValid =
    formData.email &&
    formData.password &&
    !getEmailError() &&
    !getPasswordError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      dispatch(setAuthenticated(true));
      dispatch(setUserRole(role));
      dispatch(setUsernameValue(formData.email.split('@')[0] || 'User'));
      setSuccessMessage('Signed in successfully! Redirecting...');
      setFormData({ email: '', password: '' });
      setTouched({ email: false, password: false });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Signin error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm">
          {successMessage}
        </div>
      )}

      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="you@example.com"
        error={getEmailError()}
        touched={touched.email}
        required
      />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            Password
            <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-primary hover:text-accent transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="password"
          className={`w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
            touched.password && getPasswordError() ? 'border-destructive focus:ring-destructive' : ''
          }`}
          aria-invalid={touched.password && getPasswordError() ? 'true' : 'false'}
          aria-describedby={touched.password && getPasswordError() ? 'password-error' : undefined}
        />
        {touched.password && getPasswordError() && (
          <p id="password-error" className="text-xs text-destructive font-medium mt-2">
            {getPasswordError()}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border bg-input border text-primary cursor-pointer"
            defaultChecked
          />
          <span>Remember me</span>
        </label>
        <a
          href="#"
          className="text-sm text-primary hover:text-accent transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting ? 'true' : 'false'}
        className="w-full py-2.5 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default SignInForm;

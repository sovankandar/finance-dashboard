import { useState } from 'react';
import FormInput from './FormInput';
import { validateEmail, getPasswordErrorMessage } from '../../../utils/validation';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import { useAppDispatch } from '../../../app/hooks';
import { setAuthenticated, setUserRole, setUsernameValue } from '../../roles/roleSlice';
import { Loader2 } from 'lucide-react';

const SignUpForm = ({ onSuccess, role = 'viewer' }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getEmailError = () => {
    if (!formData.email) return 'Email is required';
    if (!validateEmail(formData.email)) return 'Please enter a valid email address';
    return '';
  };

  const getPasswordError = () => {
    return getPasswordErrorMessage(formData.password);
  };

  const getConfirmPasswordError = () => {
    if (!formData.confirmPassword) return 'Please confirm your password';
    if (formData.password !== formData.confirmPassword)
      return 'Passwords do not match';
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
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    !getUsernameError() &&
    !getEmailError() &&
    !getPasswordError() &&
    !getConfirmPasswordError();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      dispatch(setAuthenticated(true));
      dispatch(setUserRole(role));
      dispatch(setUsernameValue(formData.username || formData.email.split('@')[0] || 'User'));
      setSuccessMessage(
        'Account created successfully! Please check your email to verify your account.'
      );
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setTouched({ username: false, email: false, password: false, confirmPassword: false });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
        <p className="text-sm text-muted-foreground">
          Sign up to get started with your account
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-md bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400 text-sm">
          {successMessage}
        </div>
      )}

      <FormInput
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="yourname"
        error={getUsernameError()}
        touched={touched.username}
        required
      />

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
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="password"
          error={getPasswordError()}
          touched={touched.password}
          required
        />
        {formData.password && (
          <div className="mt-3">
            <PasswordStrengthIndicator password={formData.password} />
          </div>
        )}
      </div>

      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder="password"
        error={getConfirmPasswordError()}
        touched={touched.confirmPassword}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting ? 'true' : 'false'}
        className="w-full py-2.5 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
  const getUsernameError = () => {
    if (!formData.username) return 'Username is required';
    return '';
  };

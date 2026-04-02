const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-md bg-input border border-border text-foreground placeholder-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
          touched && error ? 'border-destructive focus:ring-destructive' : ''
        }`}
        aria-invalid={touched && error ? 'true' : 'false'}
        aria-describedby={touched && error ? `${name}-error` : undefined}
      />
      {touched && error && (
        <p id={`${name}-error`} className="text-xs text-destructive font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

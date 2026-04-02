import { getPasswordStrength } from '../../../utils/validation';

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

const PasswordStrengthIndicator = ({ password }) => {
  const score = getPasswordStrength(password);
  const normalized = Math.min(score, 4);
  const percentage = ((normalized + 1) / 5) * 100;

  const colorClass =
    normalized <= 1
      ? 'bg-rose-500'
      : normalized === 2
      ? 'bg-amber-500'
      : normalized === 3
      ? 'bg-emerald-500'
      : 'bg-emerald-600';

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <p className="text-xs text-muted-foreground">Strength: {strengthLabels[normalized] || 'Weak'}</p>
    </div>
  );
};

export default PasswordStrengthIndicator;

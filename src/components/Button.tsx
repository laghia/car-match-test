import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'digital-primary' | 'digital-secondary';
  size?: 'default' | 'small';
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  fullWidth?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  type = 'button',
  className = '',
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${size === 'small' ? 'btn--small' : ''} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="btn__text">{children}</span>
    </button>
  );
}

export function LinkButton({
  children,
  variant = 'primary',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  return (
    <span className={`btn btn--${variant} ${className}`}>
      <span className="btn__text">{children}</span>
    </span>
  );
}

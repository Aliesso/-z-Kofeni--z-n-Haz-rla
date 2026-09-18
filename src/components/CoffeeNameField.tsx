import './CoffeeNameField.css';

interface CoffeeNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_LEN = 40;

export function CoffeeNameField({ value, onChange }: CoffeeNameFieldProps) {
  return (
    <div className="name-field">
      <label htmlFor="coffee-name" className="name-field__label">
        Kofenin adı
      </label>
      <input
        id="coffee-name"
        className="name-field__input"
        type="text"
        placeholder="Məs: Əlinin Payız Latte-si"
        value={value}
        maxLength={MAX_LEN}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="name-field__count">{value.length}/{MAX_LEN}</span>
    </div>
  );
}

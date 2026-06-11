import { useEffect, useId, useRef, useState } from 'react';
import type { RoadsideAssistanceOption } from './roadsideAssistanceOptions';
import { ROADSIDE_ASSISTANCE_OPTIONS, normalizeRoadsideValue } from './roadsideAssistanceOptions';
import './RoadsideAssistanceSelect.css';

type RoadsideAssistanceSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
};

function RoadsideSignalIcon({ tier }: { tier: 1 | 2 | 3 }) {
  return (
    <span className="roadside-signal" aria-hidden="true">
      {[1, 2, 3].map((bar) => (
        <span
          key={bar}
          className={`roadside-signal__bar roadside-signal__bar--${bar} ${
            bar <= tier ? 'roadside-signal__bar--filled' : 'roadside-signal__bar--outline'
          }`}
        />
      ))}
    </span>
  );
}

export function RoadsideAssistanceSelect({ id, value, onChange }: RoadsideAssistanceSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selected =
    ROADSIDE_ASSISTANCE_OPTIONS.find((option) => option.value === value) ??
    ROADSIDE_ASSISTANCE_OPTIONS[0];

  useEffect(() => {
    const normalized = normalizeRoadsideValue(value);
    if (normalized !== value) {
      onChange(normalized);
    }
  }, [onChange, value]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (option: RoadsideAssistanceOption) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="roadside-select" ref={rootRef}>
      <button
        id={id}
        type="button"
        className="roadside-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <RoadsideSignalIcon tier={selected.tier} />
        <span className="roadside-select__value">{selected.label}</span>
      </button>

      {isOpen && (
        <ul id={listboxId} className="roadside-select__menu" role="listbox" aria-labelledby={id}>
          {ROADSIDE_ASSISTANCE_OPTIONS.map((option) => (
            <li key={option.value} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.value === selected.value}
                className={`roadside-select__option ${
                  option.value === selected.value ? 'roadside-select__option--selected' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                <RoadsideSignalIcon tier={option.tier} />
                <span className="roadside-select__option-label">{option.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

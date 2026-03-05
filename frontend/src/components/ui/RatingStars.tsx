import { StarFill, Star } from "react-bootstrap-icons";

type Props = {
  value: number;
  onChange?: (next: number) => void;
  disabled?: boolean;
};

const RatingStars = ({ value, onChange, disabled }: Props) => {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 4,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {Array.from({ length: 5 }).map((_, idx) => {
        const star = idx + 1;
        const filled = star <= value;
        const Icon = filled ? StarFill : Star;

        return (
          <span
            key={star}
            onClick={() => {
              if (!disabled && onChange) onChange(star);
            }}
            aria-label={`rate-${star}`}
            role={onChange && !disabled ? "button" : undefined}
          >
            <Icon color={filled ? "#FFDA6A" : "#dee2e6"} size={18} />
          </span>
        );
      })}
    </div>
  );
};

export default RatingStars;

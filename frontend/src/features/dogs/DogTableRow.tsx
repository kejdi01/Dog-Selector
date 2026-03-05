import RatingStars from "../../components/ui/RatingStars";
import StatusBadge from "../../components/ui/StatusBadge";
import type { Dog, UUID } from "../../types/dogs";
import { Form } from "react-bootstrap";
import Actions from "./Actions";

type Props = {
  dog: Dog;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  onInlineRating: (dog: Dog, rating: number) => void;
  onEdit: (dog: Dog) => void;
  onRemove: (id: UUID) => void;
};

const DogRow = ({
  dog,
  checked,
  onCheckedChange,
  onInlineRating,
  onEdit,
  onRemove,
}: Props) => {
  return (
    <tr>
      <td className="ps-3">
        <Form.Check
          aria-label={`Select ${dog.breed.name}`}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
      </td>

      <td>
        <StatusBadge status={dog.status} />
      </td>

      <td className="text-nowrap">{dog.breed.name}</td>
      <td className="text-nowrap">{dog.description.title}</td>

      <td>
        <RatingStars
          value={dog.rating}
          onChange={(v) => onInlineRating(dog, v)}
        />
      </td>

      <td className="d-none d-lg-table-cell">
        <div className="text-truncate w-100" style={{ maxWidth: 340 }}>
          {dog.note || ""}
        </div>
      </td>

      <td className="text-end pe-3">
        <Actions onEdit={() => onEdit(dog)} onRemove={() => onRemove(dog.id)} />
      </td>
    </tr>
  );
};

export default DogRow;

import { DisplayStars } from "./DisplayStars";

export const RatingsList = ({ ratings }) => {
  return (
    <div>
      {ratings.map((rating) => (
        <div key={rating.id} className="mb-2">
          <small className="text-muted">
            <DisplayStars rating={rating.rating} />
            <span className="ms-3">{rating.user.username}</span>
          </small>
        </div>
      ))}
    </div>
  );
};

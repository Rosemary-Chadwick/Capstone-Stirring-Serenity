export const SimilarityBreakdown = ({ breakdown }) => {
  if (!breakdown) return null;

  const formatPercent = (value) => Math.round((value || 0) * 100);

  return (
    <div className="similarity-details">
      {breakdown.title > 0 && (
        <p className="card-text mb-1">
          <small className="text-muted">
            Title Match: {formatPercent(breakdown.title)}%
          </small>
        </p>
      )}
      {breakdown.ingredients > 0 && (
        <p className="card-text mb-1">
          <small className="text-muted">
            Ingredients Match: {formatPercent(breakdown.ingredients)}%
          </small>
        </p>
      )}
      {breakdown.cookingMethod > 0 && (
        <p className="card-text mb-1">
          <small className="text-muted">
            Method Match: {formatPercent(breakdown.cookingMethod)}%
          </small>
        </p>
      )}
      {breakdown.cookingTime > 0 && (
        <p className="card-text mb-1">
          <small className="text-muted">
            Time Match: {formatPercent(breakdown.cookingTime)}%
          </small>
        </p>
      )}
    </div>
  );
};

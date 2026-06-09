import './CarDetailsExpertReview.css';

export function CarDetailsExpertReview() {
  return (
    <section id="expert-review" className="expert-review" aria-labelledby="expert-review-heading">
      <div className="expert-review__inner">
        <h2 id="expert-review-heading" className="expert-review__heading">
          Expert review
        </h2>

        <div className="expert-review__empty">
          <p className="expert-review__empty-title">There&apos;s no review for this car</p>
          <p className="expert-review__empty-text">
            Sorry, an expert review is not currently available for this car. Please check back
            soon.
          </p>
        </div>
      </div>
    </section>
  );
}

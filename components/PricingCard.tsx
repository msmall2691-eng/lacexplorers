export function PricingCard({
  schedule,
  price,
  currency,
  featured = false,
}: {
  schedule: string;
  price: number;
  currency: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border p-7 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
        featured
          ? "border-sage bg-sage-50"
          : "border-beige/60 bg-white"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-sage-dark">
        {schedule}
      </p>
      <p className="mt-3 font-serif text-4xl font-semibold text-charcoal">
        <span className="align-top text-2xl text-charcoal-light">{currency}</span>
        {price}
      </p>
      <p className="mt-1 text-sm text-charcoal-light">approx. per week</p>
    </div>
  );
}

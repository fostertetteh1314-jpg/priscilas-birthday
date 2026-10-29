export type SceneBirthdayProps = {
  onNext: () => void;
};

export function SceneBirthday({ onNext }: SceneBirthdayProps) {
  return (
    <section className="stage" aria-label="Birthday introduction">
      <h1 className="title">Happy Birthday, Priscilla!</h1>
      <p className="body-text">
        Today isn't just about another year. It's about celebrating your life,
        your journey, your beautiful potential, and all the wonderful things
        still waiting for you.
      </p>
      <button className="button" onClick={onNext}>
        Continue
      </button>
    </section>
  );
}

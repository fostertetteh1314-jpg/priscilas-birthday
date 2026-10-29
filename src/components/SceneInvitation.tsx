export type SceneInvitationProps = {
  onOpen: () => void;
};

export function SceneInvitation({ onOpen }: SceneInvitationProps) {
  return (
    <section className="stage" aria-label="Invitation">
      <p className="kicker">A LITTLE SOMETHING, MADE JUST FOR YOU</p>
      <h1 className="title">For Priscilla Barfo</h1>
      <p className="nickname" aria-hidden="true">dzigbordi 🤍</p>
      <p className="subtitle">Today, the world celebrates someone special.</p>
      <p className="date">OCTOBER 30, 2026</p>
      <p className="body-text">
        Hey Priscilla, I made something for you. Take a little moment for
        yourself and open this.
      </p>
      <button className="button large" onClick={onOpen}>
        Open Your Birthday Surprise
      </button>
    </section>
  );
}

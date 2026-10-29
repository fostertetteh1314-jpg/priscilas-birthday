import { useEffect, useState } from 'react';
import { birthdayContent } from './data/birthdayContent';
import { mediaManifest } from './data/mediaManifest';
import { SceneInvitation } from './components/SceneInvitation';
import { SceneBirthday } from './components/SceneBirthday';
import { SceneGallery } from './components/SceneGallery';
import { SceneVideo } from './components/SceneVideo';
import { SceneLetter } from './components/SceneLetter';
import { SceneSecret } from './components/SceneSecret';
import { SceneFinale } from './components/SceneFinale';
import { MusicToggle } from './components/MusicToggle';

type SceneName =
  | 'invitation'
  | 'birthday'
  | 'gallery'
  | 'video'
  | 'letter'
  | 'secret'
  | 'finale';

function App() {
  const [scene, setScene] = useState<SceneName>('invitation');
  const [confettiFired, setConfettiFired] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scene]);

  const next = (target: SceneName) => {
    setScene(target);
  };

  const handleConfetti = () => {
    setConfettiFired(true);
  };

  const handleReplay = () => {
    setConfettiFired(false);
    setScene('invitation');
  };

  return (
    <main>
      {scene === 'invitation' && (
        <SceneInvitation onOpen={() => next('birthday')} />
      )}
      {scene === 'birthday' && (
        <SceneBirthday onNext={() => next('gallery')} />
      )}
      {scene === 'gallery' && (
        <SceneGallery
          photos={mediaManifest.photos}
          onNext={() => next('video')}
        />
      )}
      {scene === 'video' && (
        <SceneVideo
          videos={mediaManifest.videos}
          onNext={() => next('letter')}
        />
      )}
      {scene === 'letter' && (
        <SceneLetter
          letter={birthdayContent.letter.body}
          signature={birthdayContent.finale.signature}
          onNext={() => next('secret')}
        />
      )}
      {scene === 'secret' && (
        <SceneSecret
          kicker={birthdayContent.secret.kicker}
          body={birthdayContent.secret.body}
          buttonLabel={birthdayContent.secret.button}
          onNext={() => next('finale')}
        />
      )}
      {scene === 'finale' && (
        <SceneFinale
          title={birthdayContent.finale.title}
          body={birthdayContent.finale.body}
          signature={birthdayContent.finale.signature}
          confettiButton={birthdayContent.finale.confettiButton}
          replayButton={birthdayContent.finale.replayButton}
          onConfetti={handleConfetti}
          onReplay={handleReplay}
        />
      )}
      <MusicToggle />
      {confettiFired && <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />}
    </main>
  );
}

export default App;

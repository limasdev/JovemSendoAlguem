import './Loading3D.css';

export function Loading3D() {
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

  return (
    <div className="wrapper-grid">
      {letters.map((letter, index) => (
        <div key={index} className="cube">
          <div className="face face-front">{letter}</div>
          <div className="face face-back" />
          <div className="face face-right" />
          <div className="face face-left" />
          <div className="face face-top" />
          <div className="face face-bottom" />
        </div>
      ))}
    </div>
  );
}

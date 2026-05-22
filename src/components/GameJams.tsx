import { gameJams, type GameJam } from '../data/portfolio'

function JamCard({ jam }: { jam: GameJam }) {
  return (
    <article className="jam-card">
      <div className="jam-header">
        <h3 className="jam-name">{jam.name}</h3>
        <div className="jam-header-sub">
          {jam.date && <p className="jam-date">{jam.date}</p>}
          {jam.result && (
            <span className="jam-result">🏆 {jam.result}</span>
          )}
        </div>
      </div>

      {jam.theme && (
        <div className="jam-theme">
          <span className="jam-theme-label">テーマ</span>
          <span className="jam-theme-text">{jam.theme}</span>
        </div>
      )}

      <p className="jam-description">{jam.description}</p>

      <div className="jam-meta-row">
        <div className="jam-meta-item">
          <span className="jam-meta-label">PF</span>
          <span className="jam-meta-value">{jam.platform.join(' / ')}</span>
        </div>
        <div className="jam-meta-item">
          <span className="jam-meta-label">担当</span>
          <span className="jam-meta-value">{jam.role}</span>
        </div>
        <div className="jam-meta-item">
          <span className="jam-meta-label">チーム</span>
          <span className="jam-meta-value">{jam.team}</span>
        </div>
      </div>

      {jam.reflection && (
        <div className="jam-reflection">
          <span className="jam-reflection-icon">💡</span>
          <p>{jam.reflection}</p>
        </div>
      )}

      {jam.url && (
        <div className="jam-footer">
          <a href={jam.url} className="btn btn-outline work-btn" target="_blank" rel="noreferrer">
            制作物を見る →
          </a>
        </div>
      )}
    </article>
  )
}

export default function GameJams() {
  return (
    <section className="section" id="gamejams">
      <div className="container">
        <h2 className="section-title"><span>Game Jams</span></h2>
        <p className="section-sub">学校外部ゲームジャム参加実績</p>

        <div className="jam-grid">
          {gameJams.map((jam, i) => (
            <JamCard key={i} jam={jam} />
          ))}
        </div>
      </div>
    </section>
  )
}

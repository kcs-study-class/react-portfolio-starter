import { certifications, type Certification, type CertStatus } from '../data/portfolio'

const STATUS_CONFIG: Record<CertStatus, { color: string; bg: string; border: string }> = {
  '取得済み':  { color: '#4ade80', bg: 'rgba(74,222,128,0.1)',  border: 'rgba(74,222,128,0.3)'  },
  '受験予定':  { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.3)'  },
  '取得予定':  { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
  '学習中':    { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)'  },
}

const CATEGORY_ICONS: Record<string, string> = {
  '国家資格':     '🏛',
  '免許':         '🪪',
  'ベンダー認定': '🏅',
  '競プロ':       '⚡',
  'CTF':          '🚩',
  'ISUCON':       '🖥',
  '学習中':       '📖',
}

function StatusBadge({ status }: { status: CertStatus }) {
  const cfg = STATUS_CONFIG[status]
  return (
    <span
      className="cert-status"
      style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
    >
      {status}
    </span>
  )
}

function CertRow({ cert }: { cert: Certification }) {
  return (
    <div className="cert-row">
      <div className="cert-icon">
        {CATEGORY_ICONS[cert.category] ?? '📋'}
      </div>

      <div className="cert-main">
        <div className="cert-name-row">
          <p className="cert-name">{cert.name}</p>
          {cert.score && <span className="cert-score">{cert.score}</span>}
        </div>
        <p className="cert-date">{cert.date}</p>
      </div>

      <div className="cert-meta">
        <span className="cert-category">{cert.category}</span>
      </div>

      <StatusBadge status={cert.status} />
    </div>
  )
}

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <h2 className="section-title"><span>Certifications</span></h2>
        <p className="section-sub">資格・実績</p>

        <div className="cert-list">
          {certifications.map((cert, i) => (
            <CertRow key={i} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}

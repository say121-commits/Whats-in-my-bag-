import './App.css'

const previewCards = [
  {
    title: '장소 선택',
    description: '오늘 자주 가는 장소를 고르면 상황에 맞는 가방 준비를 시작할 수 있어요.',
  },
  {
    title: '소지품 고르기',
    description: '필요한 물건을 선택하거나 직접 입력해서 오늘의 체크리스트를 만들어요.',
  },
  {
    title: '가방 조합 저장',
    description: '마음에 드는 가방 조합은 저장해두고 다음에 다시 빠르게 불러올 수 있어요.',
  },
] as const

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Daily bag planner</p>
        <h1>오늘의 가방</h1>
        <p className="body">
          오늘 갈 장소와 챙길 물건을 정리하고, 내게 맞는 가방 조합을 한눈에 준비해보세요.
        </p>
        <button className="cta" type="button">
          오늘의 가방 만들기
        </button>
      </section>

      <section className="preview" aria-label="앞으로 들어갈 기능 미리보기">
        {previewCards.map((card, index) => (
          <article className="feature-card" key={card.title}>
            <p className="feature-step">0{index + 1}</p>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App

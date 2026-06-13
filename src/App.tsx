import { useState } from 'react'
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

const places = [
  { name: '학교', icon: '🎓', hint: '수업과 과제를 위한 준비' },
  { name: '카페', icon: '☕', hint: '가볍게 머무르며 집중하기' },
  { name: '알바', icon: '🧾', hint: '근무에 필요한 물건 챙기기' },
  { name: '여행', icon: '✈️', hint: '이동과 일정에 맞춘 조합' },
  { name: '도서관', icon: '📚', hint: '오래 머물며 공부하기' },
  { name: '직접 입력', icon: '✍️', hint: '내 일정에 맞는 장소 직접 정하기' },
] as const

const items = [
  '지갑',
  '휴대폰',
  '이어폰',
  '립밤',
  '노트북',
  '충전기',
  '다이어리',
  '물병',
  '열쇠',
  '파우치',
] as const

type Step = 'intro' | 'place' | 'items'

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[number] | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItem = (item: (typeof items)[number]) => {
    setSelectedItems((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    )
  }

  return (
    <main className="app">
      <div className="screen-shell">
        {currentStep === 'intro' && (
          <>
            <section className="hero">
              <p className="eyebrow">Daily bag planner</p>
              <h1>오늘의 가방</h1>
              <p className="body">
                오늘 갈 장소와 챙길 물건을 정리하고, 내게 맞는 가방 조합을 한눈에 준비해보세요.
              </p>
              <button className="cta" type="button" onClick={() => setCurrentStep('place')}>
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
          </>
        )}

        {currentStep === 'place' && (
          <section className="place-section" aria-labelledby="place-heading">
            <div className="step-header">
              <div className="section-copy">
                <p className="section-eyebrow">Step 01</p>
                <h2 id="place-heading">오늘 방문할 장소를 골라보세요</h2>
                <p className="section-body">
                  장소를 먼저 고르면, 다음 단계에서 어떤 물건을 챙길지 더 자연스럽게 정할 수 있어요.
                </p>
              </div>
            </div>

            <div className="place-grid" role="list" aria-label="장소 선택 목록">
              {places.map((place) => {
                const isSelected = selectedPlace?.name === place.name

                return (
                  <button
                    key={place.name}
                    className={`place-card${isSelected ? ' is-selected' : ''}`}
                    type="button"
                    onClick={() => setSelectedPlace(place)}
                  >
                    <span className="place-icon" aria-hidden="true">
                      {place.icon}
                    </span>
                    <span className="place-name">{place.name}</span>
                    <span className="place-hint">{place.hint}</span>
                  </button>
                )
              })}
            </div>

            <div className="selected-place" aria-live="polite">
              <p className="selected-label">선택한 장소</p>
              {selectedPlace ? (
                <div className="selected-place-card">
                  <span className="selected-icon" aria-hidden="true">
                    {selectedPlace.icon}
                  </span>
                  <div>
                    <strong>{selectedPlace.name}</strong>
                    <p>{selectedPlace.hint}</p>
                  </div>
                </div>
              ) : (
                <p className="selected-empty">
                  아직 장소를 고르지 않았어요. 위 카드 중 하나를 선택해보세요.
                </p>
              )}
            </div>

            <div className="step-actions">
              <button
                className="cta"
                type="button"
                onClick={() => setCurrentStep('items')}
                disabled={!selectedPlace}
              >
                다음으로
              </button>
              <button className="ghost-button" type="button" onClick={() => setCurrentStep('intro')}>
                처음으로
              </button>
            </div>
          </section>
        )}

        {currentStep === 'items' && (
          <section className="place-section" aria-labelledby="items-heading">
            <div className="step-header">
              <div className="section-copy">
                <p className="section-eyebrow">Step 02</p>
                <h2 id="items-heading">오늘 챙길 소지품을 골라보세요</h2>
                <p className="section-body">
                  선택한 장소에 맞춰 필요한 물건을 여러 개 선택할 수 있어요.
                </p>
              </div>
            </div>

            <div className="selected-place" aria-live="polite">
              <p className="selected-label">현재 선택</p>
              {selectedPlace ? (
                <div className="selected-place-card">
                  <span className="selected-icon" aria-hidden="true">
                    {selectedPlace.icon}
                  </span>
                  <div>
                    <strong>{selectedPlace.name}</strong>
                    <p>이 장소에 맞춰 오늘 필요한 소지품을 골라보세요.</p>
                  </div>
                </div>
              ) : (
                <p className="selected-empty">아직 선택된 장소가 없습니다.</p>
              )}
            </div>

            <div className="item-grid" role="list" aria-label="소지품 선택 목록">
              {items.map((item) => {
                const isSelected = selectedItems.includes(item)

                return (
                  <button
                    key={item}
                    className={`item-chip${isSelected ? ' is-selected' : ''}`}
                    type="button"
                    onClick={() => toggleItem(item)}
                  >
                    <span className="item-chip-mark" aria-hidden="true">
                      {isSelected ? '✓' : '+'}
                    </span>
                    <span>{item}</span>
                  </button>
                )
              })}
            </div>

            <div className="selected-items" aria-live="polite">
              <p className="selected-label">선택한 소지품</p>
              {selectedItems.length > 0 ? (
                <div className="selected-items-list">
                  {selectedItems.map((item) => (
                    <span className="selected-item-pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="selected-empty">아직 고른 소지품이 없어요. 필요한 물건을 여러 개 선택해보세요.</p>
              )}
            </div>

            <div className="step-actions">
              <button className="ghost-button" type="button" onClick={() => setCurrentStep('place')}>
                이전으로
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

export default App
nano src/App.css
.app {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px 48px;
  background:
    radial-gradient(circle at top, rgba(255, 244, 214, 0.9), transparent 32%),
    linear-gradient(180deg, #fff8eb 0%, #f5efe4 52%, #efe7da 100%);
}

.screen-shell {
  width: min(100%, 1080px);
}

.hero {
  width: 100%;
  margin: 0;
  padding: 64px 28px 32px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9a5b16;
}

h1 {
  margin: 0;
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 0.92;
  color: #1f2937;
}

.body {
  width: min(100%, 640px);
  margin: 20px auto 0;
  font-size: 1.125rem;
  color: #5b6472;
}

.cta {
  margin-top: 28px;
  border: 0;
  border-radius: 999px;
  padding: 16px 28px;
  font: inherit;
  font-size: 1rem;
  font-weight: 700;
  color: #fffdf8;
  background: linear-gradient(135deg, #d97706 0%, #ea580c 100%);
  box-shadow: 0 18px 32px rgba(217, 119, 6, 0.24);
  cursor: pointer;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    filter 160ms ease;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 38px rgba(217, 119, 6, 0.3);
  filter: saturate(1.05);
}

.cta:focus-visible {
  outline: 3px solid rgba(251, 191, 36, 0.5);
  outline-offset: 4px;
}

.preview {
  width: 100%;
  margin: 24px auto 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.feature-card {
  padding: 28px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 28px;
  background: rgba(255, 253, 248, 0.88);
  box-shadow: 0 18px 48px rgba(60, 47, 31, 0.08);
  backdrop-filter: blur(12px);
}

.feature-step {
  margin: 0 0 18px;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #c2410c;
}

.feature-card h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #1f2937;
}

.feature-card p:last-child {
  margin: 14px 0 0;
  color: #5b6472;
  line-height: 1.7;
}

.place-section {
  width: 100%;
  margin: 0 auto;
  padding: 36px 28px 32px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 32px;
  background: rgba(255, 252, 245, 0.9);
  box-shadow: 0 22px 56px rgba(60, 47, 31, 0.08);
}

.step-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.section-copy {
  max-width: 640px;
}

.section-eyebrow {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c2410c;
}

.place-section h2 {
  margin: 12px 0 0;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  color: #1f2937;
}

.section-body {
  margin: 16px 0 0;
  color: #5b6472;
  line-height: 1.7;
}

.place-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.place-card {
  text-align: left;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  padding: 22px 20px;
  background: #fffdf8;
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.place-card:hover {
  transform: translateY(-2px);
  border-color: rgba(217, 119, 6, 0.35);
  box-shadow: 0 18px 36px rgba(60, 47, 31, 0.08);
}

.place-card:focus-visible {
  outline: 3px solid rgba(251, 191, 36, 0.45);
  outline-offset: 4px;
}

.place-card.is-selected {
  border-color: rgba(217, 119, 6, 0.55);
  box-shadow: 0 20px 40px rgba(217, 119, 6, 0.12);
  background: linear-gradient(180deg, #fffaf0 0%, #fff7ed 100%);
}

.place-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: #fff3d8;
  font-size: 1.8rem;
}

.place-name {
  display: block;
  margin-top: 18px;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f2937;
}

.place-hint {
  display: block;
  margin-top: 10px;
  color: #5b6472;
  line-height: 1.6;
}

.selected-place {
  margin-top: 28px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 248, 235, 0.8);
}

.selected-label {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9a5b16;
}

.selected-place-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 14px;
}

.selected-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: #ffffff;
  font-size: 2rem;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.16);
}

.selected-place-card strong {
  display: block;
  font-size: 1.2rem;
  color: #1f2937;
}

.selected-place-card p,
.selected-empty {
  margin: 6px 0 0;
  color: #5b6472;
  line-height: 1.6;
}

.item-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.item-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  padding: 16px 14px;
  font: inherit;
  font-weight: 700;
  color: #374151;
  background: #fffdf8;
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
}

.item-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(217, 119, 6, 0.35);
  box-shadow: 0 14px 24px rgba(60, 47, 31, 0.08);
}

.item-chip:focus-visible {
  outline: 3px solid rgba(251, 191, 36, 0.35);
  outline-offset: 4px;
}

.item-chip.is-selected {
  border-color: rgba(217, 119, 6, 0.45);
  background: linear-gradient(180deg, #fffaf0 0%, #fff4e6 100%);
  box-shadow: 0 16px 28px rgba(217, 119, 6, 0.12);
}

.item-chip-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #fff3d8;
  color: #c2410c;
  flex-shrink: 0;
}

.selected-items {
  margin-top: 24px;
  padding: 22px;
  border-radius: 24px;
  background: rgba(255, 248, 235, 0.8);
}

.selected-items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
}

.selected-item-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: #ffffff;
  color: #8a5415;
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.14);
}

.step-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
}

.ghost-button {
  border: 1px solid rgba(154, 91, 22, 0.2);
  border-radius: 999px;
  padding: 14px 22px;
  font: inherit;
  font-size: 0.98rem;
  font-weight: 700;
  color: #8a5415;
  background: rgba(255, 253, 248, 0.9);
  cursor: pointer;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.ghost-button:hover {
  transform: translateY(-1px);
  border-color: rgba(217, 119, 6, 0.4);
  box-shadow: 0 14px 26px rgba(60, 47, 31, 0.08);
}

.ghost-button:focus-visible {
  outline: 3px solid rgba(251, 191, 36, 0.35);
  outline-offset: 4px;
}

.cta:disabled {
  cursor: not-allowed;
  background: linear-gradient(135deg, #d9d1c2 0%, #c8bca7 100%);
  box-shadow: none;
  transform: none;
  filter: none;
}

@media (max-width: 900px) {
  .preview {
    grid-template-columns: 1fr;
  }

  .place-grid {
    grid-template-columns: 1fr 1fr;
  }

  .item-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .step-header,
  .step-actions {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .app {
    padding: 20px 16px 40px;
  }

  .hero {
    padding: 36px 8px 24px;
  }

  .body {
    font-size: 1rem;
  }

  .feature-card {
    padding: 24px;
  }

  .place-section {
    padding: 28px 20px 24px;
  }

  .place-grid {
    grid-template-columns: 1fr;
  }

  .item-grid {
    grid-template-columns: 1fr 1fr;
  }

  .selected-place-card {
    align-items: flex-start;
  }
}import './App.css'

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

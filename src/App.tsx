import { useEffect, useState } from 'react'
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

const bags = [
  { name: '백팩', icon: '🎒', hint: '책과 노트북을 넉넉하게 담기 좋아요.' },
  { name: '토트백', icon: '👜', hint: '가볍게 들고 다니기 좋은 데일리 가방이에요.' },
  { name: '크로스백', icon: '🛍️', hint: '두 손이 자유로운 편한 외출용 가방이에요.' },
  { name: '숄더백', icon: '🪶', hint: '필요한 물건을 자연스럽게 챙기기 좋아요.' },
  { name: '에코백', icon: '〰️', hint: '가볍고 캐주얼한 분위기로 들기 좋아요.' },
] as const

type Step = 'intro' | 'place' | 'items' | 'bags' | 'summary'

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('intro')
  const [selectedPlace, setSelectedPlace] = useState<(typeof places)[number] | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [selectedBag, setSelectedBag] = useState<(typeof bags)[number] | null>(null)
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [customItems, setCustomItems] = useState<string[]>([])
  const [showCustomItemInput, setShowCustomItemInput] = useState(false)
  const [customItemInput, setCustomItemInput] = useState('')

  const allItems = [...items, ...customItems]

  const toggleItem = (item: string) => {
    setSelectedItems((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    )
  }

  const handleAddCustomItem = () => {
    const nextItem = customItemInput.trim()

    if (!nextItem || allItems.includes(nextItem)) {
      return
    }

    setCustomItems((currentItems) => [...currentItems, nextItem])
    setSelectedItems((currentItems) => [...currentItems, nextItem])
    setCustomItemInput('')
    setShowCustomItemInput(false)
  }

  const toggleCheckedItem = (item: string) => {
    setCheckedItems((currentItems) =>
      currentItems.includes(item)
        ? currentItems.filter((currentItem) => currentItem !== item)
        : [...currentItems, item],
    )
  }

  useEffect(() => {
    setCheckedItems((currentItems) =>
      currentItems.filter((currentItem) => selectedItems.includes(currentItem)),
    )
  }, [selectedItems])

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
                <h2 id="items-heading">오늘 필요한 소지품을 골라보세요</h2>
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
              {allItems.map((item) => {
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

              <button
                className={`item-chip item-chip-add${showCustomItemInput ? ' is-selected' : ''}`}
                type="button"
                onClick={() => setShowCustomItemInput((currentValue) => !currentValue)}
              >
                <span className="item-chip-mark" aria-hidden="true">
                  +
                </span>
                <span>직접 입력</span>
              </button>
            </div>

            {showCustomItemInput && (
              <div className="custom-item-panel">
                <label className="custom-item-label" htmlFor="custom-item-input">
                  추가할 소지품 이름
                </label>
                <div className="custom-item-form">
                  <input
                    id="custom-item-input"
                    className="custom-item-input"
                    type="text"
                    value={customItemInput}
                    onChange={(event) => setCustomItemInput(event.target.value)}
                    placeholder="예: 손수건"
                  />
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={handleAddCustomItem}
                    disabled={!customItemInput.trim() || allItems.includes(customItemInput.trim())}
                  >
                    추가
                  </button>
                </div>
              </div>
            )}

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
              <button
                className="cta"
                type="button"
                onClick={() => setCurrentStep('bags')}
                disabled={selectedItems.length === 0}
              >
                다음으로
              </button>
            </div>
          </section>
        )}

        {currentStep === 'bags' && (
          <section className="place-section" aria-labelledby="bags-heading">
            <div className="step-header">
              <div className="section-copy">
                <p className="section-eyebrow">Step 03</p>
                <h2 id="bags-heading">오늘 사용할 가방을 골라보세요</h2>
                <p className="section-body">
                  선택한 소지품을 담을 오늘의 가방을 하나 선택해보세요.
                </p>
              </div>
            </div>

            <div className="selected-place" aria-live="polite">
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
                <p className="selected-empty">아직 고른 소지품이 없습니다.</p>
              )}
            </div>

            <div className="bag-grid" role="list" aria-label="가방 선택 목록">
              {bags.map((bag) => {
                const isSelected = selectedBag?.name === bag.name

                return (
                  <button
                    key={bag.name}
                    className={`bag-card${isSelected ? ' is-selected' : ''}`}
                    type="button"
                    onClick={() => setSelectedBag(bag)}
                  >
                    <span className="bag-icon" aria-hidden="true">
                      {bag.icon}
                    </span>
                    <span className="bag-name">{bag.name}</span>
                    <span className="bag-hint">{bag.hint}</span>
                  </button>
                )
              })}
            </div>

            <div className="selected-place" aria-live="polite">
              <p className="selected-label">선택한 가방</p>
              {selectedBag ? (
                <div className="selected-place-card">
                  <span className="selected-icon" aria-hidden="true">
                    {selectedBag.icon}
                  </span>
                  <div>
                    <strong>{selectedBag.name}</strong>
                    <p>{selectedBag.hint}</p>
                  </div>
                </div>
              ) : (
                <p className="selected-empty">
                  아직 가방을 고르지 않았어요. 오늘 사용할 가방 하나를 선택해보세요.
                </p>
              )}
            </div>

            <div className="step-actions">
              <button className="ghost-button" type="button" onClick={() => setCurrentStep('items')}>
                이전으로
              </button>
              <button
                className="cta"
                type="button"
                onClick={() => setCurrentStep('summary')}
                disabled={!selectedBag}
              >
                다음으로
              </button>
            </div>
          </section>
        )}

        {currentStep === 'summary' && (
          <section className="place-section" aria-labelledby="summary-heading">
            <div className="step-header">
              <div className="section-copy">
                <p className="section-eyebrow">Step 04</p>
                <h2 id="summary-heading">오늘의 가방을 확인해보세요</h2>
                <p className="section-body">
                  지금까지 고른 장소, 소지품, 가방 정보를 한 번에 확인할 수 있어요.
                </p>
              </div>
            </div>

            <div className="summary-grid">
              <div className="summary-column">
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
                    <p className="selected-empty">선택한 장소가 없습니다.</p>
                  )}
                </div>

                <div className="selected-place" aria-live="polite">
                  <p className="selected-label">선택한 가방</p>
                  {selectedBag ? (
                    <div className="selected-place-card">
                      <span className="selected-icon" aria-hidden="true">
                        {selectedBag.icon}
                      </span>
                      <div>
                        <strong>{selectedBag.name}</strong>
                        <p>{selectedBag.hint}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="selected-empty">선택한 가방이 없습니다.</p>
                  )}
                </div>

                <div className="bag-preview-panel" aria-live="polite">
                  <p className="selected-label">오늘의 가방 구성</p>
                  <div className="bag-preview">
                    <div className="bag-preview-frame">
                      <div className="bag-preview-header">
                        <div className="bag-preview-emoji" aria-hidden="true">
                          {selectedBag?.icon ?? '🎒'}
                        </div>
                        <div className="bag-preview-copy">
                          <p className="bag-preview-name">{selectedBag?.name ?? '가방을 선택해주세요'}</p>
                          <p className="bag-preview-hint">
                            {selectedBag?.hint ?? '선택한 가방 정보가 여기에 표시됩니다.'}
                          </p>
                        </div>
                      </div>

                      <div className="bag-pocket">
                        <div className="bag-pocket-inner">
                          {selectedItems.length > 0 ? (
                            selectedItems.map((item) => (
                              <span className="bag-item-tag" key={item}>
                                {item}
                              </span>
                            ))
                          ) : (
                            <p className="selected-empty">가방 안에 표시할 소지품이 없습니다.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="selected-place summary-stat-card" aria-live="polite">
                  <p className="selected-label">소지품 개수</p>
                  <div className="summary-stat-content">
                    <strong>{selectedItems.length}개</strong>
                    <p>오늘 챙긴 물건이 가방 안에 태그 형태로 정리되어 보여요.</p>
                  </div>
                </div>

                <div className="selected-items" aria-live="polite">
                  <p className="selected-label">체크리스트</p>
                  {selectedItems.length > 0 ? (
                    <div className="checklist-list" role="list" aria-label="소지품 체크리스트">
                      {selectedItems.map((item) => (
                        <label
                          className={`checklist-item${checkedItems.includes(item) ? ' is-checked' : ''}`}
                          key={item}
                        >
                          <input
                            className="checklist-input"
                            type="checkbox"
                            checked={checkedItems.includes(item)}
                            onChange={() => toggleCheckedItem(item)}
                          />
                          <span className="checklist-box" aria-hidden="true">
                            {checkedItems.includes(item) ? '✓' : ''}
                          </span>
                          <span className="checklist-text">{item}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="selected-empty">선택한 소지품이 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button className="ghost-button" type="button" onClick={() => setCurrentStep('bags')}>
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

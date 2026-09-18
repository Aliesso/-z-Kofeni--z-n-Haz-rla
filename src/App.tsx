import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, DragOverlay, PointerSensor, TouchSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { CoffeeMachine } from './components/CoffeeMachine';
import { Cup } from './components/Cup';
import { CoffeeNameField } from './components/CoffeeNameField';
import { IngredientPalette } from './components/IngredientPalette';
import { OrderSummaryBar } from './components/OrderSummaryBar';
import { ConfirmationOverlay } from './components/ConfirmationOverlay';
import { AmbientBackground } from './components/AmbientBackground';
import { FlyingParticles, type FlyingParticle, type RectLike } from './components/FlyingParticles';
import { INGREDIENTS } from './data/ingredients';
import { useCoffeeBuilder } from './hooks/useCoffeeBuilder';
import { isSoundEnabled, playAddSound, playMaxSound, playRemoveSound, playSendSound, setSoundEnabled } from './lib/sound';
import type { Order } from './types';
import './App.css';

function makeOrderNumber() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function App() {
  const {
    coffeeName,
    setCoffeeName,
    selected,
    items,
    totalItems,
    addIngredient,
    decrementIngredient,
    removeIngredient,
    reset,
  } = useCoffeeBuilder();

  const [order, setOrder] = useState<Order | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [particles, setParticles] = useState<FlyingParticle[]>([]);
  const [cupBump, setCupBump] = useState(0);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const nextParticleId = useRef(0);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 6 } })
  );

  const isBrewing = totalItems > 0;
  const nameTrimmed = coffeeName.trim();
  const canSend = totalItems > 0 && nameTrimmed.length > 0;

  const spawnParticle = (icon: string, color: string, originRect?: RectLike) => {
    const cupEl = document.querySelector<HTMLElement>('[data-cup-target]');
    const cupRect = cupEl?.getBoundingClientRect();
    if (!cupRect) return;

    const toX = cupRect.left + cupRect.width / 2;
    const toY = cupRect.top + cupRect.height * 0.35;
    const fromX = originRect ? originRect.left + originRect.width / 2 : toX;
    const fromY = originRect ? originRect.top + originRect.height / 2 : toY;

    const id = nextParticleId.current++;
    setParticles((prev) => [...prev, { id, icon, color, fromX, fromY, toX, toY }]);
  };

  const handleParticleComplete = (id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
    setCupBump((n) => n + 1);
  };

  const handleAddFromPalette = (id: string, rect?: RectLike) => {
    const ingredient = INGREDIENTS.find((i) => i.id === id);
    const currentQty = selected.find((s) => s.id === id)?.qty ?? 0;
    if (ingredient && currentQty >= ingredient.maxQty) {
      playMaxSound();
      return;
    }
    addIngredient(id);
    if (ingredient) {
      spawnParticle(ingredient.icon, ingredient.color, rect);
      playAddSound();
    }
  };

  const handlePillIncrement = (id: string) => {
    const ingredient = INGREDIENTS.find((i) => i.id === id);
    const currentQty = selected.find((s) => s.id === id)?.qty ?? 0;
    if (ingredient && currentQty >= ingredient.maxQty) {
      playMaxSound();
      return;
    }
    addIngredient(id);
    setCupBump((n) => n + 1);
    playAddSound();
  };

  const handlePillDecrement = (id: string) => {
    decrementIngredient(id);
    playRemoveSound();
  };

  const handlePillRemove = (id: string) => {
    removeIngredient(id);
    playRemoveSound();
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    if (event.over?.id === 'cup-drop-zone') {
      const id = String(event.active.id);
      const ingredient = INGREDIENTS.find((i) => i.id === id);
      const currentQty = selected.find((s) => s.id === id)?.qty ?? 0;
      if (ingredient && currentQty >= ingredient.maxQty) {
        playMaxSound();
        return;
      }
      addIngredient(id);
      const initialRect = event.active.rect.current.initial;
      if (ingredient && initialRect) {
        spawnParticle(ingredient.icon, ingredient.color, initialRect);
        playAddSound();
      }
    }
  };

  const handleSend = () => {
    if (!canSend) return;
    setOrder({
      orderNumber: makeOrderNumber(),
      coffeeName: nameTrimmed,
      items,
      createdAt: new Date().toISOString(),
    });
    playSendSound();
  };

  const handleCloseConfirmation = () => {
    setOrder(null);
    reset();
  };

  const activeIngredient = activeId ? INGREDIENTS.find((i) => i.id === activeId) : null;

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <AmbientBackground />

      <div className="app">
        <motion.header
          className="app-header"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="app-header__brand">
            <motion.span
              className="app-header__mark"
              animate={{ rotate: [0, -6, 6, 0], y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ☕
            </motion.span>
            <div>
              <h1>Öz kofeni hazırla</h1>
              <p>Öz kofeni özün hazırla, adını üzərinə yaz, birbaşa kassaya göndər.</p>
            </div>
          </div>

          <motion.button
            type="button"
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={soundOn ? 'Səsi söndür' : 'Səsi aç'}
            aria-pressed={soundOn}
            whileTap={{ scale: 0.9 }}
          >
            {soundOn ? '🔊' : '🔇'}
          </motion.button>
        </motion.header>

        <main className="builder">
          <motion.section
            className="builder__machine-col"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <CoffeeMachine isBrewing={isBrewing} />
            <Cup items={items} bumpSignal={cupBump} />
          </motion.section>

          <motion.section
            className="builder__panel-col"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
          >
            <CoffeeNameField value={coffeeName} onChange={setCoffeeName} />
            <IngredientPalette selected={selected} onAdd={handleAddFromPalette} />
            <OrderSummaryBar
              items={items}
              totalItems={totalItems}
              canSend={canSend}
              onIncrement={handlePillIncrement}
              onDecrement={handlePillDecrement}
              onRemove={handlePillRemove}
              onReset={reset}
              onSend={handleSend}
            />
            {totalItems > 0 && nameTrimmed.length === 0 && (
              <motion.p
                className="builder__hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sifarişi göndərmək üçün kofenizə bir ad verin.
              </motion.p>
            )}
          </motion.section>
        </main>
      </div>

      <DragOverlay>
        {activeIngredient ? (
          <div className="drag-preview" style={{ backgroundColor: activeIngredient.color }}>
            <span>{activeIngredient.icon}</span>
          </div>
        ) : null}
      </DragOverlay>

      <FlyingParticles particles={particles} onComplete={handleParticleComplete} />

      <ConfirmationOverlay order={order} onClose={handleCloseConfirmation} />
    </DndContext>
  );
}

export default App;

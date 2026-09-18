import { AnimatePresence, motion } from 'framer-motion';
import './CoffeeMachine.css';

interface CoffeeMachineProps {
  isBrewing: boolean;
}

export function CoffeeMachine({ isBrewing }: CoffeeMachineProps) {
  return (
    <motion.div
      className="machine"
      aria-hidden="true"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="machine__vent" />
      <div className="machine__body">
        <span className="machine__sheen" />
        <div className="machine__badge">
          <span className={`machine__led ${isBrewing ? 'machine__led--on' : ''}`} />
          <span className="machine__badge-text">BREW&nbsp;CO.</span>
        </div>

        <div className="machine__display">
          <AnimatePresence mode="wait">
            <motion.span
              key={isBrewing ? 'brewing' : 'ready'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {isBrewing ? 'Hazırlanır…' : 'Coffee'}
            </motion.span>
          </AnimatePresence>
          {isBrewing && (
            <div className="machine__progress">
              <motion.span
                className="machine__progress-bar"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          )}
        </div>

        <div className="machine__handle" />
      </div>

      <div className="machine__group">
        <div className="machine__spout-mount" />
        <div className="machine__spout machine__spout--left" />
        <div className="machine__spout machine__spout--right" />

        {isBrewing && (
          <>
            <motion.span
              className="machine__stream machine__stream--left"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="machine__stream machine__stream--right"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            />
          </>
        )}
      </div>

      {isBrewing && (
        <div className="machine__steam">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="machine__steam-wisp"
              initial={{ opacity: 0, y: 0, x: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [-4, -34],
                x: [0, i % 2 === 0 ? 6 : -6],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeOut',
              }}
              style={{ left: `${30 + i * 20}%` }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

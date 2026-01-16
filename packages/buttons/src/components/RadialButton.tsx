import React, {
  useState,
  useRef,
  useLayoutEffect,
  type ReactElement,
  type TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { FiPlus, FiX } from 'react-icons/fi';
import { IconButton, type RadialTheme, THEMES } from './IconButton';

export interface RadialAction {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

interface RadialButtonProps {
  label: string;
  actions: RadialAction[];
  className?: string;
  icon?: ReactElement;
  theme?: RadialTheme;
}

const RADIUS = 88;

const SAFE_MARGIN = 120; // Radius + half button size + wiggle room

const calculateActionPosition = (
  index: number,
  total: number,
  startAngle: number,
  endAngle: number
) => {
  const angleRange = endAngle - startAngle;
  const divisor = Math.abs(angleRange - 2 * Math.PI) < 0.05 ? total : total - 1;
  const angle = startAngle + (index / divisor) * angleRange;

  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  return { x, y };
};

export const RadialButton: React.FC<RadialButtonProps> = ({
  label,
  actions,
  className = '',
  theme = 'berry',
  icon = <FiPlus size={20} />,
}) => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActionRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const [arc, setArc] = useState({ start: -Math.PI / 2, end: 1.5 * Math.PI });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const isInitialMount = useRef(true);

  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (expanded && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const { top, left, bottom, right, width, height } = rect;
      const { innerWidth, innerHeight } = window;

      setCoords({ x: left + width / 2, y: top + height / 2 });

      const isNearLeft = left < SAFE_MARGIN;
      const isNearRight = innerWidth - right < SAFE_MARGIN;
      const isNearTop = top < SAFE_MARGIN;
      const isNearBottom = innerHeight - bottom < SAFE_MARGIN;

      let start = -Math.PI / 2;
      let end = 1.5 * Math.PI;

      if (isNearLeft && isNearTop) {
        start = 0;
        end = Math.PI / 2;
      } else if (isNearRight && isNearTop) {
        start = Math.PI;
        end = Math.PI / 2;
      } else if (isNearLeft && isNearBottom) {
        start = -Math.PI / 2;
        end = 0;
      } else if (isNearRight && isNearBottom) {
        start = 1.5 * Math.PI;
        end = Math.PI;
      } else if (isNearLeft) {
        start = -Math.PI / 2;
        end = Math.PI / 2;
      } else if (isNearRight) {
        start = 1.5 * Math.PI;
        end = 0.5 * Math.PI;
      } else if (isNearTop) {
        start = Math.PI;
        end = 0;
      } else if (isNearBottom) {
        start = Math.PI;
        end = 2 * Math.PI;
      }

      setArc({ start, end });

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else if (!expanded && !isInitialMount.current) {
      toggleButtonRef.current?.focus();
    }

    isInitialMount.current = false;
  }, [expanded]);

  // Handle Escape key and focus trapping
  React.useEffect(() => {
    if (!expanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(false);
      }

      if (e.key === 'Tab') {
        const firstElement = closeButtonRef.current;
        const lastElement = lastActionRef.current;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expanded]);

  const expandedContent =
    expanded &&
    createPortal(
      <div className="fixed inset-0 z-800 flex items-center justify-center pointer-events-none">
        <div
          className="fixed inset-0 bg-transparent pointer-events-auto"
          onClick={() => setExpanded(false)}
        />

        <div
          className="absolute pointer-events-auto"
          style={{
            left: coords.x,
            top: coords.y,
            transform: 'translate(-50%, -50%)',
          }}
          role="menu"
          aria-label="Expanded radial menu"
        >
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border-4 opacity-90 pointer-events-none transition-all duration-500 ${THEMES[theme].bg} ${THEMES[theme].border}`}
          />

          <IconButton
            ref={closeButtonRef}
            size="lg"
            theme={theme}
            className="relative z-10"
            onClick={() => setExpanded(false)}
            aria-label="Close menu"
            title="Close menu"
          >
            <FiX size={24} />
          </IconButton>

          {actions.map((action, index) => {
            const { x, y } = calculateActionPosition(
              index,
              actions.length,
              arc.start,
              arc.end
            );
            const isLast = index === actions.length - 1;
            const isActive = activeLabel === action.label;

            return (
              <IconButton
                ref={isLast ? lastActionRef : null}
                theme={theme}
                onClick={() => {
                  action.onClick();
                  setExpanded(false);
                }}
                onMouseEnter={() => setActiveLabel(action.label)}
                onTouchStart={() => setActiveLabel(action.label)}
                onMouseLeave={() => setActiveLabel(null)}
                onFocus={() => setActiveLabel(action.label)}
                onBlur={() => setActiveLabel(null)}
                aria-label={action.label}
                data-action-label={action.label}
                key={action.label}
                title={action.label}
                className="user-select-none absolute left-1/2 top-1/2 focus:z-10 hover:z-10 active:z-10"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                }}
              >
                <div className="flex items-center gap-2">
                  {action.icon} {isActive && action.label}
                </div>
              </IconButton>
            );
          })}
        </div>
      </div>,
      document.body
    );

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
    >
      <IconButton
        ref={toggleButtonRef}
        theme={theme}
        size="lg"
        onClick={() => setExpanded(!expanded)}
        className={`${className} ${expanded ? 'opacity-0' : 'opacity-100'}`.trim()}
        aria-label={label}
        title={label}
      >
        <div className="flex items-center gap-2">
          {icon}
          {!icon && <span className="rounded-md">{label}</span>}
        </div>
      </IconButton>

      {expandedContent}
    </div>
  );
};

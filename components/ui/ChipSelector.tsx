import React, { useState, useMemo } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon.tsx';

interface ChipItem {
  id: string;
  name: string;
  [key: string]: any; // Allow other properties
}

interface ChipSelectorProps<T extends ChipItem> {
  title: string;
  options: string[];
  selected: T[];
  onUpdate: (items: T[]) => void;
  renderItem?: (item: T, removeItem: () => void, isComplete: boolean) => React.ReactNode;
  itemFactory?: (name: string) => T;
  isCollapsible?: boolean;
  titleClassName?: string;
  isItemComplete: (item: T) => boolean;
  placeholder?: string;
}

const ChipSelector = <T extends ChipItem>({
  title,
  options,
  selected,
  onUpdate,
  renderItem,
  itemFactory = (name: string) => ({ id: Date.now().toString(), name } as T),
  isCollapsible = false,
  titleClassName,
  isItemComplete,
  placeholder,
}: ChipSelectorProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsible || selected.length > 0);
  const [showAllChips, setShowAllChips] = useState(false);

  const CHIP_LIMIT = 6;

  const visibleSelected = showAllChips ? selected : selected.slice(0, CHIP_LIMIT);
  const hiddenSelectedCount = selected.length - visibleSelected.length;

  const availableOptions = useMemo(() => {
    const selectedNames = new Set(selected.map(s => s.name));
    return options.filter(opt => !selectedNames.has(opt));
  }, [options, selected]);
  
  const completedCount = useMemo(() => selected.filter(isItemComplete).length, [selected, isItemComplete]);
  const isSectionComplete = selected.length > 0 && completedCount === selected.length;

  const handleAdd = (name: string) => {
    const newItem = itemFactory(name);
    onUpdate([...selected, newItem]);
    if (isCollapsible && !isExpanded) setIsExpanded(true);
  };

  const handleRemove = (id: string) => {
    onUpdate(selected.filter(item => item.id !== id));
  };

  const defaultRenderItem = (item: T, removeItem: () => void, isComplete: boolean) => (
    <div key={item.id} className={`flex items-center gap-xs rounded-full p-1 pl-sm transition-all duration-fast ${isComplete ? 'bg-completed text-white shadow-sm' : 'bg-neutral-bg text-text-primary'}`}>
      <span className="text-caption font-medium">{item.name}</span>
      <button onClick={removeItem} className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isComplete ? 'hover:bg-white/20' : 'bg-neutral-hover text-neutral-text hover:bg-error/20 hover:text-error'}`}>&times;</button>
    </div>
  );

  return (
    <div className="bg-surface p-lg rounded-lg border border-border">
      <div className="flex justify-between items-center mb-md">
        <div className="flex items-center">
            {isSectionComplete && <div className="w-2 h-2 rounded-full bg-completed mr-sm"></div>}
            <h3 className={titleClassName || 'text-h3 text-text-primary'}>{title}</h3>
        </div>
        {isCollapsible && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1">
            <ChevronDownIcon className={`w-5 h-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {isExpanded && (
        <>
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-sm mb-md">
              {visibleSelected.map(item =>
                renderItem 
                  ? renderItem(item, () => handleRemove(item.id), isItemComplete(item))
                  : defaultRenderItem(item, () => handleRemove(item.id), isItemComplete(item))
              )}
               {hiddenSelectedCount > 0 && (
                <button onClick={() => setShowAllChips(true)} className="text-caption font-medium text-primary hover:underline">
                  +{hiddenSelectedCount} more
                </button>
              )}
              {showAllChips && (
                 <button onClick={() => setShowAllChips(false)} className="text-caption font-medium text-primary hover:underline">
                  Show less
                </button>
              )}
            </div>
          ) : (
            <p className="text-caption text-text-secondary mb-md">{placeholder}</p>
          )}

          <div className="flex flex-wrap gap-sm border-t border-border pt-md">
            {availableOptions.map(option => (
              <button
                key={option}
                onClick={() => handleAdd(option)}
                className="px-md py-sm bg-background border border-border rounded-md text-body text-text-secondary hover:border-primary hover:text-primary transition-colors"
              >
                + {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChipSelector;
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Stakeholder } from '../../types.ts';
import { ChevronDownIcon } from '../icons/ChevronDownIcon.tsx';

interface PersonSelectorProps {
  label: string;
  selectedPeople: Stakeholder[];
  onUpdate: (people: Stakeholder[]) => void;
  peoplePool: Stakeholder[];
  placeholder?: string;
  showGroups?: boolean;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({ 
    label, 
    selectedPeople, 
    onUpdate, 
    peoplePool,
    placeholder = "Select...",
    showGroups = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const availablePeople = useMemo(() => {
    const selectedIds = new Set(selectedPeople.map(s => s.id));
    return peoplePool.filter(s => !selectedIds.has(s));
  }, [selectedPeople, peoplePool]);
  
  const addPerson = (person: Stakeholder) => {
    onUpdate([...selectedPeople, person]);
  };

  const removePerson = (person: Stakeholder) => {
    onUpdate(selectedPeople.filter(s => s.id !== person.id));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderList = (people: Stakeholder[]) => (
    people.map(person => (
        <li
            key={person.id}
            onClick={() => addPerson(person)}
            className="flex items-center gap-md p-sm cursor-pointer hover:bg-neutral-bg"
        >
            <img src={person.avatar} alt={person.name} className="w-8 h-8 rounded-full" />
            <div>
            <p className="font-medium text-text-primary">{person.name}</p>
            <p className="text-caption text-text-secondary">{person.role}</p>
            </div>
        </li>
    ))
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block font-medium text-text-primary text-body mb-sm">
        {label}
      </label>
      <div 
        className="w-full min-h-[50px] px-sm py-1 border rounded-lg bg-background text-text-primary font-sans text-body transition-all duration-normal placeholder:text-text-secondary focus-within:ring-2 focus-within:ring-slate/30 focus-within:border-slate shadow-sm focus-within:shadow-md flex items-center flex-wrap gap-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedPeople.map(person => (
          <div key={person.id} className="flex items-center gap-xs bg-neutral-bg rounded-full p-1 pl-sm">
            <img src={person.avatar} alt={person.name} className="w-5 h-5 rounded-full" />
            <span className="text-caption font-medium text-text-primary">{person.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removePerson(person);
              }}
              className="w-5 h-5 rounded-full bg-neutral-hover text-neutral-text flex items-center justify-center hover:bg-error/20 hover:text-error transition-colors"
            >
              &times;
            </button>
          </div>
        ))}
        {!selectedPeople.length && <span className="text-text-secondary px-sm">{placeholder}</span>}
         <ChevronDownIcon className={`w-5 h-5 text-text-secondary absolute right-md top-[46px] transition-transform duration-normal ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 bottom-full mb-sm w-full bg-white border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <ul>
            {showGroups ? (
              <>
                {availablePeople.filter(s => s.type === 'agency').length > 0 && <li className="px-md pt-sm pb-xs text-xs font-semibold text-text-secondary uppercase">Agency</li>}
                {renderList(availablePeople.filter(s => s.type === 'agency'))}
                {availablePeople.filter(s => s.type === 'client').length > 0 && <li className="px-md pt-sm pb-xs text-xs font-semibold text-text-secondary uppercase border-t border-border mt-sm">Clients</li>}
                {renderList(availablePeople.filter(s => s.type === 'client'))}
              </>
            ) : (
              renderList(availablePeople)
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PersonSelector;
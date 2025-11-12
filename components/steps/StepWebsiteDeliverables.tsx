import React, { useState } from 'react';
import type { Brief, UxDeliverable, CreativeDeliverable, WebsiteFunctionality, CreativeDeliverablePhase, StepConfig } from '../../types.ts';
import { WEBSITE_DELIVERABLES, CONTEXTUAL_CONFIG } from '../../constants.ts';
import { SparklesIcon } from '../icons/SparklesIcon.tsx';
import { ChevronRightIcon } from '../icons/ChevronRightIcon.tsx';
import SideDrawer from '../ui/SideDrawer.tsx';
import Button from '../ui/Button.tsx';
import ChipSelector from '../ui/ChipSelector.tsx';

interface StepWebsiteDeliverablesProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
  onSetGuidance: (guidance: Partial<StepConfig> | null) => void;
}

const CreativeDrawerContent: React.FC<{ item: CreativeDeliverable; onUpdate: (updates: Partial<CreativeDeliverable>) => void; }> = ({ item, onUpdate }) => {
    const handlePhaseChange = (phase: CreativeDeliverablePhase) => {
        const newPhases = item.phases.includes(phase)
            ? item.phases.filter(p => p !== phase)
            : [...item.phases, phase];
        onUpdate({ phases: newPhases });
    };
    
    return (
        <div className="p-lg space-y-xl">
            <div>
                <label className="block text-body font-medium text-text-primary mb-sm">Final Format</label>
                <select value={item.format} onChange={e => onUpdate({ format: e.target.value as any })} className="w-full px-md py-3 border rounded-lg bg-background text-text-primary font-sans text-body transition-all duration-normal placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-slate/30 focus:border-slate shadow-sm focus:shadow-md">
                    <option value="">Select format</option>
                    <option value="Figma">Figma</option>
                    <option value="Webflow">Webflow</option>
                    <option value="PDF">PDF</option>
                </select>
            </div>
            <div>
                 <label className="block text-body font-medium text-text-primary mb-sm">Deliverables by Phase</label>
                 <div className="flex flex-wrap gap-sm">
                    {(['Wireframes', 'Design', 'Prototype'] as CreativeDeliverablePhase[]).map(phase => (
                        <button key={phase} onClick={() => handlePhaseChange(phase)} className={`px-md py-sm rounded-full border text-caption font-medium transition-colors ${item.phases.includes(phase) ? 'bg-primary text-white border-primary' : 'bg-surface border-border hover:border-slate'}`}>
                            {phase}
                        </button>
                    ))}
                 </div>
            </div>
             <div>
                <label className="block text-body font-medium text-text-primary mb-sm">Responsive Focus</label>
                <div className="flex gap-sm">
                    {(['Mobile-first', 'Desktop-first', 'Adaptive'] as const).map(focus => (
                         <button key={focus} onClick={() => onUpdate({ responsiveFocus: focus })} className={`flex-1 px-md py-sm rounded-lg border text-caption font-medium transition-colors ${item.responsiveFocus === focus ? 'bg-primary text-white border-primary' : 'bg-surface border-border hover:border-slate'}`}>
                            {focus}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-between bg-surface p-md rounded-lg border border-border">
                <label htmlFor="post-launch" className="text-body font-medium text-text-primary">Post-launch support?</label>
                <button
                    id="post-launch"
                    onClick={() => onUpdate({ postLaunchSupport: !item.postLaunchSupport })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.postLaunchSupport ? 'bg-primary' : 'bg-border'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.postLaunchSupport ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
    );
};


const StepWebsiteDeliverables: React.FC<StepWebsiteDeliverablesProps> = ({ data, onUpdate, onSetGuidance }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingCreative, setEditingCreative] = useState<CreativeDeliverable | null>(null);
    const [hasUsedSmartSuggest, setHasUsedSmartSuggest] = useState(false);

    const handleSmartSuggest = () => {
        setHasUsedSmartSuggest(true);
        onUpdate({
            uxDeliverables: [
                { id: '1', name: 'Sitemap', spec: '' },
                { id: '2', name: 'Wireframes', spec: 'Key pages for mobile and desktop' },
            ],
            creativeDeliverables: [
                { id: '1', name: 'Moodboard / Style Tile', format: 'Figma', phases: ['Design'], responsiveFocus: 'Mobile-first', postLaunchSupport: false },
                { id: '2', name: 'Visual Design System', format: 'Figma', phases: ['Design', 'Prototype'], responsiveFocus: 'Mobile-first', postLaunchSupport: false },
            ],
            functionality: {
                ...data.functionality,
                pages: ['Homepage', 'About Us', 'Contact'],
                functionality: ['Forms'],
                accessibility: ['WCAG 2.1 AA'],
            }
        });
    };
    
    const clearSuggestions = () => {
        setHasUsedSmartSuggest(false);
        onUpdate({
            uxDeliverables: [],
            creativeDeliverables: [],
            functionality: { functionality: [], integrations: [], accessibility: [], pages: [] }
        });
    }

    // UX Handlers
    const handleUxUpdate = (items: UxDeliverable[]) => onUpdate({ uxDeliverables: items });
    const handleUxSpecChange = (id: string, spec: string) => {
        const updated = data.uxDeliverables.map(item => item.id === id ? { ...item, spec } : item);
        handleUxUpdate(updated);
    };

    // Creative Handlers
    const handleCreativeUpdate = (items: CreativeDeliverable[]) => onUpdate({ creativeDeliverables: items });
    const handleEditCreative = (item: CreativeDeliverable) => {
        setEditingCreative(item);
        setDrawerOpen(true);
    };
    const handleUpdateCreativeDetails = (updates: Partial<CreativeDeliverable>) => {
        if (!editingCreative) return;
        const updated = data.creativeDeliverables.map(item => item.id === editingCreative.id ? { ...item, ...updates } : item);
        setEditingCreative({ ...editingCreative, ...updates });
        handleCreativeUpdate(updated);
    };
    
    // Functionality Handlers
    const handleFunctionalityUpdate = (category: keyof WebsiteFunctionality, items: string[]) => {
        onUpdate({ functionality: { ...data.functionality, [category]: items } });
    };

    const guidance = CONTEXTUAL_CONFIG.Website.website_deliverables_guidance;

  return (
    <>
        <div className="space-y-2xl">
            <div className="flex justify-end">
                {hasUsedSmartSuggest ? (
                    <div className="text-right">
                        <p className="text-caption text-text-secondary">✨ Smart Suggest added common website deliverables.</p>
                        <button onClick={clearSuggestions} className="text-caption text-primary hover:underline">Clear Suggestions</button>
                    </div>
                ) : (
                    <Button onClick={handleSmartSuggest} variant="secondary" size="small">
                        <SparklesIcon className="w-4 h-4 mr-xs" />
                        Smart Suggest
                    </Button>
                )}
            </div>

            {/* UX DELIVERABLES */}
            <div onMouseEnter={() => onSetGuidance(guidance.UX)}>
                <ChipSelector
                    title="UX Deliverables"
                    titleClassName="text-body font-medium text-text-primary"
                    options={WEBSITE_DELIVERABLES.UX}
                    selected={data.uxDeliverables}
                    onUpdate={handleUxUpdate}
                    isItemComplete={(item) => !!item.spec.trim()}
                    itemFactory={(name): UxDeliverable => ({ id: Date.now().toString(), name, spec: '' })}
                    renderItem={(item, removeItem, isComplete) => (
                        <div key={item.id} className={`w-full border rounded-lg p-sm flex items-start gap-sm transition-colors ${isComplete ? 'border-completed' : 'border-border'}`}>
                            <div className={`flex-shrink-0 font-medium text-caption px-sm py-1 rounded-full transition-colors ${isComplete ? 'bg-completed text-white' : 'bg-primary/10 text-primary'}`}>{item.name}</div>
                            <input 
                                type="text" 
                                value={item.spec}
                                onChange={(e) => handleUxSpecChange(item.id, e.target.value)}
                                placeholder="Add a note or spec..."
                                className="flex-grow bg-transparent focus:outline-none text-body text-text-primary placeholder:text-text-secondary/70"
                            />
                            <button onClick={removeItem} className="text-text-secondary hover:text-error text-xl font-bold p-1 leading-none">&times;</button>
                        </div>
                    )}
                />
            </div>
            
            {/* CREATIVE DELIVERABLES */}
            <div onMouseEnter={() => onSetGuidance(guidance.Creative)}>
                <ChipSelector
                     title="Creative Deliverables"
                     titleClassName="text-body font-medium text-text-primary"
                     options={WEBSITE_DELIVERABLES.CREATIVE}
                     selected={data.creativeDeliverables}
                     onUpdate={handleCreativeUpdate}
                     isItemComplete={(item) => !!item.format}
                     renderItem={(item, removeItem, isComplete) => (
                        <div key={item.id} className={`flex items-center gap-sm p-1 pr-sm rounded-full transition-colors ${isComplete ? 'bg-completed text-white shadow-sm' : 'bg-surface border border-border'}`}>
                            <span className="text-body font-medium ml-sm">{item.name}</span>
                            <button onClick={() => handleEditCreative(item)} className={`p-1 ${isComplete ? 'hover:bg-white/20' : 'text-text-secondary hover:text-primary'}`}><ChevronRightIcon className="w-4 h-4" /></button>
                            <button onClick={removeItem} className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors text-sm ${isComplete ? 'hover:bg-white/20' : 'bg-neutral-hover text-neutral-text hover:bg-error/20 hover:text-error'}`}>&times;</button>
                        </div>
                     )}
                     itemFactory={(name): CreativeDeliverable => ({ id: Date.now().toString(), name, format: '', phases: [], responsiveFocus: '', postLaunchSupport: false })}
                />
            </div>

            {/* FUNCTIONALITY & PAGES */}
            <div className="space-y-lg" onMouseEnter={() => onSetGuidance(guidance.Functionality)}>
                <h2 className="text-h2 text-text-primary">Functionality & Pages</h2>
                 {(Object.keys(WEBSITE_DELIVERABLES.FUNCTIONALITY) as Array<keyof typeof WEBSITE_DELIVERABLES.FUNCTIONALITY>).map((key) => {
                    const categoryData = WEBSITE_DELIVERABLES.FUNCTIONALITY[key];
                    const categoryMap: Record<keyof typeof WEBSITE_DELIVERABLES.FUNCTIONALITY, keyof WebsiteFunctionality> = {
                      'Functionality': 'functionality',
                      'Integrations & Platforms': 'integrations',
                      'Accessibility / Compliance': 'accessibility',
                      'Pages': 'pages',
                    };
                    const category = categoryMap[key];
                    return (
                        // FIX: Wrap ChipSelector in a div and move the key prop to it to resolve a TypeScript error.
                        <div key={key}>
                            <ChipSelector
                                title={key}
                                titleClassName="text-body font-medium text-text-primary"
                                options={categoryData.options}
                                selected={data.functionality[category].map(name => ({ id: name, name }))}
                                onUpdate={(items) => handleFunctionalityUpdate(category, items.map(i => i.name))}
                                isItemComplete={() => true}
                                isCollapsible
                                placeholder={categoryData.placeholder}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
        
        {editingCreative && (
            <SideDrawer 
                isOpen={drawerOpen} 
                onClose={() => setDrawerOpen(false)}
                title={`Editing: ${editingCreative.name}`}
            >
                <CreativeDrawerContent item={editingCreative} onUpdate={handleUpdateCreativeDetails} />
            </SideDrawer>
        )}
    </>
  );
};

export default StepWebsiteDeliverables;
import React, { useState } from 'react';
import type { Brief, SocialPlatform, SocialFormat } from '../../types.ts';
import { SOCIAL_PLATFORMS } from '../../constants.ts';
import { ChevronDownIcon } from '../icons/ChevronDownIcon.tsx';
import ConfirmSocialPlatformRemoveModal from '../ConfirmSocialPlatformRemoveModal.tsx';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';

interface StepSocialCampaignProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
}

const CustomFormatForm: React.FC<{
  platformName: string;
  onAdd: (name: string, spec: string) => void;
  onCancel: () => void;
}> = ({ platformName, onAdd, onCancel }) => {
  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, spec);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-md mb-md bg-surface border border-border rounded-lg space-y-md">
      <h4 className="font-medium text-body text-text-primary">Add Custom Format for {platformName}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <Input label="" id="custom-name" value={name} onChange={e => setName(e.target.value)} placeholder="Format Name (e.g., Animated Banner)" />
        <Input label="" id="custom-spec" value={spec} onChange={e => setSpec(e.target.value)} placeholder="Spec (e.g., 1080x1080)" />
      </div>
      <div className="flex justify-end gap-sm">
        <Button type="button" onClick={onCancel} variant="tertiary" size="small">Cancel</Button>
        <Button type="submit" variant="secondary" size="small">Add Format</Button>
      </div>
    </form>
  );
};


const StepSocialCampaign: React.FC<StepSocialCampaignProps> = ({ data, onUpdate }) => {
  const [expandedPlatforms, setExpandedPlatforms] = useState<Record<string, boolean>>({});
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; platform: any | null }>({ isOpen: false, platform: null });
  const [customFormatPlatformId, setCustomFormatPlatformId] = useState<string | null>(null);

  const selectedPlatformIds = new Set(data.socialCampaign.platforms.map(p => p.id));

  const updateSocialCampaign = (platforms: SocialPlatform[]) => {
    onUpdate({ socialCampaign: { ...data.socialCampaign, platforms } });
  };

  const handlePlatformToggle = (platformData: typeof SOCIAL_PLATFORMS[0]) => {
    const isSelected = selectedPlatformIds.has(platformData.id);
    if (isSelected) {
      const platformInState = data.socialCampaign.platforms.find(p => p.id === platformData.id);
      const hasSelectedFormats = platformInState?.formats.some(f => f.selected);
      if (hasSelectedFormats) {
        setConfirmModal({ isOpen: true, platform: platformInState });
      } else {
        updateSocialCampaign(data.socialCampaign.platforms.filter(p => p.id !== platformData.id));
      }
    } else {
      const newPlatform: SocialPlatform = {
        id: platformData.id,
        name: platformData.name,
        formats: platformData.formats.map(f => ({ ...f, id: `${platformData.id}-${f.name}`, selected: false })),
      };
      updateSocialCampaign([...data.socialCampaign.platforms, newPlatform]);
      setExpandedPlatforms(prev => ({ ...prev, [platformData.id]: true }));
    }
  };
  
  const handleConfirmRemove = () => {
    if (confirmModal.platform) {
      updateSocialCampaign(data.socialCampaign.platforms.filter(p => p.id !== confirmModal.platform.id));
    }
    setConfirmModal({ isOpen: false, platform: null });
  };

  const handleFormatToggle = (platformId: string, formatId: string) => {
    const newPlatforms = data.socialCampaign.platforms.map(p => {
      if (p.id === platformId) {
        return {
          ...p,
          formats: p.formats.map(f => f.id === formatId ? { ...f, selected: !f.selected } : f)
        };
      }
      return p;
    });
    updateSocialCampaign(newPlatforms);
  };

  const handleAddCustomFormat = (platformId: string, name: string, spec: string) => {
    const newPlatforms = data.socialCampaign.platforms.map(p => {
      if (p.id === platformId) {
        const newFormat: SocialFormat = {
          id: `${platformId}-custom-${Date.now()}`,
          name,
          spec,
          selected: true,
          isCustom: true,
        };
        return { ...p, formats: [...p.formats, newFormat] };
      }
      return p;
    });
    updateSocialCampaign(newPlatforms);
    setCustomFormatPlatformId(null);
  };

  return (
    <div className="space-y-xl">
      <div>
        <h3 className="text-body font-medium text-text-primary mb-md">Platform Selector</h3>
        <div className="flex flex-wrap gap-md">
          {SOCIAL_PLATFORMS.map(platform => {
            const isSelected = selectedPlatformIds.has(platform.id);
            const platformInState = isSelected ? data.socialCampaign.platforms.find(p => p.id === platform.id) : null;
            const isComplete = !!platformInState && platformInState.formats.some(f => f.selected);
            const { icon: Icon } = platform;

            return (
              <button
                key={platform.id}
                onClick={() => handlePlatformToggle(platform)}
                role="switch"
                aria-checked={isSelected}
                className={`flex items-center gap-sm p-sm pr-md rounded-lg border-2 transition-all duration-fast shadow-sm hover:-translate-y-px hover:shadow-md
                  ${isComplete 
                    ? 'bg-completed text-white border-completed' 
                    : isSelected 
                    ? 'bg-primary/10 text-primary border-primary' 
                    : 'bg-surface border-border hover:border-slate'
                  }`}
              >
                <Icon className={`w-6 h-6 p-1 rounded-md ${isComplete ? 'bg-white/20' : 'bg-white'}`} />
                <span className="font-medium text-body">{platform.name}</span>
              </button>
            )
          })}
        </div>
        {!selectedPlatformIds.size && <p className="text-caption text-text-secondary mt-md">Select platforms to see available formats.</p>}
      </div>

      {data.socialCampaign.platforms.length > 0 && (
        <div className="space-y-md">
          {data.socialCampaign.platforms.map(platform => {
            const isExpanded = expandedPlatforms[platform.id] ?? false;
            return (
              <div key={platform.id} className="bg-surface border border-border rounded-lg">
                <button
                  onClick={() => setExpandedPlatforms(prev => ({...prev, [platform.id]: !isExpanded }))}
                  className="w-full flex justify-between items-center p-md text-left"
                >
                  <h4 className="font-semibold text-body text-text-primary">{platform.name} &bull; <span className="font-normal text-text-secondary">Select formats</span></h4>
                  <ChevronDownIcon className={`w-5 h-5 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="p-md border-t border-border">
                    <p className="text-caption text-text-secondary mb-md">Select the assets you’ll produce. Specs shown are platform-recommended.</p>
                    <div className="flex flex-wrap gap-sm">
                      {platform.formats.map(format => (
                        <button
                          key={format.id}
                          onClick={() => handleFormatToggle(platform.id, format.id)}
                          className={`flex items-center gap-xs p-1 pr-sm rounded-full border-2 transition-all hover:shadow-md hover:-translate-y-px
                            ${format.selected ? 'bg-completed border-completed text-white' : 'bg-surface border-border hover:border-primary'}
                          `}
                        >
                          <span className="font-medium text-caption ml-sm">{format.name}</span>
                          <span className={`text-xs opacity-70 ${format.selected ? '' : 'text-text-secondary'}`}>{format.spec}</span>
                        </button>
                      ))}
                      <button 
                        onClick={() => setCustomFormatPlatformId(platform.id)}
                        className="p-sm text-caption text-text-secondary border-2 border-dashed border-border rounded-full hover:border-primary hover:text-primary transition-colors"
                      >
                        + Custom Format
                      </button>
                    </div>
                     {customFormatPlatformId === platform.id && (
                        <div className="mt-md">
                            <CustomFormatForm 
                                platformName={platform.name}
                                onAdd={(name, spec) => handleAddCustomFormat(platform.id, name, spec)}
                                onCancel={() => setCustomFormatPlatformId(null)}
                            />
                        </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {confirmModal.isOpen && (
        <ConfirmSocialPlatformRemoveModal
          platformName={confirmModal.platform?.name || ''}
          onClose={() => setConfirmModal({ isOpen: false, platform: null })}
          onConfirm={handleConfirmRemove}
        />
      )}
    </div>
  );
};

export default StepSocialCampaign;
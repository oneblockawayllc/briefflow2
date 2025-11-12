import React, { useState } from 'react';
import type { Brief, BrandDocument } from '../../types.ts';
import Textarea from '../ui/Textarea.tsx';
import { SparklesIcon } from '../icons/SparklesIcon.tsx';
import InsightSuggestionModal from '../InsightSuggestionModal.tsx';
import { suggestInsight } from '../../services/geminiService.ts';
import Input from '../ui/Input.tsx';
import Button from '../ui/Button.tsx';

interface StepAudienceProps {
  data: Brief;
  onUpdate: (updates: Partial<Brief>) => void;
}

const StepAudience: React.FC<StepAudienceProps> = ({ data, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const handleGenerateInsights = async () => {
    if (!data.primaryObjective || !data.targetAudience) {
      alert("Please describe your Target Audience first.");
      return;
    }
    setIsModalOpen(true);
    setIsLoading(true);
    try {
      const suggested = await suggestInsight(data.primaryObjective, data.targetAudience, data.audienceDocuments, data.projectType);
      setInsights(suggested);
    } catch (error) {
      console.error(error);
      setInsights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectInsight = (insight: string) => {
    onUpdate({ keyTension: insight });
    setIsModalOpen(false);
  };

  // Handlers for Audience Documents
  const handleAudienceDocChange = (id: string, value: string) => {
    const newDocs = data.audienceDocuments.map(doc => 
      doc.id === id ? { ...doc, name: value } : doc
    );
    onUpdate({ audienceDocuments: newDocs });
  };
  const addAudienceDoc = () => {
    const newDoc: BrandDocument = { id: Date.now().toString(), name: '', type: 'LINK' };
    onUpdate({ audienceDocuments: [...data.audienceDocuments, newDoc] });
  };
  const removeAudienceDoc = (id: string) => {
    onUpdate({ audienceDocuments: data.audienceDocuments.filter(d => d.id !== id) });
  };
  
  // Handlers for Industry Research Documents
  const handleIndustryDocChange = (id: string, value: string) => {
    const newDocs = data.industryResearchDocuments.map(doc => 
      doc.id === id ? { ...doc, name: value } : doc
    );
    onUpdate({ industryResearchDocuments: newDocs });
  };
  const addIndustryDoc = () => {
    const newDoc: BrandDocument = { id: Date.now().toString(), name: '', type: 'LINK' };
    onUpdate({ industryResearchDocuments: [...data.industryResearchDocuments, newDoc] });
  };
  const removeIndustryDoc = (id: string) => {
    onUpdate({ industryResearchDocuments: data.industryResearchDocuments.filter(d => d.id !== id) });
  };

  return (
    <>
      <div className="space-y-xl">
        <div className="grid grid-cols-1 gap-xl">
          <div>
            <Textarea 
              label="Target Audience"
              id="targetAudience"
              value={data.targetAudience}
              onChange={(e) => onUpdate({ targetAudience: e.target.value })}
              placeholder="Describe who they are, what they care about, and what drives them."
            />
            <div className="mt-md space-y-md">
              {data.audienceDocuments.map((doc, index) => (
                <div key={doc.id} className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-sm items-start">
                  <Input 
                    label={index === 0 ? "Document Name or Link" : ""} 
                    id={`audience-doc-${doc.id}`} 
                    value={doc.name} 
                    onChange={e => handleAudienceDocChange(doc.id, e.target.value)} 
                    placeholder="e.g., Persona PDF, Research Deck URL"
                  />
                  <div className="flex items-end h-full">
                    <button onClick={() => removeAudienceDoc(doc.id)} className={`text-text-secondary hover:text-error p-2 ${index === 0 ? 'mt-9' : 'mt-1'} h-10 w-10 transition-colors font-bold text-xl`} aria-label="Remove document">
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <Button onClick={addAudienceDoc} variant="secondary" size="small">
                + Upload Persona Document
              </Button>
            </div>
          </div>

          <div className="relative">
            <Textarea 
              label="Key Audience Tension / Insight"
              id="keyTension"
              value={data.keyTension}
              onChange={(e) => onUpdate({ keyTension: e.target.value })}
              placeholder="What’s the unmet need or tension your message should address?"
            />
             <button
              onClick={handleGenerateInsights}
              className="absolute top-[38px] right-sm inline-flex items-center justify-center gap-xs px-md py-2 font-sans font-medium text-button leading-none rounded-lg cursor-pointer transition-all duration-normal bg-primary/10 text-primary hover:bg-primary/20"
              title="Need a spark? Let AI surface a few audience insights."
            >
              <SparklesIcon className="w-4 h-4" />
              Suggest with AI
            </button>
          </div>
           <Textarea 
            label="Key Messaging"
            id="keyMessaging"
            value={data.keyMessaging}
            onChange={(e) => onUpdate({ keyMessaging: e.target.value })}
            placeholder="What is the core message we want the audience to take away?"
          />
          <div>
            <Textarea 
              label="Industry/Category Insights"
              id="industryInsights"
              value={data.industryInsights}
              onChange={(e) => onUpdate({ industryInsights: e.target.value })}
              placeholder="What's happening in the market? Note any relevant trends, competitor activity, or cultural context."
            />
             <div className="mt-md space-y-md">
              {data.industryResearchDocuments.map((doc, index) => (
                <div key={doc.id} className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-sm items-start">
                  <Input 
                    label={index === 0 ? "Document Name or Link" : ""} 
                    id={`industry-doc-${doc.id}`} 
                    value={doc.name} 
                    onChange={e => handleIndustryDocChange(doc.id, e.target.value)} 
                    placeholder="e.g., Competitor Analysis, Market Trends Report"
                  />
                  <div className="flex items-end h-full">
                    <button onClick={() => removeIndustryDoc(doc.id)} className={`text-text-secondary hover:text-error p-2 ${index === 0 ? 'mt-9' : 'mt-1'} h-10 w-10 transition-colors font-bold text-xl`} aria-label="Remove document">
                      &times;
                    </button>
                  </div>
                </div>
              ))}
              <Button onClick={addIndustryDoc} variant="secondary" size="small">
                + Upload Industry Research
              </Button>
            </div>
          </div>
          <Textarea 
            label="Proof Points"
            id="proofPoints"
            value={data.proofPoints}
            onChange={(e) => onUpdate({ proofPoints: e.target.value })}
            placeholder="Any facts, features, or truths that back up your message?"
          />
        </div>
      </div>
      {isModalOpen && (
        <InsightSuggestionModal
          isLoading={isLoading}
          insights={insights}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectInsight}
        />
      )}
    </>
  );
};

export default StepAudience;
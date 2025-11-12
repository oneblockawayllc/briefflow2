import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon.tsx';
import Button from './ui/Button.tsx';

interface ConfirmSocialPlatformRemoveModalProps {
  platformName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmSocialPlatformRemoveModal: React.FC<ConfirmSocialPlatformRemoveModalProps> = ({ platformName, onClose, onConfirm }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-lg"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-lg shadow-lg w-full max-w-md border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-xl text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-warning/10">
                <AlertTriangleIcon className="h-6 w-6 text-warning" />
            </div>
            <h3 className="mt-md text-h3 text-text-primary">Remove {platformName}?</h3>
            <div className="mt-sm text-body text-text-secondary">
                <p>This platform has selected formats. Removing it will clear this scope.</p>
                <p className="font-medium text-text-primary mt-sm">Are you sure you want to continue?</p>
            </div>
        </div>
        <div className="px-lg py-md bg-surface flex justify-end gap-sm border-t border-border">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="primary" className="bg-error border-error hover:bg-red-600 hover:border-red-600">
            Remove Platform
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSocialPlatformRemoveModal;
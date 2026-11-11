import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property } from '../types';

interface EnquiryModalContextType {
  isOpen: boolean;
  selectedProperty: Property | null;
  openEnquiryModal: (property?: Property | null) => void;
  closeEnquiryModal: () => void;
  selectedPropertyDetail: Property | null;
  openPropertyDetail: (property: Property) => void;
  closePropertyDetail: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export const EnquiryModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedPropertyDetail, setSelectedPropertyDetail] = useState<Property | null>(null);

  const openEnquiryModal = (property?: Property | null) => {
    setSelectedProperty(property || null);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  const openPropertyDetail = (property: Property) => {
    setSelectedPropertyDetail(property);
  };

  const closePropertyDetail = () => {
    setSelectedPropertyDetail(null);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        selectedProperty,
        openEnquiryModal,
        closeEnquiryModal,
        selectedPropertyDetail,
        openPropertyDetail,
        closePropertyDetail,
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};

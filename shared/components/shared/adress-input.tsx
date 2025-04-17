'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="de41a271544ce70874ff7c131eeb4d575c7846e7"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};

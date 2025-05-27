import React from 'react';

declare global {
  interface Window {
    daum: any;
  }
}

interface Props {
  onAddressSelect: (address: string) => void;
}

const AddressSearch: React.FC<Props> = ({ onAddressSelect }) => {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onAddressSelect(data.address);
      },
    }).open();
  };

  return <button type="button" onClick={openPostcode}>주소 검색</button>;
};

export default AddressSearch;

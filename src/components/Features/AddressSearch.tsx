import React from 'react';

declare global {
  interface Window {
    daum: {
      Postcode: new (options: { oncomplete: (data: DaumPostcodeData) => void }) => {
        open: () => void;
      };
    };
  }
}

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
  zonecode: string;
  [key: string]: unknown; // 필요 시 확장 가능
}

interface Props {
  onAddressSelect: (address: string) => void;
}

const AddressSearch: React.FC<Props> = ({ onAddressSelect }) => {
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        onAddressSelect(data.address);
      },
    }).open();
  };

  return (
    <button type="button" onClick={openPostcode}>
      주소 검색
    </button>
  );
};

export default AddressSearch;

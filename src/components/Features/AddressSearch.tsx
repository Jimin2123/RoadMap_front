import React from 'react';
import SearchIcon from '../SettingIcons/SearchIcon';

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
  [key: string]: unknown;
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
    <button
      type="button"
      onClick={openPostcode}
      aria-label="주소 검색"
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <SearchIcon />
    </button>
  );
};

export default AddressSearch;

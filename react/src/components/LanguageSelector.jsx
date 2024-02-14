import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import tn from '../assets/tn.png';
import de from '../assets/de.png';
import gb from '../assets/gb.png';
import fr from '../assets/fr.png';
import './LanguageSelector.css'; // Make sure you have the corresponding CSS file for styles

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
 
  const toggleDropdown = () => setOpen(!open);

  // Function to change the language
  const selectLanguage = (language) => {
    i18n.changeLanguage(language); // This will change the language
    setOpen(false); // Close the dropdown
  };

  return (
    <div className="language-selector" onBlur={() => setOpen(false)} tabIndex="0">
      <div className="selected-language" onClick={toggleDropdown}>
        {i18n.language.toUpperCase()}
      </div>
      {open && (
        <ul className="language-list">
          <li onClick={() => selectLanguage('en')}><img src={gb}/> English</li>
          <li onClick={() => selectLanguage('de')}><img src={de}/> German</li>
          <li onClick={() => selectLanguage('fr')}><img src={fr}/> French</li>
          <li onClick={() => selectLanguage('ar')}><img src={tn}/> Arabic</li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;

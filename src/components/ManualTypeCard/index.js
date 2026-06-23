import React from 'react';
import '../../css/manual-type-card.css';

const ManualTypeCard = ({ title, description, icon: Icon, theme, onClick }) => {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      aria-label={title}
      className={`manual-type-card${isDark ? ' manual-type-card--dark' : ''}`}
      onClick={onClick}
    >
      <div className="manual-type-card__body">
        <div className={`manual-type-card__icon${isDark ? ' manual-type-card__icon--dark' : ''}`}>
          <Icon aria-hidden="true" />
        </div>
        <h4 className={`manual-type-card__title${isDark ? ' manual-type-card__title--dark' : ''}`}>
          {title}
        </h4>
        <p className="manual-type-card__description">
          {description}
        </p>
      </div>
    </button>
  );
};

export default ManualTypeCard;

import React from 'react';
import Popup from './Popup';

const InfoTooltip = (props) => {
  const { isSuccess, isOpen, onClose } = props;
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
    >
      <button
        type="button"
        className={`popup__close-button`}
        onClick={onClose}
      ></button>
      <div className={`${isSuccess ? 'popup__icon-tooltip-sucсess' : 'popup__icon-tooltip-error'}`}></div>
      <h2 className="popup__title popup__title_center">
        {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;

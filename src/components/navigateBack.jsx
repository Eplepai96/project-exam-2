import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function NavigateBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='text-primary py-2' onClick={goBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
}

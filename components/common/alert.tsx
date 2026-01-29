'use client';

import { useEffect } from 'react';

import { useAlert } from '@/state/context/alert.context';

export const Alert = () => {
  const { message, type, setType } = useAlert();

  useEffect(() => {
    if (type !== 'none') {
      setTimeout(() => {
        setType('none');
      }, 2000);
    }
  }, [type, setType]);

  const alertType =
    type === 'success'
      ? 'alert-success'
      : type === 'warning'
        ? 'alert-warning'
        : type === 'error'
          ? 'alert-error'
          : 'alert-info';

  return type !== 'none' ? (
    <div className='toast z-[10000] toast-end'>
      <div className={`alert ${alertType} shadow-lg`}>
        <span>{message}</span>
      </div>
    </div>
  ) : null;
};

import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';

import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} lazy className={classNames('', {}, [className])}>
    <Suspense fallback={<Loader />}>
      <LoginFormAsync />
    </Suspense>
  </Modal>
);

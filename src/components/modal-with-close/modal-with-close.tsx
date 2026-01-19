import { FC, ReactNode, useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Modal } from '../modal';

interface IModalWithCloseProps {
  children: ReactNode;
}

export const ModalWithClose: FC<IModalWithCloseProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ number?: string }>();

  const modalTitle = useMemo(() => {
    if (params.number) {
      return `#${String(params.number).padStart(6, '0')}`;
    }
    return '';
  }, [params.number]);

  const handleClose = () => {
    const background = (location.state as { background?: Location })
      ?.background;
    if (background) {
      navigate(background.pathname + background.search, { replace: true });
    } else {
      const path = location.pathname;
      if (path.includes('/feed/')) {
        navigate('/feed', { replace: true });
      } else if (path.includes('/ingredients/')) {
        navigate('/', { replace: true });
      } else if (path.includes('/profile/orders/')) {
        navigate('/profile/orders', { replace: true });
      } else {
        navigate(-1);
      }
    }
  };

  return (
    <Modal title={modalTitle} onClose={handleClose}>
      {children}
    </Modal>
  );
};

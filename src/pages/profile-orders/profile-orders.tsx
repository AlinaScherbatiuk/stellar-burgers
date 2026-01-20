import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { fetchOrders } from '../../services/slices/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!orders.length && !isLoading && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length, isLoading]);

  return <ProfileOrdersUI orders={orders} />;
};

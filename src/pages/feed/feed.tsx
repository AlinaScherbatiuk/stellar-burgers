import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.feed);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!orders && !isLoading && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchFeed());
    }
  }, [dispatch, orders, isLoading]);

  if (isLoading || !orders) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders.orders}
      handleGetFeeds={() => dispatch(fetchFeed())}
    />
  );
};

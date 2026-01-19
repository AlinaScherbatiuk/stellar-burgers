import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient && ingredient._id) {
        const constructorIngredient: TConstructorIngredient = {
          ...ingredient,
          id: nanoid()
        };
        dispatch(addIngredient(constructorIngredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);

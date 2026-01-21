import { rootReducer, RootState } from './store';
import { AnyAction } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined состоянием', () => {
    const action: AnyAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      feed: {
        orders: null,
        isLoading: false,
        error: null
      },
      orders: {
        orders: [],
        currentOrder: null,
        isLoading: false,
        error: null
      }
    });
  });

  it('должен вернуть текущее состояние при вызове с неизвестным экшеном', () => {
    const initialState: RootState = {
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      feed: {
        orders: null,
        isLoading: false,
        error: null
      },
      orders: {
        orders: [],
        currentOrder: null,
        isLoading: false,
        error: null
      }
    };

    const action: AnyAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});

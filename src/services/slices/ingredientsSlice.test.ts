import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  describe('fetchIngredients', () => {
    it('должен установить isLoading в true при начале запроса', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    it('должен установить isLoading в false и сохранить данные при успешном запросе', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const pendingState = ingredientsReducer(initialState, pendingAction);

      const fulfilledAction = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(pendingState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.ingredients).toHaveLength(2);
    });

    it('должен установить isLoading в false и сохранить ошибку при неудачном запросе', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const pendingState = ingredientsReducer(initialState, pendingAction);

      const errorMessage = 'Failed to fetch ingredients';
      const rejectedAction = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(pendingState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });

    it('должен обработать ошибку без сообщения', () => {
      const pendingAction = { type: fetchIngredients.pending.type };
      const pendingState = ingredientsReducer(initialState, pendingAction);

      const rejectedAction = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const state = ingredientsReducer(pendingState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Failed to fetch ingredients');
      expect(state.ingredients).toEqual([]);
    });

    it('должен очистить ошибку при новом запросе', () => {
      const stateWithError = {
        ingredients: [],
        isLoading: false,
        error: 'Previous error'
      };

      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });
});

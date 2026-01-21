import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

const mockBun: TConstructorIngredient = {
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'bun-1'
};

const mockMainIngredient: TConstructorIngredient = {
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
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'main-1'
};

const mockSauce: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'sauce-1'
};

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  describe('addIngredient', () => {
    it('должен добавить булку в конструктор', () => {
      const action = addIngredient(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('должен заменить существующую булку новой', () => {
      const stateWithBun = {
        bun: mockBun,
        ingredients: []
      };

      const newBun: TConstructorIngredient = {
        ...mockBun,
        _id: 'new-bun-id',
        id: 'new-bun-1',
        name: 'Новая булка'
      };

      const action = addIngredient(newBun);
      const state = constructorReducer(stateWithBun, action);

      expect(state.bun).toEqual(newBun);
      expect(state.bun?._id).toBe('new-bun-id');
    });

    it('должен добавить начинку в массив ингредиентов', () => {
      const action = addIngredient(mockMainIngredient);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockMainIngredient);
    });

    it('должен добавить соус в массив ингредиентов', () => {
      const action = addIngredient(mockSauce);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockSauce);
    });

    it('должен добавить несколько ингредиентов в массив', () => {
      const state1 = constructorReducer(initialState, addIngredient(mockMainIngredient));
      const state2 = constructorReducer(state1, addIngredient(mockSauce));

      expect(state2.ingredients).toHaveLength(2);
      expect(state2.ingredients[0]).toEqual(mockMainIngredient);
      expect(state2.ingredients[1]).toEqual(mockSauce);
    });
  });

  describe('removeIngredient', () => {
    it('должен удалить ингредиент по id', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient, mockSauce]
      };

      const action = removeIngredient('main-1');
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockSauce);
    });

    it('должен удалить только указанный ингредиент', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient, mockSauce]
      };

      const action = removeIngredient('sauce-1');
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockMainIngredient);
    });

    it('не должен изменить состояние, если ингредиент с указанным id не найден', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient]
      };

      const action = removeIngredient('non-existent-id');
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual(mockMainIngredient);
    });
  });

  describe('moveIngredient', () => {
    it('должен переместить ингредиент с одного места на другое', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient, mockSauce]
      };

      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toEqual(mockSauce);
      expect(state.ingredients[1]).toEqual(mockMainIngredient);
    });

    it('должен переместить ингредиент в начало списка', () => {
      const thirdIngredient: TConstructorIngredient = {
        ...mockMainIngredient,
        id: 'main-2',
        _id: 'third-id'
      };

      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient, mockSauce, thirdIngredient]
      };

      const action = moveIngredient({ fromIndex: 2, toIndex: 0 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[0]).toEqual(thirdIngredient);
      expect(state.ingredients[1]).toEqual(mockMainIngredient);
      expect(state.ingredients[2]).toEqual(mockSauce);
    });

    it('должен переместить ингредиент в конец списка', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [mockMainIngredient, mockSauce]
      };

      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[state.ingredients.length - 1]).toEqual(mockMainIngredient);
    });
  });

  describe('clearConstructor', () => {
    it('должен очистить конструктор от всех ингредиентов', () => {
      const stateWithIngredients = {
        bun: mockBun,
        ingredients: [mockMainIngredient, mockSauce]
      };

      const action = clearConstructor();
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    it('должен очистить пустой конструктор', () => {
      const action = clearConstructor();
      const state = constructorReducer(initialState, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});

import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { StrUtils } from '../utils/str-utils';
import { parseCookies, setCookie } from 'nookies';
import CookiesEnum from '../infra/core/CookiesEnum';

export interface ICartItem {
  readonly id: string;
  readonly name: string;
  readonly value: number;
}

interface IContextCartItem extends ICartItem {
  readonly quantity: number;
}

export interface ICartTotals {
  readonly quantity: number;
  readonly value: number;
  readonly formatedTotalValue?: string;
}

interface ICartContextData {
  readonly items: IContextCartItem[];
  readonly cartTotals: ICartTotals;
  readonly addItemToCart: (item: ICartItem) => void;
  readonly removeItemQuantity: (itemId: string) => void;
  readonly removeItemOfCart: (itemId: string) => void;
  readonly clearCart: () => void;
}

const CartContext = createContext<ICartContextData>({} as ICartContextData);

/**
 * Cart Provider - to manage cart items
 */
const CartProvider: FC = ({ children }) => {
  const [items, setItems] = useState<IContextCartItem[]>([]);

  /**
   * @description Update the state list and persist it to cookies.
   * @param {IContextCartItem[]} updatedList
   */
  const updateInstance = (updatedList: IContextCartItem[]): void => {
    setItems(updatedList);
    setCookie(undefined, CookiesEnum.APP_CART, JSON.stringify(updatedList));
  };

  /**
   * @description Add a item to the cart
   * @param {IContextCartItem} item
   */
  const addItemToCart = useCallback(
    (item: ICartItem) => {
      const current = items?.length > 0 ? [...items] : [];
      const currentIds = current.map(_item => _item.id) || [];
      if (!currentIds.length) {
        setItems([{ ...item, quantity: 1 }]);
        return;
      }

      const updatedItems = currentIds.includes(item.id)
        ? current.map(_item => ({
            ..._item,
            ...(_item.id === item.id && {
              quantity: _item.quantity + 1,
            }),
          }))
        : [
            ...current,
            {
              ...item,
              quantity: 1,
            },
          ];

      updateInstance(updatedItems);
    },
    [items],
  );

  /**
   * @description Decrements a item quantity of the cart.
   * @param {string} itemId
   */
  const removeItemQuantity = useCallback(
    (itemId: string) => {
      const current = items?.length > 0 ? [...items] : [];
      const ids = current.map(_item => _item.id) || [];

      if (!ids.includes(itemId)) {
        return;
      }

      const updatedItems =
        current
          .map(_item => ({
            ..._item,
            ...(_item.id === itemId && {
              quantity: _item.quantity - 1,
            }),
          }))
          ?.filter(_item => _item.quantity > 0) || [];

      updateInstance(updatedItems);
    },
    [items],
  );

  /**
   * @description Remove completely the item of the cart.
   * @param {string} itemId
   */
  const removeItemOfCart = useCallback(
    (itemId: string) => {
      const current = items?.length > 0 ? [...items] : [];
      const ids = current.map(_item => _item.id) || [];

      if (!ids.includes(itemId)) {
        return;
      }

      const updatedItems = current.filter(_item => _item.id !== itemId);

      updateInstance(updatedItems);
    },
    [items],
  );

  /**
   * @description Clear the cart
   */
  const clearCart = useCallback(() => {
    updateInstance([]);
  }, []);

  const cartTotals = useMemo((): ICartTotals => {
    const quantityTotal =
      items?.reduce((acc, item) => (acc += item.quantity), 0) || 0;

    const valueTotal =
      items?.reduce((acc, item) => (acc += item.value * item.quantity), 0) || 0;

    return {
      quantity: quantityTotal,
      value: valueTotal,
      formatedTotalValue: StrUtils.formatCurrency(valueTotal),
    };
  }, [items]);

  useEffect(() => {
    const { [CookiesEnum.APP_CART]: persistedItems } = parseCookies();
    if (persistedItems) {
      try {
        setItems(JSON.parse(persistedItems) as IContextCartItem[]);
      } catch {
        setItems([]);
      }
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        cartTotals,
        addItemToCart,
        clearCart,
        removeItemOfCart,
        removeItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };

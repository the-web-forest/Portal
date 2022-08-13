import LocalStorageEnum from "../../infra/core/LocalStorageEnum";

export class CartItem {
  private id: string;
  private quantity: number;
  private value: number;

  public getId(): string {
    return this.id;
  }

  public increaseQuantity() {
    this.quantity = this.quantity + 1;
  }

  public decreaseQuantity() {
    if (this.quantity == 1) {
      return;
    }

    this.quantity = this.quantity - 1;
  }

  public getValue(): number {
    return this.value;
  }

  public getTotalValue(): number {
    return this.value * this.quantity;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  constructor(id: string, value: number, quantity: number) {
    this.id = id;
    this.quantity = quantity;
    this.value = value;
  }
}

export default class Cart {
  private readonly _items: CartItem[] = [];

  getItemsSize(): number {
    let totalItems = 0;

    this._items.forEach(item => {
      totalItems += item.getQuantity();
    });

    return totalItems;
  }

  getCartTotalValue(): number {
    let totalValue = 0;

    this._items.forEach(item => {
      totalValue += item.getTotalValue();
    });

    return totalValue;
  }

  getItems(): CartItem[] {
    return this._items;
  }

  deleteAllItems() {
    localStorage.removeItem(LocalStorageEnum.CART);
  }

  updateStorage() {
    const data = JSON.stringify(this._items);
    localStorage.setItem(LocalStorageEnum.CART, data);
  }

  constructor() {
    if (typeof window == 'undefined') {
      return;
    }

    const localStorageCart = localStorage.getItem(LocalStorageEnum.CART);

    if (!localStorageCart) {
      this._items = [];
      return;
    }

    const cartJson = JSON.parse(localStorageCart) as CartItem[];

    cartJson.forEach((item: any) => {
      this._items.push(new CartItem(item.id, item.value, item.quantity));
    });
  }
}

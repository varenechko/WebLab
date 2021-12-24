import { IOrder } from "../../axios/interfaces";

export interface IOrderCreationComponent {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

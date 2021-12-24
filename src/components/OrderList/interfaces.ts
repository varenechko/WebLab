import { IOrder } from "../../axios/interfaces";

export interface IOrderListComponent {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

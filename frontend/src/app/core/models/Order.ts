import { LatLng } from "leaflet";
import { CartItem } from "./CartIten";

export class Order{
  id!: string;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  address!: string;
  user!: string;
  addressLatLng?: LatLng;
  paymentId!: string;
  createdAt!: string;
  updatedAt!: string;
  status!: string;
}
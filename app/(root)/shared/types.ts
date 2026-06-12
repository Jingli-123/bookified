import { IconType } from "react-icons";

export interface IntroFeatureProps {
  Icon: IconType;
  title: string;
  description: string;
  color:string;
  bgcolor?:string;
  divcolor?:string;
  width?:number;
  iconClassname?:string;
}

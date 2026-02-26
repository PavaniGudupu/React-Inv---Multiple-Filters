import { MdManageHistory } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import { RiOrganizationChart } from "react-icons/ri";

const inventoryFeatures = [
  {
    icon: <MdManageHistory />,
    title: "Product Management",
    description:
      "Easily add, edit, and manage product details including pricing, classification, and size through an intuitive interface."
  },
  {
    icon: <GrDocumentPerformance />,
    title: "Stock & Price Tracking",
    description:
      "Monitor MRP, selling price, and cost price to maintain healthy margins and make informed decisions."
  },
  {
    icon: <RiOrganizationChart />,
    title: "Category Organization",
    description:
      "Organize products by categories for better inventory control and faster access."
  }
];

export default inventoryFeatures;

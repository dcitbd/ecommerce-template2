import { Customer } from "@/types/customer";
import { calculateCustomerRating } from "@/utils/customerRatingCalculator";
import { calculateRiskFromPercentage } from "@/constants/customerRisk";

const CUSTOMERS_KEY = "twbd_customers_data";

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "cust-01",
    name: "Mahmudul Hasan",
    phone: "01711223344",
    email: "mahmudul@example.com",
    address: "House 12, Road 4, Sector 7, Uttara, Dhaka",
    registrationDate: "2026-03-10T00:00:00Z",
    successOrdersCount: 14,
    cancelledOrdersCount: 1,
    totalOrdersCount: 15,
    ratingPercentage: 93,
    riskStatus: "Gold Verified",
    notes: "নিয়মিত ক্যামেরা ও লেন্স ক্রেতা।"
  },
  {
    id: "cust-02",
    name: "Tanvir Ahmed",
    phone: "01822334455",
    email: "tanvir@example.com",
    address: "সোনাইমুড়ী মধ্যবাজার, সোনাইমুড়ী বরুড়া, কুমিল্লা",
    registrationDate: "2026-05-15T00:00:00Z",
    successOrdersCount: 6,
    cancelledOrdersCount: 1,
    totalOrdersCount: 7,
    ratingPercentage: 85,
    riskStatus: "Gold Verified"
  },
  {
    id: "cust-03",
    name: "Digital Corner Wholesale",
    phone: "01933445566",
    email: "digitalcorner@gmail.com",
    address: "Shop 45, Stadium Market, Chattogram",
    registrationDate: "2026-01-20T00:00:00Z",
    successOrdersCount: 22,
    cancelledOrdersCount: 0,
    totalOrdersCount: 22,
    ratingPercentage: 100,
    riskStatus: "Gold Verified",
    notes: "বৃহৎ পাইকারি ক্রেতা।"
  },
  {
    id: "cust-04",
    name: "Sabbir Hossain",
    phone: "01511223344",
    email: "sabbir@example.com",
    address: "Mirpur 10, Dhaka",
    registrationDate: "2026-08-01T00:00:00Z",
    successOrdersCount: 2,
    cancelledOrdersCount: 3,
    totalOrdersCount: 5,
    ratingPercentage: 40,
    riskStatus: "Very High Risk"
  }
];

export function getCustomers(): Customer[] {
  try {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_CUSTOMERS;
  } catch {
    return INITIAL_CUSTOMERS;
  }
}

export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
}

export function syncCustomerFromOrder(name: string, phone: string, email: string = "", address: string = ""): Customer {
  const customers = getCustomers();
  const cleanPhone = phone.replace(/\D/g, "");
  const existing = customers.find(c => c.phone.replace(/\D/g, "") === cleanPhone);

  if (existing) {
    existing.totalOrdersCount += 1;
    existing.successOrdersCount += 1;
    existing.ratingPercentage = calculateCustomerRating(existing.successOrdersCount, existing.totalOrdersCount);
    existing.riskStatus = calculateRiskFromPercentage(existing.ratingPercentage);
    if (address && !existing.address) existing.address = address;
    saveCustomers(customers);
    return existing;
  } else {
    const newCust: Customer = {
      id: "cust-" + Date.now(),
      name,
      phone,
      email: email || `${phone}@customer.technoworld.bd`,
      address,
      registrationDate: new Date().toISOString(),
      successOrdersCount: 1,
      cancelledOrdersCount: 0,
      totalOrdersCount: 1,
      ratingPercentage: 100,
      riskStatus: "Gold Verified",
    };
    customers.unshift(newCust);
    saveCustomers(customers);
    return newCust;
  }
}

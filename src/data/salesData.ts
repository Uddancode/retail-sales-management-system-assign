import { SalesTransaction } from '@/types/sales';

// Generate realistic sales data based on the CSV structure
const regions = ['North', 'South', 'East', 'West', 'Central'];
const genders = ['Male', 'Female'];
const customerTypes = ['New', 'Returning', 'Loyal'];
const brands = ['TechPulse', 'NovaGear', 'VoltEdge', 'CyberCore', 'PureBloom', 'GlowEsser', 'SilkSkin', 'UrbanWear', 'StreetLaye', 'EliteWear', 'ComfortLir', 'VelvetTour'];
const categories = ['Electronics', 'Beauty', 'Clothing'];
const tagsList = ['smart,gadgets', 'portable,wireless', 'organic,skincare', 'fashion,unisex', 'casual,formal', 'makeup,beauty', 'fragrance-free', 'cotton,formal', 'skincare,makeup'];
const paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Net Banking', 'Wallet'];
const orderStatuses = ['Completed', 'Pending', 'Cancelled', 'Returned'];
const deliveryTypes = ['Standard', 'Express'];
const storeLocations = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Hyderabad'];

const firstNames = ['Neha', 'Prerna', 'Arjun', 'Zoya', 'Anjali', 'Suresh', 'Ritika', 'Mahesh', 'Sanjay', 'Farhan', 'Kabir', 'Aisha', 'Rahul', 'Divya', 'Vivek', 'Amit', 'Pooja', 'Karan', 'Alisha', 'Nisha'];
const lastNames = ['Yadav', 'Mehta', 'Das', 'Joshi', 'Iyer', 'Chopra', 'Josh', 'Sharma', 'Gupta', 'Patel', 'Khan', 'Bansari', 'Nair', 'Agarwal', 'Verma', 'Singh', 'Reddy', 'Chaudhry', 'Goyal', 'Tiwari'];
const employeeFirstNames = ['Harsh', 'Ankit', 'Khushi', 'Ram', 'Deepak', 'Yash', 'Ashmi', 'Kulasekhar'];
const employeeLastNames = ['Agarwal', 'Tiwari', 'Jain', 'Chaudhry', 'Goyal', 'Balyan', 'Busi'];

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhoneNumber(): string {
  return `+91${randomInt(7000000000, 9999999999)}`;
}

function generateDate(): string {
  const year = 2023;
  const month = randomInt(1, 12);
  const day = randomInt(1, 28);
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function generateTransactionId(index: number): string {
  return `${randomInt(1000000, 9999999)}`;
}

function generateCustomerId(): string {
  return `CUST-${randomInt(1000, 9999)}`;
}

function generateProductId(): string {
  return `PROD-${randomInt(100, 999)}`;
}

function generateStoreId(): string {
  return `ST-${String(randomInt(1, 50)).padStart(3, '0')}`;
}

function generateSalespersonId(): string {
  return `EMP-${randomInt(1000, 9999)}`;
}

export function generateSalesData(count: number = 500): SalesTransaction[] {
  const transactions: SalesTransaction[] = [];

  for (let i = 0; i < count; i++) {
    const quantity = randomInt(1, 10);
    const pricePerUnit = randomInt(100, 25000);
    const discountPercentage = randomInt(0, 50);
    const totalAmount = quantity * pricePerUnit;
    const finalAmount = totalAmount * (1 - discountPercentage / 100);

    const transaction: SalesTransaction = {
      transactionId: generateTransactionId(i),
      date: generateDate(),
      customerId: generateCustomerId(),
      customerName: `${randomElement(firstNames)} ${randomElement(lastNames)}`,
      phoneNumber: generatePhoneNumber(),
      gender: randomElement(genders),
      age: randomInt(18, 65),
      customerRegion: randomElement(regions),
      customerType: randomElement(customerTypes),
      productId: generateProductId(),
      productName: `${randomElement(brands)} ${randomElement(['Pro', 'Max', 'Lite', 'Plus', 'Ultra'])} ${randomElement(['Series', 'Edition', 'Collection'])}`,
      brand: randomElement(brands),
      productCategory: randomElement(categories),
      tags: randomElement(tagsList),
      quantity,
      pricePerUnit,
      discountPercentage,
      totalAmount,
      finalAmount: Math.round(finalAmount * 100) / 100,
      paymentMethod: randomElement(paymentMethods),
      orderStatus: randomElement(orderStatuses),
      deliveryType: randomElement(deliveryTypes),
      storeId: generateStoreId(),
      storeLocation: randomElement(storeLocations),
      salespersonId: generateSalespersonId(),
      employeeName: `${randomElement(employeeFirstNames)} ${randomElement(employeeLastNames)}`,
    };

    transactions.push(transaction);
  }

  return transactions;
}

// Generate and export the sales data
export const salesData = generateSalesData(500);

// Export unique values for filters
export const uniqueRegions = regions;
export const uniqueGenders = genders;
export const uniqueCategories = categories;
export const uniqueTags = [...new Set(tagsList.flatMap(t => t.split(',')))];
export const uniquePaymentMethods = paymentMethods;

const mockTransactions = Array.from({ length: 50 }, (_, i) => {
  const baseDate = new Date(2025, 3, 20); // April 20, 2025
  const currentDate = new Date(baseDate);
  currentDate.setDate(baseDate.getDate() + i);

  const getRandomTime = () => {
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const getItems = (type) => {
    const needsItems = [
      "Groceries", "Rent", "Fuel", "Electricity", "Water Bill", "Medical",
      "Public Transport", "Mobile Recharge", "Internet", "School Fees",
      "Insurance", "Clothing", "House Maintenance", "EMI Payment", "Gas Refill",
      "Doctor Visit", "Gym Membership", "Baby Products", "Pet Food", "Stationery"
    ];

    const wantsItems = [
      "Coffee", "Snacks", "Movies", "Dining Out", "Online Shopping", "Subscriptions",
      "Games", "Gadgets", "Concerts", "Spa", "Theme Park", "Gift Shopping", "Toys",
      "Fashion Accessories", "Streaming Services", "Books", "Alcohol", "Clubbing",
      "Desserts", "Home Decor"
    ];

    const items = type === 'needs' ? needsItems : wantsItems;
    const count = Math.floor(Math.random() * 4) + 2; // 2–5 items per category

    return Array.from({ length: count }, () => ({
      item: items[Math.floor(Math.random() * items.length)],
      amount: parseFloat((Math.random() * (type === 'needs' ? 250 : 150) + 20).toFixed(2)),
      time: getRandomTime(),
    }));
  };

  return {
    date: currentDate,
    needs: getItems('needs'),
    wants: getItems('wants'),
  };
});

export default mockTransactions

const mockTransactions = [
  {
    date: new Date('2024-03-18'),
    needs: [
      { item: "Groceries", amount: 120.50, time: "10:30" },
      { item: "Electricity Bill", amount: 85.00, time: "14:15" },
      { item: "Public Transport", amount: 25.00, time: "08:45" }
    ],
    wants: [
      { item: "Coffee", amount: 4.50, time: "09:00" },
      { item: "Movie Ticket", amount: 15.00, time: "19:30" }
    ]
  },
  {
    date: new Date('2024-03-19'),
    needs: [
      { item: "Phone Bill", amount: 45.00, time: "12:00" },
      { item: "Medicine", amount: 35.75, time: "16:20" }
    ],
    wants: [
      { item: "Lunch Out", amount: 25.00, time: "13:00" },
      { item: "Video Game", amount: 59.99, time: "20:00" }
    ]
  },
  {
    date: new Date('2024-03-20'),
    needs: [
      { item: "Groceries", amount: 95.25, time: "11:00" },
      { item: "Internet Bill", amount: 65.00, time: "15:00" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 12.99, time: "18:00" },
      { item: "Dinner Out", amount: 45.00, time: "19:30" }
    ]
  },
  {
    date: new Date('2024-03-21'),
    needs: [
      { item: "Gas", amount: 40.00, time: "08:00" },
      { item: "Dental Checkup", amount: 120.00, time: "14:00" }
    ],
    wants: [
      { item: "New Headphones", amount: 89.99, time: "16:00" },
      { item: "Coffee", amount: 4.50, time: "09:30" }
    ]
  },
  {
    date: new Date('2024-03-22'),
    needs: [
      { item: "Groceries", amount: 75.50, time: "10:00" },
      { item: "Water Bill", amount: 35.00, time: "13:00" }
    ],
    wants: [
      { item: "Concert Tickets", amount: 120.00, time: "20:00" },
      { item: "Lunch Out", amount: 18.50, time: "12:30" }
    ]
  },
  {
    date: new Date('2024-03-23'),
    needs: [
      { item: "Car Insurance", amount: 150.00, time: "09:00" },
      { item: "Public Transport", amount: 30.00, time: "08:00" }
    ],
    wants: [
      { item: "Shopping", amount: 85.00, time: "15:00" },
      { item: "Dinner Out", amount: 55.00, time: "19:00" }
    ]
  },
  {
    date: new Date('2024-03-24'),
    needs: [
      { item: "Groceries", amount: 110.25, time: "11:00" },
      { item: "Medicine", amount: 25.50, time: "14:00" }
    ],
    wants: [
      { item: "Brunch", amount: 35.00, time: "12:00" },
      { item: "Movie", amount: 12.00, time: "18:00" }
    ]
  }
];

export default mockTransactions; 
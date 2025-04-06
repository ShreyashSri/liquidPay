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
  },
  {
    date: new Date('2024-03-25'),
    needs: [
      { item: "Rent", amount: 800.00, time: "09:00" },
      { item: "Gym Membership", amount: 40.00, time: "17:00" }
    ],
    wants: [
      { item: "New Shoes", amount: 75.00, time: "16:00" },
      { item: "Ice Cream", amount: 6.00, time: "20:00" }
    ]
  },
  {
    date: new Date('2024-03-26'),
    needs: [
      { item: "Groceries", amount: 80.75, time: "10:30" },
      { item: "Phone Bill", amount: 50.00, time: "13:45" }
    ],
    wants: [
      { item: "Book", amount: 20.00, time: "15:30" },
      { item: "Coffee", amount: 4.50, time: "09:15" }
    ]
  },
  {
    date: new Date('2024-03-27'),
    needs: [
      { item: "Electricity Bill", amount: 90.00, time: "14:00" },
      { item: "Public Transport", amount: 28.00, time: "08:30" }
    ],
    wants: [
      { item: "Lunch Out", amount: 30.00, time: "12:45" },
      { item: "Streaming Subscription", amount: 12.99, time: "18:30" }
    ]
  },
  {
    date: new Date('2024-03-28'),
    needs: [
      { item: "Medicine", amount: 40.25, time: "16:15" },
      { item: "Internet Bill", amount: 70.00, time: "15:30" }
    ],
    wants: [
      { item: "Dinner Out", amount: 50.00, time: "19:45" },
      { item: "Video Game", amount: 49.99, time: "20:30" }
    ]
  },
  {
    date: new Date('2024-03-29'),
    needs: [
      { item: "Gas", amount: 45.00, time: "07:45" },
      { item: "Groceries", amount: 100.50, time: "11:15" }
    ],
    wants: [
      { item: "New Headphones", amount: 95.00, time: "16:30" },
      { item: "Movie Ticket", amount: 18.00, time: "19:15" }
    ]
  },
  {
    date: new Date('2024-03-30'),
    needs: [
      { item: "Water Bill", amount: 38.00, time: "12:45" },
      { item: "Dental Checkup", amount: 130.00, time: "13:30" }
    ],
    wants: [
      { item: "Concert Tickets", amount: 130.00, time: "20:30" },
      { item: "Coffee", amount: 5.00, time: "09:45" }
    ]
  },
  {
    date: new Date('2024-03-31'),
    needs: [
      { item: "Car Insurance", amount: 160.00, time: "08:45" },
      { item: "Public Transport", amount: 32.00, time: "07:30" }
    ],
    wants: [
      { item: "Shopping", amount: 90.00, time: "15:45" },
      { item: "Lunch Out", amount: 20.00, time: "12:15" }
    ]
  },
  {
    date: new Date('2024-04-01'),
    needs: [
      { item: "Groceries", amount: 115.75, time: "10:45" },
      { item: "Medicine", amount: 28.50, time: "13:15" }
    ],
    wants: [
      { item: "Brunch", amount: 40.00, time: "11:45" },
      { item: "Dinner Out", amount: 60.00, time: "18:45" }
    ]
  },
  {
    date: new Date('2024-04-02'),
    needs: [
      { item: "Rent", amount: 820.00, time: "08:30" },
      { item: "Gym Membership", amount: 42.00, time: "16:45" }
    ],
    wants: [
      { item: "New Shoes", amount: 80.00, time: "15:30" },
      { item: "Movie", amount: 15.00, time: "17:45" }
    ]
  },
    {
    date: new Date('2024-04-03'),
    needs: [
      { item: "Phone Bill", amount: 55.00, time: "12:30" },
      { item: "Groceries", amount: 85.25, time: "10:15" }
    ],
    wants: [
      { item: "Book", amount: 22.00, time: "15:15" },
      { item: "Ice Cream", amount: 7.00, time: "19:30" }
    ]
  },
  {
    date: new Date('2024-04-04'),
    needs: [
      { item: "Electricity Bill", amount: 95.00, time: "13:30" },
      { item: "Public Transport", amount: 30.00, time: "08:15" }
    ],
    wants: [
      { item: "Coffee", amount: 5.50, time: "09:00" },
      { item: "Streaming Subscription", amount: 13.99, time: "18:15" }
    ]
  },
  {
    date: new Date('2024-04-05'),
    needs: [
      { item: "Medicine", amount: 45.75, time: "16:00" },
      { item: "Internet Bill", amount: 75.00, time: "15:15" }
    ],
    wants: [
      { item: "Lunch Out", amount: 35.00, time: "12:30" },
      { item: "Video Game", amount: 65.00, time: "20:15" }
    ]
  },
  {
    date: new Date('2024-04-06'),
    needs: [
      { item: "Gas", amount: 50.00, time: "07:30" },
      { item: "Groceries", amount: 105.50, time: "11:00" }
    ],
    wants: [
      { item: "Dinner Out", amount: 55.00, time: "19:30" },
      { item: "New Headphones", amount: 100.00, time: "16:15" }
    ]
  },
  {
    date: new Date('2024-04-07'),
    needs: [
      { item: "Water Bill", amount: 40.00, time: "12:30" },
      { item: "Dental Checkup", amount: 140.00, time: "13:15" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 20.00, time: "19:00" },
      { item: "Concert Tickets", amount: 140.00, time: "20:15" }
    ]
  },
  {
    date: new Date('2024-04-08'),
    needs: [
      { item: "Car Insurance", amount: 170.00, time: "08:30" },
      { item: "Public Transport", amount: 35.00, time: "07:15" }
    ],
    wants: [
      { item: "Coffee", amount: 6.00, time: "09:30" },
      { item: "Shopping", amount: 95.00, time: "15:30" }
    ]
  },
  {
    date: new Date('2024-04-09'),
    needs: [
      { item: "Groceries", amount: 120.75, time: "10:30" },
      { item: "Medicine", amount: 30.50, time: "13:00" }
    ],
    wants: [
      { item: "Brunch", amount: 45.00, time: "11:30" },
      { item: "Lunch Out", amount: 22.00, time: "12:00" }
    ]
  },
  {
    date: new Date('2024-04-10'),
    needs: [
      { item: "Rent", amount: 840.00, time: "08:15" },
      { item: "Gym Membership", amount: 45.00, time: "16:30" }
    ],
    wants: [
      { item: "Dinner Out", amount: 65.00, time: "18:30" },
      { item: "New Shoes", amount: 85.00, time: "15:15" }
    ]
  },
  {
    date: new Date('2024-04-11'),
    needs: [
      { item: "Phone Bill", amount: 60.00, time: "12:15" },
      { item: "Groceries", amount: 90.25, time: "10:00" }
    ],
    wants: [
      { item: "Movie", amount: 17.00, time: "17:30" },
      { item: "Book", amount: 25.00, time: "15:00" }
    ]
  },
  {
    date: new Date('2024-04-12'),
    needs: [
      { item: "Electricity Bill", amount: 100.00, time: "13:15" },
      { item: "Public Transport", amount: 38.00, time: "08:00" }
    ],
    wants: [
      { item: "Ice Cream", amount: 8.00, time: "19:15" },
      { item: "Streaming Subscription", amount: 14.99, time: "18:00" }
    ]
  },
  {
    date: new Date('2024-04-13'),
    needs: [
      { item: "Medicine", amount: 50.75, time: "15:45" },
      { item: "Internet Bill", amount: 80.00, time: "15:00" }
    ],
    wants: [
      { item: "Coffee", amount: 6.50, time: "08:45" },
      { item: "Video Game", amount: 70.00, time: "20:00" }
    ]
  },
  {
    date: new Date('2024-04-14'),
    needs: [
      { item: "Gas", amount: 55.00, time: "07:15" },
      { item: "Groceries", amount: 110.50, time: "10:45" }
    ],
    wants: [
      { item: "Lunch Out", amount: 25.00, time: "11:45" },
      { item: "New Headphones", amount: 105.00, time: "16:00" }
    ]
  },
  {
    date: new Date('2024-04-15'),
    needs: [
      { item: "Water Bill", amount: 42.00, time: "12:15" },
      { item: "Dental Checkup", amount: 150.00, time: "13:00" }
    ],
    wants: [
      { item: "Dinner Out", amount: 70.00, time: "19:15" },
      { item: "Movie Ticket", amount: 22.00, time: "18:45" }
    ]
  },
  {
    date: new Date('2024-04-16'),
    needs: [
      { item: "Car Insurance", amount: 180.00, time: "08:15" },
      { item: "Public Transport", amount: 40.00, time: "07:00" }
    ],
    wants: [
      { item: "Concert Tickets", amount: 150.00, time: "20:00" },
      { item: "Shopping", amount: 100.00, time: "15:15" }
    ]
  },
  {
    date: new Date('2024-04-17'),
    needs: [
      { item: "Groceries", amount: 125.75, time: "10:15" },
      { item: "Medicine", amount: 32.50, time: "12:45" }
    ],
    wants: [
      { item: "Brunch", amount: 50.00, time: "11:15" },
      { item: "Coffee", amount: 7.00, time: "09:15" }
    ]
  },
  {
    date: new Date('2024-04-18'),
    needs: [
      { item: "Rent", amount: 860.00, time: "08:00" },
      { item: "Gym Membership", amount: 48.00, time: "16:15" }
    ],
    wants: [
      { item: "New Shoes", amount: 90.00, time: "15:00" },
      { item: "Streaming Subscription", amount: 15.99, time: "17:45" }
    ]
  },
  {
    date: new Date('2024-04-19'),
    needs: [
      { item: "Phone Bill", amount: 65.00, time: "12:00" },
      { item: "Groceries", amount: 95.75, time: "09:45" }
    ],
    wants: [
      { item: "Movie", amount: 19.00, time: "17:15" },
      { item: "Ice Cream", amount: 9.00, time: "19:00" }
    ]
  },
  {
    date: new Date('2024-04-20'),
    needs: [
      { item: "Electricity Bill", amount: 105.00, time: "13:00" },
      { item: "Public Transport", amount: 42.00, time: "07:45" }
    ],
    wants: [
      { item: "Book", amount: 28.00, time: "14:45" },
      { item: "Video Game", amount: 75.00, time: "19:45" }
    ]
  },
  {
    date: new Date('2024-04-21'),
    needs: [
      { item: "Medicine", amount: 55.75, time: "15:30" },
      { item: "Internet Bill", amount: 85.00, time: "14:45" }
    ],
    wants: [
      { item: "Lunch Out", amount: 28.00, time: "11:30" },
      { item: "Dinner Out", amount: 75.00, time: "19:00" }
    ]
  },
  {
    date: new Date('2024-04-22'),
    needs: [
      { item: "Gas", amount: 60.00, time: "07:00" },
      { item: "Groceries", amount: 115.50, time: "10:30" }
    ],
    wants: [
      { item: "New Headphones", amount: 110.00, time: "15:45" },
      { item: "Coffee", amount: 7.50, time: "08:30" }
    ]
  },
  {
    date: new Date('2024-04-23'),
    needs: [
      { item: "Water Bill", amount: 44.00, time: "12:00" },
      { item: "Dental Checkup", amount: 160.00, time: "12:45" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 24.00, time: "18:30" },
      { item: "Concert Tickets", amount: 160.00, time: "19:45" }
    ]
  },
  {
    date: new Date('2024-04-24'),
    needs: [
      { item: "Car Insurance", amount: 190.00, time: "08:00" },
      { item: "Public Transport", amount: 45.00, time: "06:45" }
    ],
    wants: [
      { item: "Shopping", amount: 105.00, time: "15:00" },
      { item: "Brunch", amount: 55.00, time: "11:00" }
    ]
  },
  {
    date: new Date('2024-04-25'),
    needs: [
      { item: "Groceries", amount: 130.75, time: "10:00" },
      { item: "Medicine", amount: 34.50, time: "12:30" }
    ],
    wants: [
      { item: "Lunch Out", amount: 30.00, time: "11:15" },
      { item: "New Shoes", amount: 95.00, time: "14:45" }
    ]
  },
  {
    date: new Date('2024-04-26'),
    needs: [
      { item: "Rent", amount: 880.00, time: "07:45" },
      { item: "Gym Membership", amount: 50.00, time: "16:00" }
    ],
    wants: [
      { item: "Dinner Out", amount: 80.00, time: "18:15" },
      { item: "Streaming Subscription", amount: 16.99, time: "17:30" }
    ]
  },
  {
    date: new Date('2024-04-27'),
    needs: [
      { item: "Phone Bill", amount: 70.00, time: "11:45" },
      { item: "Groceries", amount: 100.25, time: "09:30" }
    ],
    wants: [
      { item: "Movie", amount: 21.00, time: "17:00" },
      { item: "Ice Cream", amount: 10.00, time: "18:45" }
    ]
  },
  {
    date: new Date('2024-04-28'),
    needs: [
      { item: "Electricity Bill", amount: 110.00, time: "12:45" },
      { item: "Public Transport", amount: 48.00, time: "07:30" }
    ],
    wants: [
      { item: "Book", amount: 30.00, time: "14:30" },
      { item: "Video Game", amount: 80.00, time: "19:30" }
    ]
  },
  {
    date: new Date('2024-04-29'),
    needs: [
      { item: "Medicine", amount: 60.75, time: "15:15" },
      { item: "Internet Bill", amount: 90.00, time: "14:30" }
    ],
    wants: [
      { item: "Coffee", amount: 8.00, time: "08:15" },
      { item: "Lunch Out", amount: 32.00, time: "11:15" }
    ]
  },
  {
    date: new Date('2024-04-30'),
    needs: [
      { item: "Gas", amount: 65.00, time: "06:45" },
      { item: "Groceries", amount: 120.50, time: "10:15" }
    ],
    wants: [
      { item: "Dinner Out", amount: 85.00, time: "18:45" },
      { item: "New Headphones", amount: 115.00, time: "15:30" }
    ]
  },
  {
    date: new Date('2024-05-01'),
    needs: [
      { item: "Water Bill", amount: 46.00, time: "11:45" },
      { item: "Dental Checkup", amount: 170.00, time: "12:30" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 26.00, time: "18:15" },
      { item: "Concert Tickets", amount: 170.00, time: "19:30" }
    ]
  },
  {
    date: new Date('2024-05-02'),
    needs: [
      { item: "Car Insurance", amount: 200.00, time: "07:45" },
      { item: "Public Transport", amount: 50.00, time: "06:30" }
    ],
    wants: [
      { item: "Shopping", amount: 110.00, time: "14:45" },
      { item: "Brunch", amount: 60.00, time: "10:45" }
    ]
  },
  {
    date: new Date('2024-05-03'),
    needs: [
      { item: "Groceries", amount: 135.75, time: "09:45" },
      { item: "Medicine", amount: 36.50, time: "12:15" }
    ],
    wants: [
      { item: "New Shoes", amount: 100.00, time: "14:30" },
      { item: "Lunch Out", amount: 34.00, time: "11:00" }
    ]
  },
  {
    date: new Date('2024-05-04'),
    needs: [
      { item: "Rent", amount: 900.00, time: "07:30" },
      { item: "Gym Membership", amount: 52.00, time: "15:45" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 17.99, time: "17:15" },
      { item: "Dinner Out", amount: 90.00, time: "18:00" }
    ]
  },
  {
    date: new Date('2024-05-05'),
    needs: [
      { item: "Phone Bill", amount: 75.00, time: "11:30" },
      { item: "Groceries", amount: 105.25, time: "09:15" }
    ],
    wants: [
      { item: "Ice Cream", amount: 11.00, time: "18:30" },
      { item: "Movie", amount: 23.00, time: "16:45" }
    ]
  },
  {
    date: new Date('2024-05-06'),
    needs: [
      { item: "Electricity Bill", amount: 115.00, time: "12:30" },
      { item: "Public Transport", amount: 52.00, time: "07:15" }
    ],
    wants: [
      { item: "Video Game", amount: 85.00, time: "19:15" },
      { item: "Book", amount: 32.00, time: "14:15" }
    ]
  },
  {
    date: new Date('2024-05-07'),
    needs: [
      { item: "Medicine", amount: 65.75, time: "15:00" },
      { item: "Internet Bill", amount: 95.00, time: "14:15" }
    ],
    wants: [
      { item: "Lunch Out", amount: 36.00, time: "10:45" },
      { item: "Coffee", amount: 8.50, time: "08:00" }
    ]
  },
  {
    date: new Date('2024-05-08'),
    needs: [
      { item: "Gas", amount: 70.00, time: "06:30" },
      { item: "Groceries", amount: 125.50, time: "10:00" }
    ],
    wants: [
      { item: "New Headphones", amount: 120.00, time: "15:15" },
      { item: "Dinner Out", amount: 95.00, time: "18:30" }
    ]
  },
  {
    date: new Date('2024-05-09'),
    needs: [
      { item: "Water Bill", amount: 48.00, time: "11:30" },
      { item: "Dental Checkup", amount: 180.00, time: "12:15" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 28.0, time: "17:45" },
      { item: "Concert Tickets", amount: 180.00, time: "19:15" }
    ]
  },
  {
    date: new Date('2024-05-10'),
    needs: [
      { item: "Car Insurance", amount: 210.00, time: "07:30" },
      { item: "Public Transport", amount: 55.00, time: "06:15" }
    ],
    wants: [
      { item: "Shopping", amount: 115.00, time: "14:30" },
      { item: "Brunch", amount: 65.00, time: "10:30" }
    ]
  },
  {
    date: new Date('2024-05-11'),
    needs: [
      { item: "Groceries", amount: 140.75, time: "09:30" },
      { item: "Medicine", amount: 38.50, time: "12:00" }
    ],
    wants: [
      { item: "New Shoes", amount: 105.00, time: "14:15" },
      { item: "Lunch Out", amount: 38.00, time: "10:45" }
    ]
  },
  {
    date: new Date('2024-05-12'),
    needs: [
      { item: "Rent", amount: 920.00, time: "07:15" },
      { item: "Gym Membership", amount: 54.00, time: "15:30" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 18.99, time: "17:00" },
      { item: "Dinner Out", amount: 100.00, time: "17:45" }
    ]
  },
  {
    date: new Date('2024-05-13'),
    needs: [
      { item: "Phone Bill", amount: 80.00, time: "11:15" },
      { item: "Groceries", amount: 110.25, time: "09:00" }
    ],
    wants: [
      { item: "Ice Cream", amount: 12.00, time: "18:15" },
      { item: "Movie", amount: 25.00, time: "16:30" }
    ]
  },
  {
    date: new Date('2024-05-14'),
    needs: [
      { item: "Electricity Bill", amount: 120.00, time: "12:15" },
      { item: "Public Transport", amount: 58.00, time: "07:00" }
    ],
    wants: [
      { item: "Video Game", amount: 90.00, time: "19:00" },
      { item: "Book", amount: 34.00, time: "14:00" }
    ]
  },
  {
    date: new Date('2024-05-15'),
    needs: [
      { item: "Medicine", amount: 70.75, time: "14:45" },
      { item: "Internet Bill", amount: 100.00, time: "14:00" }
    ],
    wants: [
      { item: "Lunch Out", amount: 40.00, time: "10:30" },
      { item: "Coffee", amount: 9.00, time: "07:45" }
    ]
  },
  {
    date: new Date('2024-05-16'),
    needs: [
      { item: "Gas", amount: 75.00, time: "06:15" },
      { item: "Groceries", amount: 130.50, time: "09:45" }
    ],
    wants: [
      { item: "New Headphones", amount: 125.00, time: "15:00" },
      { item: "Dinner Out", amount: 105.00, time: "18:15" }
    ]
  },
  {
    date: new Date('2024-05-17'),
    needs: [
      { item: "Water Bill", amount: 50.00, time: "11:15" },
      { item: "Dental Checkup", amount: 190.00, time: "12:00" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 30.00, time: "17:30" },
      { item: "Concert Tickets", amount: 190.00, time: "19:00" }
    ]
  },
  {
    date: new Date('2024-05-18'),
    needs: [
      { item: "Car Insurance", amount: 220.00, time: "07:15" },
      { item: "Public Transport", amount: 60.00, time: "06:00" }
    ],
    wants: [
      { item: "Shopping", amount: 120.00, time: "14:15" },
      { item: "Brunch", amount: 70.00, time: "10:15" }
    ]
  },
  {
    date: new Date('2024-05-19'),
    needs: [
      { item: "Groceries", amount: 145.75, time: "09:15" },
      { item: "Medicine", amount: 40.50, time: "11:45" }
    ],
    wants: [
      { item: "New Shoes", amount: 110.00, time: "14:00" },
      { item: "Lunch Out", amount: 42.00, time: "10:30" }
    ]
  },
  {
    date: new Date('2024-05-20'),
    needs: [
      { item: "Rent", amount: 940.00, time: "07:00" },
      { item: "Gym Membership", amount: 56.00, time: "15:15" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 19.99, time: "16:45" },
      { item: "Dinner Out", amount: 110.00, time: "17:30" }
    ]
  },
  {
    date: new Date('2024-05-21'),
    needs: [
      { item: "Phone Bill", amount: 85.00, time: "11:00" },
      { item: "Groceries", amount: 115.25, time: "08:45" }
    ],
    wants: [
      { item: "Ice Cream", amount: 13.00, time: "18:00" },
      { item: "Movie", amount: 27.00, time: "16:15" }
    ]
  },
  {
    date: new Date('2024-05-22'),
    needs: [
      { item: "Electricity Bill", amount: 125.00, time: "12:00" },
      { item: "Public Transport", amount: 62.00, time: "06:45" }
    ],
    wants: [
      { item: "Video Game", amount: 95.00, time: "18:45" },
      { item: "Book", amount: 36.00, time: "13:45" }
    ]
  },
  {
    date: new Date('2024-05-23'),
    needs: [
      { item: "Medicine", amount: 75.75, time: "14:30" },
      { item: "Internet Bill", amount: 105.00, time: "13:45" }
    ],
    wants: [
      { item: "Lunch Out", amount: 44.00, time: "10:15" },
      { item: "Coffee", amount: 9.50, time: "07:30" }
    ]
  },
  {
    date: new Date('2024-05-24'),
    needs: [
      { item: "Gas", amount: 80.00, time: "06:00" },
      { item: "Groceries", amount: 135.50, time: "09:30" }
    ],
    wants: [
      { item: "New Headphones", amount: 130.00, time: "14:45" },
      { item: "Dinner Out", amount: 115.00, time: "18:00" }
    ]
  },
  {
    date: new Date('2024-05-25'),
    needs: [
      { item: "Water Bill", amount: 52.00, time: "11:00" },
      { item: "Dental Checkup", amount: 200.00, time: "11:45" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 32.00, time: "17:15" },
      { item: "Concert Tickets", amount: 200.00, time: "18:45" }
    ]
  },
  {
    date: new Date('2024-05-26'),
    needs: [
      { item: "Car Insurance", amount: 230.00, time: "07:00" },
      { item: "Public Transport", amount: 65.00, time: "05:45" }
    ],
    wants: [
      { item: "Shopping", amount: 125.00, time: "14:00" },
      { item: "Brunch", amount: 75.00, time: "10:00" }
    ]
  },
  {
    date: new Date('2024-05-27'),
    needs: [
      { item: "Groceries", amount: 150.75, time: "09:00" },
      { item: "Medicine", amount: 42.50, time: "11:30" }
    ],
    wants: [
      { item: "New Shoes", amount: 115.00, time: "13:45" },
      { item: "Lunch Out", amount: 46.00, time: "10:15" }
    ]
  },
  {
    date: new Date('2024-05-28'),
    needs: [
      { item: "Rent", amount: 960.00, time: "06:45" },
      { item: "Gym Membership", amount: 58.00, time: "15:00" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 20.99, time: "16:30" },
      { item: "Dinner Out", amount: 120.00, time: "17:15" }
    ]
  },
  {
    date: new Date('2024-05-29'),
    needs: [
      { item: "Phone Bill", amount: 90.00, time: "10:45" },
      { item: "Groceries", amount: 120.25, time: "08:30" }
    ],
    wants: [
      { item: "Ice Cream", amount: 14.00, time: "17:45" },
      { item: "Movie", amount: 29.00, time: "16:00" }
    ]
  },
  {
    date: new Date('2024-05-30'),
    needs: [
      { item: "Electricity Bill", amount: 130.00, time: "11:45" },
      { item: "Public Transport", amount: 68.00, time: "06:30" }
    ],
    wants: [
      { item: "Video Game", amount: 100.00, time: "18:30" },
      { item: "Book", amount: 38.00, time: "13:30" }
    ]
  },
  {
    date: new Date('2024-05-31'),
    needs: [
      { item: "Medicine", amount: 80.75, time: "14:15" },
      { item: "Internet Bill", amount: 110.00, time: "13:30" }
    ],
    wants: [
      { item: "Lunch Out", amount: 48.00, time: "10:00" },
      { item: "Coffee", amount: 10.00, time: "07:15" }
    ]
  },
  {
    date: new Date('2024-06-01'),
    needs: [
      { item: "Gas", amount: 85.00, time: "05:45" },
      { item: "Groceries", amount: 140.50, time: "09:15" }
    ],
    wants: [
      { item: "New Headphones", amount: 135.00, time: "14:30" },
      { item: "Dinner Out", amount: 125.00, time: "17:45" }
    ]
  },
  {
    date: new Date('2024-06-02'),
    needs: [
      { item: "Water Bill", amount: 54.00, time: "10:45" },
      { item: "Dental Checkup", amount: 210.00, time: "11:30" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 34.00, time: "17:00" },
      { item: "Concert Tickets", amount: 210.00, time: "18:30" }
    ]
  },
  {
    date: new Date('2024-06-03'),
    needs: [
      { item: "Car Insurance", amount: 240.00, time: "06:45" },
      { item: "Public Transport", amount: 70.00, time: "05:30" }
    ],
    wants: [
      { item: "Shopping", amount: 130.00, time: "13:45" },
      { item: "Brunch", amount: 80.00, time: "09:45" }
    ]
  },
  {
    date: new Date('2024-06-04'),
    needs: [
      { item: "Groceries", amount: 155.75, time: "08:45" },
      { item: "Medicine", amount: 44.50, time: "11:15" }
    ],
    wants: [
      { item: "New Shoes", amount: 120.00, time: "13:30" },
      { item: "Lunch Out", amount: 50.00, time: "09:45" }
    ]
  },
  {
    date: new Date('2024-06-05'),
    needs: [
      { item: "Rent", amount: 980.00, time: "06:30" },
      { item: "Gym Membership", amount: 60.00, time: "14:45" }
    ],
    wants: [
      { item: "Streaming Subscription", amount: 21.99, time: "16:15" },
      { item: "Dinner Out", amount: 130.00, time: "17:00" }
    ]
  },
  {
    date: new Date('2024-06-06'),
    needs: [
      { item: "Phone Bill", amount: 95.00, time: "10:30" },
      { item: "Groceries", amount: 125.25, time: "08:15" }
    ],
    wants: [
      { item: "Ice Cream", amount: 15.00, time: "17:30" },
      { item: "Movie", amount: 31.00, time: "15:45" }
    ]
  },
  {
    date: new Date('2024-06-07'),
    needs: [
      { item: "Electricity Bill", amount: 135.00, time: "11:30" },
      { item: "Public Transport", amount: 72.00, time: "06:15" }
    ],
    wants: [
      { item: "Video Game", amount: 105.00, time: "18:15" },
      { item: "Book", amount: 40.00, time: "13:15" }
    ]
  },
  {
    date: new Date('2024-06-08'),
    needs: [
      { item: "Medicine", amount: 85.75, time: "14:00" },
      { item: "Internet Bill", amount: 115.00, time: "13:15" }
    ],
    wants: [
      { item: "Lunch Out", amount: 52.00, time: "09:30" },
      { item: "Coffee", amount: 10.50, time: "07:00" }
    ]
  },
  {
    date: new Date('2024-06-09'),
    needs: [
      { item: "Gas", amount: 90.00, time: "05:30" },
      { item: "Groceries", amount: 145.50, time: "09:00" }
    ],
    wants: [
      { item: "New Headphones", amount: 140.00, time: "14:15" },
      { item: "Dinner Out", amount: 135.00, time: "17:30" }
    ]
  },
  {
    date: new Date('2024-06-10'),
    needs: [
      { item: "Water Bill", amount: 56.00, time: "10:30" },
      { item: "Dental Checkup", amount: 220.00, time: "11:15" }
    ],
    wants: [
      { item: "Movie Ticket", amount: 36.00, time: "16:45" },
      { item: "Concert Tickets", amount: 220.00, time: "18:15" }
    ]
  }
];

export default mockTransactions;
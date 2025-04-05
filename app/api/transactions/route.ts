import { NextResponse } from "next/server";

// Mock transaction data
const transactions = [
  {
    id: 1,
    userId: "1",
    name: "Starbucks Coffee",
    date: "2023-11-15",
    amount: -450,
    category: "Food",
    type: "expense",
  },
  {
    id: 2,
    userId: "1",
    name: "Amazon Purchase",
    date: "2023-11-14",
    amount: -2500,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 3,
    userId: "1",
    name: "Salary Deposit",
    date: "2023-11-10",
    amount: 45000,
    category: "Income",
    type: "income",
  },
  {
    id: 4,
    userId: "1",
    name: "Movie Tickets",
    date: "2023-11-08",
    amount: -800,
    category: "Entertainment",
    type: "expense",
  },
  {
    id: 5,
    userId: "1",
    name: "Uber Ride",
    date: "2023-11-07",
    amount: -350,
    category: "Transport",
    type: "expense",
  },
  {
    id: 6,
    userId: "1",
    name: "Electricity Bill",
    date: "2023-11-05",
    amount: -1200,
    category: "Bills",
    type: "expense",
  },
];

export async function GET(request: Request) {
  // In a real app, you would authenticate the user and filter by userId
  // For this demo, we'll return all transactions

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");

  let filteredTransactions = [...transactions];

  if (category) {
    filteredTransactions = filteredTransactions.filter(
      (transaction) =>
        transaction.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (limit) {
    filteredTransactions = filteredTransactions.slice(
      0,
      Number.parseInt(limit)
    );
  }

  return NextResponse.json(filteredTransactions);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.amount || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, you would save to a database
    // For this demo, we'll just return the created transaction
    const newTransaction = {
      id: transactions.length + 1,
      userId: "1", // In a real app, this would be the authenticated user's ID
      name: body.name,
      date: body.date || new Date().toISOString().split("T")[0],
      amount: body.amount,
      category: body.category,
      type: body.amount > 0 ? "income" : "expense",
    };

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}

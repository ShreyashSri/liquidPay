import { NextResponse } from "next/server";

// Mock savings goals data
const savingsGoals = [
  {
    id: 1,
    userId: "1",
    name: "Emergency Fund",
    target: 50000,
    current: 35000,
    deadline: "2023-12-31",
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    userId: "1",
    name: "New Laptop",
    target: 80000,
    current: 20000,
    deadline: "2024-03-31",
    createdAt: "2023-06-10",
  },
  {
    id: 3,
    userId: "1",
    name: "Vacation",
    target: 120000,
    current: 48000,
    deadline: "2024-06-30",
    createdAt: "2023-08-22",
  },
];

export async function GET(request: Request) {
  // In a real app, you would authenticate the user and filter by userId
  // For this demo, we'll return all savings goals

  return NextResponse.json(savingsGoals);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.target || !body.deadline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, you would save to a database
    // For this demo, we'll just return the created savings goal
    const newSavingsGoal = {
      id: savingsGoals.length + 1,
      userId: "1", // In a real app, this would be the authenticated user's ID
      name: body.name,
      target: body.target,
      current: body.current || 0,
      deadline: body.deadline,
      createdAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json(newSavingsGoal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create savings goal" },
      { status: 500 }
    );
  }
}

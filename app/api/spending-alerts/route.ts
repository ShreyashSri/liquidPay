import { NextResponse } from "next/server";

// Mock alerts data
const alerts = [
  {
    id: 1,
    userId: "1",
    title: "High Food Spending",
    description:
      "You've spent ₹5,200 on food this month, which is 30% higher than your usual spending.",
    type: "warning",
    category: "Food",
    createdAt: "2023-11-15T10:30:00Z",
    read: false,
  },
  {
    id: 2,
    userId: "1",
    title: "Subscription Renewal",
    description:
      "Your Netflix subscription (₹499) will renew tomorrow. Consider if you still need this service.",
    type: "info",
    category: "Subscriptions",
    createdAt: "2023-11-14T08:15:00Z",
    read: false,
  },
  {
    id: 3,
    userId: "1",
    title: "Savings Opportunity",
    description:
      "Based on your spending pattern, you could save an additional ₹2,000 this month by reducing entertainment expenses.",
    type: "success",
    category: "Entertainment",
    createdAt: "2023-11-12T14:45:00Z",
    read: true,
  },
];

export async function GET(request: Request) {
  // In a real app, you would authenticate the user and filter by userId
  // For this demo, we'll return all alerts

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get("unreadOnly") === "true";

  let filteredAlerts = [...alerts];

  if (unreadOnly) {
    filteredAlerts = filteredAlerts.filter((alert) => !alert.read);
  }

  return NextResponse.json(filteredAlerts);
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.id) {
      return NextResponse.json({ error: "Missing alert ID" }, { status: 400 });
    }

    // In a real app, you would update the database
    // For this demo, we'll just return success

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 }
    );
  }
}

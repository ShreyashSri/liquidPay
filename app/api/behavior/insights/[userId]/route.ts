import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Forward the request to our backend API
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/behavior/insights/${params.userId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch behavior insights");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in insights route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 
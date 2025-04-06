import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { behaviorId } = await request.json();

    if (!behaviorId) {
      return NextResponse.json(
        { message: 'behaviorId is required' },
        { status: 400 }
      );
    }

    // TODO: Add your LSTM model prediction logic here
    // This is a placeholder response
    const prediction = {
      behaviorId,
      predictedChange: -15,
      confidence: 0.85,
      recommendedActions: [
        'Set a budget limit for late-night shopping',
        'Enable notifications for unusual spending patterns',
      ],
    };

    return NextResponse.json(prediction);

  } catch (error) {
    console.error('Prediction error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 
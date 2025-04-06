"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Check,
  Code,
  FileJson,
  Lock,
  Key,
  ExternalLink,
} from "lucide-react";

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Developer Tools
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            FinSavvy AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              API
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Integrate our powerful financial behavior AI into your applications
          </p>
        </div>

        {/* API Key Section */}
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Your API Key
              </h2>
              <p className="text-gray-400">
                Use this key to authenticate your API requests
              </p>
            </div>
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
              <Key className="h-4 w-4 mr-2" /> Generate New Key
            </Button>
          </div>

          <div className="mt-6 relative">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-gray-300 flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2 text-yellow-500" />
                <span>
                  sk_test_51NzT8aSH0d1V3g5n8kJ2pQ7rY9tX6wL0mB3cD4fG5hJ6kK7lM8nO9pP0qR1sT2uV3wX4yZ5aA6bB7cC8dD9eE0fF1gG2hH3iI
                </span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    "sk_test_51NzT8aSH0d1V3g5n8kJ2pQ7rY9tX6wL0mB3cD4fG5hJ6kK7lM8nO9pP0qR1sT2uV3wX4yZ5aA6bB7cC8dD9eE0fF1gG2hH3iI"
                  )
                }
                className="text-gray-400 hover:text-white transition-colors"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-yellow-500 text-sm mt-2">
              <Lock className="h-4 w-4 inline mr-1" /> Keep your API key secure.
              Never share it in public repositories or client-side code.
            </p>
          </div>
        </div>

        {/* API Documentation Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-800 p-1">
              <TabsTrigger
                value="overview"
                className={`${
                  activeTab === "overview"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="authentication"
                className={`${
                  activeTab === "authentication"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Authentication
              </TabsTrigger>
              <TabsTrigger
                value="endpoints"
                className={`${
                  activeTab === "endpoints"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Endpoints
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className={`${
                  activeTab === "examples"
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
                } px-6 py-2`}
              >
                Examples
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">API Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  The FinSavvy AI API allows you to integrate our financial
                  behavior analysis and recommendations into your applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Base URL
                  </h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-gray-300">
                    https://api.finsavvy.ai/v1
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Rate Limits
                  </h3>
                  <p className="text-gray-400 mb-4">
                    The API has the following rate limits based on your plan:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-2 px-4 text-left text-gray-400 font-medium">
                            Plan
                          </th>
                          <th className="py-2 px-4 text-left text-gray-400 font-medium">
                            Requests per minute
                          </th>
                          <th className="py-2 px-4 text-left text-gray-400 font-medium">
                            Requests per day
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-700">
                          <td className="py-2 px-4 text-white">Free</td>
                          <td className="py-2 px-4 text-gray-300">10</td>
                          <td className="py-2 px-4 text-gray-300">1,000</td>
                        </tr>
                        <tr className="border-b border-gray-700">
                          <td className="py-2 px-4 text-white">Pro</td>
                          <td className="py-2 px-4 text-gray-300">60</td>
                          <td className="py-2 px-4 text-gray-300">10,000</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 text-white">Premium</td>
                          <td className="py-2 px-4 text-gray-300">120</td>
                          <td className="py-2 px-4 text-gray-300">Unlimited</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Response Format
                  </h3>
                  <p className="text-gray-400 mb-2">
                    All API responses are returned in JSON format with the
                    following structure:
                  </p>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300 relative">
                    <pre>{`{
  "success": true,
  "data": { ... },  // The response data
  "meta": {         // Metadata about the request
    "requestId": "req_123456789",
    "timestamp": "2023-11-15T12:34:56Z
  }
}`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`{
  "success": true,
  "data": { ... },  // The response data
  "meta": {         // Metadata about the request
    "requestId": "req_123456789",
    "timestamp": "2023-11-15T12:34:56Z
  }
}`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Error Handling
                  </h3>
                  <p className="text-gray-400 mb-2">
                    When an error occurs, the API will return a JSON response
                    with the following structure:
                  </p>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300 relative">
                    <pre>{`{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": { ... }  // Additional error details
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2023-11-15T12:34:56Z
  }
}`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`{
  "success": false,
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": { ... }  // Additional error details
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2023-11-15T12:34:56Z
  }
}`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="authentication" className="mt-0">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Authentication</CardTitle>
                <CardDescription className="text-gray-400">
                  Learn how to authenticate your API requests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    API Key Authentication
                  </h3>
                  <p className="text-gray-400 mb-4">
                    All API requests must include your API key in the
                    Authorization header using the Bearer token format:
                  </p>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-gray-300 relative">
                    <pre>Authorization: Bearer YOUR_API_KEY</pre>
                    <button
                      onClick={() =>
                        copyToClipboard("Authorization: Bearer YOUR_API_KEY")
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Example Request with Authentication
                  </h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300 relative">
                    <pre>{`curl -X GET \\
  https://api.finsavvy.ai/v1/user/profile \\
  -H "Authorization: Bearer sk_test_51NzT8aSH0d1V3g5n8kJ2pQ7rY9tX6wL0mB3cD4fG5hJ6kK7lM8nO9pP0qR1sT2uV3wX4yZ5aA6bB7cC8dD9eE0fF1gG2hH3iI" \\
  -H "Content-Type: application/json"`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`curl -X GET \\
  https://api.finsavvy.ai/v1/user/profile \\
  -H "Authorization: Bearer sk_test_51NzT8aSH0d1V3g5n8kJ2pQ7rY9tX6wL0mB3cD4fG5hJ6kK7lM8nO9pP0qR1sT2uV3wX4yZ5aA6bB7cC8dD9eE0fF1gG2hH3iI" \\
  -H "Content-Type: application/json"`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    API Key Security
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      To keep your API key secure, follow these best practices:
                    </p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      <li>
                        Never include your API key in client-side code or public
                        repositories
                      </li>
                      <li>
                        Store your API key in environment variables or a secure
                        key management system
                      </li>
                      <li>Rotate your API keys periodically</li>
                      <li>
                        Use different API keys for development and production
                        environments
                      </li>
                      <li>
                        Implement IP restrictions for your API keys when
                        possible
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Endpoints Tab */}
          <TabsContent value="endpoints" className="mt-0">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">API Endpoints</CardTitle>
                <CardDescription className="text-gray-400">
                  Explore the available API endpoints and their functionality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    User Endpoints
                  </h3>
                  <div className="space-y-4">
                    <EndpointItem
                      method="GET"
                      endpoint="/user/profile"
                      description="Get the user's profile information"
                    />
                    <EndpointItem
                      method="PUT"
                      endpoint="/user/profile"
                      description="Update the user's profile information"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/user/preferences"
                      description="Get the user's notification and app preferences"
                    />
                    <EndpointItem
                      method="PUT"
                      endpoint="/user/preferences"
                      description="Update the user's notification and app preferences"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Financial Analysis Endpoints
                  </h3>
                  <div className="space-y-4">
                    <EndpointItem
                      method="POST"
                      endpoint="/analysis/transactions"
                      description="Analyze a batch of financial transactions"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/analysis/spending-patterns"
                      description="Get spending pattern analysis for a user"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/analysis/behavior-insights"
                      description="Get behavioral insights based on transaction history"
                    />
                    <EndpointItem
                      method="POST"
                      endpoint="/analysis/predict-spending"
                      description="Predict future spending based on historical data"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recommendations Endpoints
                  </h3>
                  <div className="space-y-4">
                    <EndpointItem
                      method="GET"
                      endpoint="/recommendations/savings"
                      description="Get personalized savings recommendations"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/recommendations/budget"
                      description="Get budget optimization recommendations"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/recommendations/nudges"
                      description="Get real-time behavioral nudges for a user"
                    />
                    <EndpointItem
                      method="POST"
                      endpoint="/recommendations/feedback"
                      description="Submit feedback on recommendations"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Gamification Endpoints
                  </h3>
                  <div className="space-y-4">
                    <EndpointItem
                      method="GET"
                      endpoint="/gamification/challenges"
                      description="Get available savings challenges for a user"
                    />
                    <EndpointItem
                      method="POST"
                      endpoint="/gamification/challenges/{id}/accept"
                      description="Accept a savings challenge"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/gamification/achievements"
                      description="Get user's achievements and progress"
                    />
                    <EndpointItem
                      method="GET"
                      endpoint="/gamification/leaderboard"
                      description="Get savings leaderboard data"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="mt-0">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Code Examples</CardTitle>
                <CardDescription className="text-gray-400">
                  Sample code for common API operations in different languages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    JavaScript (Node.js)
                  </h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 relative">
                    <pre>{`const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.finsavvy.ai/v1';

async function analyzeTransactions(transactions) {
  try {
    const response = await axios.post(\`\${BASE_URL}/analysis/transactions\`, {
      transactions
    }, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing transactions:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
const transactions = [
  {
    id: 'txn_123',
    amount: 45.99,
    date: '2023-11-15',
    merchant: 'Starbucks',
    category: 'Food & Drink'
  },
  // More transactions...
];

analyzeTransactions(transactions)
  .then(result => console.log('Analysis result:', result))
  .catch(err => console.error('Failed to analyze:', err));`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.finsavvy.ai/v1';

async function analyzeTransactions(transactions) {
  try {
    const response = await axios.post(\`\${BASE_URL}/analysis/transactions\`, {
      transactions
    }, {
      headers: {
        'Authorization': \`Bearer \${API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing transactions:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
const transactions = [
  {
    id: 'txn_123',
    amount: 45.99,
    date: '2023-11-15',
    merchant: 'Starbucks',
    category: 'Food & Drink'
  },
  // More transactions...
];

analyzeTransactions(transactions)
  .then(result => console.log('Analysis result:', result))
  .catch(err => console.error('Failed to analyze:', err));`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Python
                  </h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 relative">
                    <pre>{`import requests
import json

API_KEY = 'YOUR_API_KEY'
BASE_URL = 'https://api.finsavvy.ai/v1'

def get_behavior_insights(user_id):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    params = {
        'user_id': user_id,
        'time_period': '3months'
    }
    
    response = requests.get(
        f'{BASE_URL}/analysis/behavior-insights',
        headers=headers,
        params=params
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

# Example usage
insights = get_behavior_insights('user_123')
if insights:
    print(json.dumps(insights, indent=2))`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`import requests
import json

API_KEY = 'YOUR_API_KEY'
BASE_URL = 'https://api.finsavvy.ai/v1'

def get_behavior_insights(user_id):
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    params = {
        'user_id': user_id,
        'time_period': '3months'
    }
    
    response = requests.get(
        f'{BASE_URL}/analysis/behavior-insights',
        headers=headers,
        params=params
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return None

# Example usage
insights = get_behavior_insights('user_123')
if insights:
    print(json.dumps(insights, indent=2))`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    React (JavaScript)
                  </h3>
                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 relative">
                    <pre>{`import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_FINSAVVY_API_KEY;
const BASE_URL = 'https://api.finsavvy.ai/v1';

function SavingsRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await axios.get(\`\${BASE_URL}/recommendations/savings\`, {
          headers: {
            'Authorization': \`Bearer \${API_KEY}\`,
            'Content-Type': 'application/json'
          }
        });
        
        setRecommendations(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || err.message);
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h2>Savings Recommendations</h2>
      <ul>
        {recommendations.map(rec => (
          <li key={rec.id}>
            <h3>{rec.title}</h3>
            <p>{rec.description}</p>
            <span>Potential savings: {rec.potentialSavings}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</pre>
                    <button
                      onClick={() =>
                        copyToClipboard(`import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_FINSAVVY_API_KEY;
const BASE_URL = 'https://api.finsavvy.ai/v1';

function SavingsRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await axios.get(\`\${BASE_URL}/recommendations/savings\`, {
          headers: {
            'Authorization': \`Bearer \${API_KEY}\`,
            'Content-Type': 'application/json'
          }
        });
        
        setRecommendations(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || err.message);
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  if (loading) return <div>Loading recommendations...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h2>Savings Recommendations</h2>
      <ul>
        {recommendations.map(rec => (
          <li key={rec.id}>
            <h3>{rec.title}</h3>
            <p>{rec.description}</p>
            <span>Potential savings: {rec.potentialSavings}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}`)
                      }
                      className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* SDKs Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gray-800 text-gray-300 border-gray-700">
              Developer Tools
            </Badge>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Official SDKs
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Use our official client libraries to integrate with the FinSavvy
              AI API
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SdkCard
              language="JavaScript"
              icon={<Code className="h-8 w-8 text-yellow-500" />}
              description="Official JavaScript SDK for Node.js and browser environments"
              installCommand="npm install finsavvy-ai"
              docsUrl="#"
            />
            <SdkCard
              language="Python"
              icon={<Code className="h-8 w-8 text-yellow-500" />}
              description="Official Python SDK for server-side applications"
              installCommand="pip install finsavvy-ai"
              docsUrl="#"
            />
            <SdkCard
              language="Java"
              icon={<Code className="h-8 w-8 text-yellow-500" />}
              description="Official Java SDK for enterprise applications"
              installCommand="maven: com.finsavvy.api:client:1.0.0"
              docsUrl="#"
            />
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-white">Need Help?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Our developer support team is here to help you integrate with our
            API
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium">
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              Join Developer Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EndpointItem({ method, endpoint, description }) {
  const methodColors = {
    GET: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    POST: "bg-green-500/20 text-green-400 border-green-500/30",
    PUT: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    DELETE: "bg-red-500/20 text-red-400 border-red-500/30",
    PATCH: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
      <div className="flex items-start">
        <Badge className={`mr-3 ${methodColors[method]}`}>{method}</Badge>
        <div className="flex-1">
          <div className="font-mono text-white mb-1">{endpoint}</div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <FileJson className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function SdkCard({ language, icon, description, installCommand, docsUrl }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-yellow-500/30 transition-all overflow-hidden">
      <CardContent className="p-6 pt-8">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-xl font-semibold text-white ml-3">{language}</h3>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 font-mono text-sm text-gray-300 flex justify-between items-center mb-4">
          <span className="truncate">{installCommand}</span>
          <button
            onClick={() => copyToClipboard(installCommand)}
            className="text-gray-400 hover:text-white transition-colors ml-2 flex-shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        <a
          href={docsUrl}
          className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center"
        >
          View Documentation <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  );
}

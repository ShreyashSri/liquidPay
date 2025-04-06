"use client";

import type React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Shield,
  Clock,
  Wallet,
  Coins,
  Calendar,
  Mail,
  Key,
  Save,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface UserProfile {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  age: number;
  saveITCoin: number;
  walletID: string;
  createdAt: string;
  lastLoggedIn: string;
  isVerified: boolean;
  transactions: Transaction[];
  newTransactions: NewTransaction[];
}

interface Transaction {
  date: string;
  needs: TransactionItem[];
  wants: TransactionItem[];
}

interface TransactionItem {
  item: string;
  amount: number;
  time: string;
}

interface NewTransaction {
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  description: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: 0,
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = Cookies.get("token");

      try {
        const res = await axios.get("http://localhost:8188/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUser(res.data.user);
        setFormData({
          fullname: res.data.user.fullname,
          email: res.data.user.email,
          age: res.data.user.age,
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);

        // For development - mock data
        setUser({
          _id: "user123",
          username: "johndoe",
          fullname: "John Doe",
          email: "john.doe@example.com",
          age: 32,
          saveITCoin: 1250,
          walletID: "wallet_12345xyz",
          createdAt: new Date().toISOString(),
          lastLoggedIn: new Date().toISOString(),
          isVerified: true,
          transactions: [],
          newTransactions: [
            {
              category: "Groceries",
              amount: 2500,
              type: "expense",
              date: new Date().toISOString(),
              description: "Weekly grocery shopping",
            },
            {
              category: "Salary",
              amount: 50000,
              type: "income",
              date: new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
              description: "Monthly salary",
            },
            {
              category: "Dining",
              amount: 1200,
              type: "expense",
              date: new Date(
                Date.now() - 2 * 24 * 60 * 60 * 1000
              ).toISOString(),
              description: "Restaurant dinner",
            },
          ],
        });
        setFormData({
          fullname: "John Doe",
          email: "john.doe@example.com",
          age: 32,
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number.parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      await axios.put("http://localhost:8188/api/user/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Update local user state
      if (user) {
        setUser({
          ...user,
          fullname: formData.fullname,
          email: formData.email,
          age: formData.age,
        });
      }

      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <div className="text-white">Loading your profile...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-gray-400">
              Manage your account information and settings
            </p>
          </div>
          <Button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black"
          >
            {editMode ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2 flex flex-row items-center space-x-4">
                <Avatar className="h-20 w-20 border-2 border-yellow-500">
                  <AvatarImage
                    src="/placeholder-user.jpg"
                    alt={user?.fullname}
                  />
                  <AvatarFallback className="bg-yellow-600 text-black text-xl">
                    {user ? getInitials(user.fullname) : "JD"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl text-white">
                    {user?.fullname}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    @{user?.username}
                  </CardDescription>
                  <div className="flex items-center mt-1">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        user?.isVerified ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-400">
                      {user?.isVerified
                        ? "Verified Account"
                        : "Unverified Account"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {!editMode ? (
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Age</p>
                        <p className="text-white">{user?.age} years</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white">
                          {user ? formatDate(user.createdAt) : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Wallet className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-400">Wallet ID</p>
                        <p className="text-white font-mono text-sm">
                          {user?.walletID}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-white">
                        Age
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black"
                    >
                      Save Changes
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                  SaveIT Coins
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your reward points for good financial habits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {user?.saveITCoin || 0}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    You're in the top 15% of savers this month!
                  </p>
                  <Progress value={65} className="h-2 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" />
                  </Progress>
                  <p className="text-gray-400 text-xs mt-2">
                    235 more coins until your next reward
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full border-yellow-600 text-yellow-500 hover:bg-yellow-600/10"
                >
                  View Rewards
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="transactions" className="w-full">
                  <TabsList className="bg-gray-700 w-full">
                    <TabsTrigger value="transactions" className="flex-1">
                      Transactions
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex-1">
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex-1">
                      Preferences
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="transactions" className="pt-4">
                    <div className="rounded-md border border-gray-700">
                      <Table>
                        <TableHeader className="bg-gray-900">
                          <TableRow>
                            <TableHead className="text-gray-400">
                              Description
                            </TableHead>
                            <TableHead className="text-gray-400">
                              Category
                            </TableHead>
                            <TableHead className="text-gray-400">
                              Date
                            </TableHead>
                            <TableHead className="text-gray-400 text-right">
                              Amount
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {user?.newTransactions &&
                          user.newTransactions.length > 0 ? (
                            user.newTransactions.map((transaction, index) => (
                              <TableRow key={index} className="border-gray-700">
                                <TableCell className="text-white">
                                  {transaction.description}
                                </TableCell>
                                <TableCell className="text-white">
                                  {transaction.category}
                                </TableCell>
                                <TableCell className="text-white">
                                  {formatDate(transaction.date)}
                                </TableCell>
                                <TableCell
                                  className={`text-right font-medium ${
                                    transaction.type === "income"
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }`}
                                >
                                  {transaction.type === "income" ? "+" : "-"}₹
                                  {transaction.amount.toLocaleString()}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={4}
                                className="text-center text-gray-400 py-4"
                              >
                                No transactions found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="text-gray-400 border-gray-700 hover:bg-gray-700"
                      >
                        View All Transactions
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="pt-4 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <p className="text-white font-medium">Password</p>
                            <p className="text-gray-400 text-sm">
                              Last changed 45 days ago
                            </p>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-gray-700 text-gray-400 hover:bg-gray-700"
                            >
                              Change
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-800 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle>Change Password</DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Enter your current password and a new password.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label
                                  htmlFor="current-password"
                                  className="text-white"
                                >
                                  Current Password
                                </Label>
                                <Input
                                  id="current-password"
                                  type="password"
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="new-password"
                                  className="text-white"
                                >
                                  New Password
                                </Label>
                                <Input
                                  id="new-password"
                                  type="password"
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label
                                  htmlFor="confirm-password"
                                  className="text-white"
                                >
                                  Confirm New Password
                                </Label>
                                <Input
                                  id="confirm-password"
                                  type="password"
                                  className="bg-gray-700 border-gray-600 text-white"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                                Update Password
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Key className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <p className="text-white font-medium">
                              Two-Factor Authentication
                            </p>
                            <p className="text-gray-400 text-sm">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-400 hover:bg-gray-700"
                        >
                          Enable
                        </Button>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                          <div>
                            <p className="text-white font-medium">
                              Account Activity
                            </p>
                            <p className="text-gray-400 text-sm">
                              View recent logins and security events
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-400 hover:bg-gray-700"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="pt-4 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">
                            Email Notifications
                          </p>
                          <p className="text-gray-400 text-sm">
                            Receive updates about your account
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            Weekly
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-500 text-black hover:bg-yellow-400"
                          >
                            Daily
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            Off
                          </Button>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">
                            Spending Alerts
                          </p>
                          <p className="text-gray-400 text-sm">
                            Get notified when you exceed your budget
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            10%
                          </Button>
                          <Button
                            size="sm"
                            className="bg-yellow-500 text-black hover:bg-yellow-400"
                          >
                            20%
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            30%
                          </Button>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-medium">
                            Currency Display
                          </p>
                          <p className="text-gray-400 text-sm">
                            Choose your preferred currency format
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            className="bg-yellow-500 text-black hover:bg-yellow-400"
                          >
                            ₹ INR
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            $ USD
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-400 hover:bg-gray-700"
                          >
                            € EUR
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">
                    Account Status
                  </CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-white">Active</CardTitle>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      Last login:{" "}
                      {user
                        ? new Date(user.lastLoggedIn).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardDescription className="text-gray-400">
                    Savings Progress
                  </CardDescription>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl text-white">
                      75% of Goal
                    </CardTitle>
                    <Save className="h-5 w-5 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Progress value={75} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" />
                    </Progress>
                    <div className="flex items-center text-green-500 text-sm">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>+12% from last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Connected Accounts</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your linked bank accounts and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                        <span className="text-white font-bold">SB</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          State Bank of India
                        </p>
                        <p className="text-gray-400 text-sm">
                          Connected on Apr 1, 2025
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-400 hover:bg-gray-600"
                    >
                      Disconnect
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mr-4">
                        <span className="text-white font-bold">HD</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">HDFC Bank</p>
                        <p className="text-gray-400 text-sm">
                          Connected on Mar 15, 2025
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-400 hover:bg-gray-600"
                    >
                      Disconnect
                    </Button>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black">
                    Connect New Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

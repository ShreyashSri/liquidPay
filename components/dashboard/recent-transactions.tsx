import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentTransactions() {
  const transactions = [
    {
      id: "TX123456",
      type: "Buy",
      creditType: "Renewable Energy",
      amount: 500,
      price: 28.5,
      total: 14250,
      counterparty: "EcoSolutions Corp",
      date: "2023-06-15T10:30:00",
    },
    {
      id: "TX123457",
      type: "Sell",
      creditType: "Forest Conservation",
      amount: 300,
      price: 32.75,
      total: 9825,
      counterparty: "Green Investments Ltd",
      date: "2023-06-14T14:45:00",
    },
    {
      id: "TX123458",
      type: "Buy",
      creditType: "Methane Capture",
      amount: 750,
      price: 19.25,
      total: 14437.5,
      counterparty: "CleanAir Technologies",
      date: "2023-06-12T09:15:00",
    },
    {
      id: "TX123459",
      type: "Sell",
      creditType: "Wind Energy",
      amount: 200,
      price: 24.5,
      total: 4900,
      counterparty: "Sustainable Future Inc",
      date: "2023-06-10T16:20:00",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Credit Type</TableHead>
              <TableHead>Counterparty</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>
                  <Badge variant={tx.type === "Buy" ? "default" : "secondary"}>{tx.type}</Badge>
                </TableCell>
                <TableCell>{tx.creditType}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {tx.counterparty
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{tx.counterparty}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{tx.amount}</TableCell>
                <TableCell className="text-right">${tx.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">${tx.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">{new Date(tx.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownLeft, Search, Download } from "lucide-react"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage all platform transactions</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R 424,539</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R 256,300</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Debits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R 168,239</div>
            <p className="text-xs text-muted-foreground">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 need attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="h-9" />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Date Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="w-full min-w-[640px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-medium">{transaction.user}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={transaction.type === "credit" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {transaction.type === "credit" ? "+" : "-"}R {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : transaction.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                        }`}
                      >
                        {transaction.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{transaction.reference}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing 1 to 10 of 156 transactions</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

const transactions = [
  {
    id: "TXN001",
    date: "2023-11-14",
    user: "Thabo Mbeki",
    type: "credit",
    amount: 250.0,
    status: "Completed",
    reference: "TXN-20231114-001",
  },
  {
    id: "TXN002",
    date: "2023-11-13",
    user: "Nomzamo Mbatha",
    type: "debit",
    amount: 1000.0,
    status: "Completed",
    reference: "TXN-20231113-002",
  },
  {
    id: "TXN003",
    date: "2023-11-12",
    user: "Siya Kolisi",
    type: "credit",
    amount: 500.0,
    status: "Completed",
    reference: "TXN-20231112-003",
  },
  {
    id: "TXN004",
    date: "2023-11-11",
    user: "Trevor Noah",
    type: "debit",
    amount: 750.0,
    status: "Pending",
    reference: "TXN-20231111-004",
  },
  {
    id: "TXN005",
    date: "2023-11-10",
    user: "Patrice Motsepe",
    type: "credit",
    amount: 2500.0,
    status: "Completed",
    reference: "TXN-20231110-005",
  },
  {
    id: "TXN006",
    date: "2023-11-09",
    user: "Bonang Matheba",
    type: "debit",
    amount: 300.0,
    status: "Completed",
    reference: "TXN-20231109-006",
  },
  {
    id: "TXN007",
    date: "2023-11-08",
    user: "Caster Semenya",
    type: "credit",
    amount: 1200.0,
    status: "Failed",
    reference: "TXN-20231108-007",
  },
  {
    id: "TXN008",
    date: "2023-11-07",
    user: "Elon Musk",
    type: "debit",
    amount: 5000.0,
    status: "Completed",
    reference: "TXN-20231107-008",
  },
  {
    id: "TXN009",
    date: "2023-11-06",
    user: "Thabo Mbeki",
    type: "credit",
    amount: 450.0,
    status: "Pending",
    reference: "TXN-20231106-009",
  },
  {
    id: "TXN010",
    date: "2023-11-05",
    user: "Nomzamo Mbatha",
    type: "debit",
    amount: 800.0,
    status: "Completed",
    reference: "TXN-20231105-010",
  },
]

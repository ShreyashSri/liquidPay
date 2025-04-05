"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle, ChevronRight } from "lucide-react"

const banks = [
  { id: 1, name: "HDFC Bank", logo: "/placeholder.svg?height=40&width=40", connected: false },
  { id: 2, name: "ICICI Bank", logo: "/placeholder.svg?height=40&width=40", connected: false },
  { id: 3, name: "SBI", logo: "/placeholder.svg?height=40&width=40", connected: false },
  { id: 4, name: "Axis Bank", logo: "/placeholder.svg?height=40&width=40", connected: false },
  { id: 5, name: "Kotak Mahindra", logo: "/placeholder.svg?height=40&width=40", connected: false },
  { id: 6, name: "Yes Bank", logo: "/placeholder.svg?height=40&width=40", connected: false },
]

export default function BankIntegration() {
  const [connectedBanks, setConnectedBanks] = useState<number[]>([])

  const toggleConnection = (bankId: number) => {
    if (connectedBanks.includes(bankId)) {
      setConnectedBanks(connectedBanks.filter((id) => id !== bankId))
    } else {
      setConnectedBanks([...connectedBanks, bankId])
    }
  }

  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.2),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(192,192,192,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Secure Integration</Badge>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Connect Your Bank Accounts{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Securely
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Link your accounts to get personalized insights and recommendations. Your data is encrypted and never
              shared.
            </p>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 mb-8 flex items-center">
              <Lock className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0" />
              <p className="text-gray-400 text-sm">
                We use bank-level 256-bit encryption to keep your information safe and secure.
              </p>
            </div>

            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-medium py-6 px-8 rounded-md flex items-center justify-center transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              Connect All Accounts
            </Button>
          </div>

          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank) => (
                <Card
                  key={bank.id}
                  className={`bg-gray-800/70 backdrop-blur-sm border ${
                    connectedBanks.includes(bank.id)
                      ? "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                      : "border-gray-700 hover:border-gray-600"
                  } transition-all cursor-pointer`}
                  onClick={() => toggleConnection(bank.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 overflow-hidden">
                        <Image
                          src={bank.logo || "/placeholder.svg"}
                          alt={bank.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{bank.name}</h3>
                        <p className="text-xs text-gray-400">
                          {connectedBanks.includes(bank.id) ? "Connected" : "Click to connect"}
                        </p>
                      </div>
                    </div>
                    {connectedBanks.includes(bank.id) ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


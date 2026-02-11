"use client"

import type { User } from "@/app/types/user"
import { Card } from "@/components/ui/card"
import { Users, UserCheck, UserX, Clock } from "lucide-react"

interface UserStatsProps {
  users: User[]
}

export function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "ACTIVE").length
  const inactiveUsers = users.filter((u) => u.status === "INACTIVE").length
  const pendingUsers = users.filter((u) => u.status === "PENDING").length

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-foreground",
      bg: "bg-secondary",
    },
    {
      label: "Active",
      value: activeUsers,
      icon: UserCheck,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Inactive",
      value: inactiveUsers,
      icon: UserX,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
    {
      label: "Pending",
      value: pendingUsers,
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

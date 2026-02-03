"use client"

import { useState, useMemo } from "react"
import type { User, UserFormData } from "@/app/types/user"
import { mockUsers } from "@/app/lib/mock-users"
import { Button } from "@/components/ui/button"
import { UserTable } from "@/app/components/users/user-table"
import { UserFormDialog } from "@/app/components/users/user-form-dialog"
import { UserDetailsDialog } from "@/app/components/users/user-details-dialog"
import { DeleteUserDialog } from "@/app/components/users/delete-user-dialog"
import { UserFilters } from "@/app/components/users/user-filters"
import { UserStats } from "@/app/components/users/user-stats"
import { Plus, Users } from "lucide-react"

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter

      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchQuery, roleFilter, statusFilter])

  const handleCreateUser = () => {
    setSelectedUser(null)
    setFormDialogOpen(true)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setDetailsDialogOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setFormDialogOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const handleSaveUser = (data: UserFormData) => {
    if (selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...u, ...data } : u
        )
      )
    } else {
      const newUser: User = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        lastLogin: null,
      }
      setUsers([newUser, ...users])
    }
  }

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id))
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  User Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage user accounts and permissions
                </p>
              </div>
            </div>
            <Button onClick={handleCreateUser} className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </header>

        <UserStats users={users} />

        <div className="mt-8 space-y-4">
          <UserFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{users.length}</span>{" "}
              users
            </p>
          </div>

          <UserTable
            users={filteredUsers}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>

        <UserFormDialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
          user={selectedUser}
          onSave={handleSaveUser}
        />

        <UserDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          user={selectedUser}
        />

        <DeleteUserDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          user={selectedUser}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  )
}

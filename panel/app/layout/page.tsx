"use client"

import { useState } from "react"
import type { User } from "@/app/types/user"
import { Button } from "@/components/ui/button"
import { UserTable } from "@/app/components/users/user-table"
import { UserFormDialog } from "@/app/components/users/user-form-dialog"
import { UserDetailsDialog } from "@/app/components/users/user-details-dialog"
import { DeleteUserDialog } from "@/app/components/users/delete-user-dialog"
import { UserFilters } from "@/app/components/users/user-filters"
import { UserStats } from "@/app/components/users/user-stats"
import { Plus, Users } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function UserManagement() {
  const queryClient = useQueryClient()

  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchQuery, roleFilter, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({
        searchQuery,
        role: roleFilter,
        status: statusFilter,
      })

      const res = await fetch(`/api/usersFiltered?${params}`)
      const data = await res.json()
      return data.usersFiltered as User[]
    },
  })

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

  //  depois de salvar no backend
  const handleSaveUser = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] })
    setFormDialogOpen(false)
  }

  // depois de deletar no backend
  const handleConfirmDelete = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] })
    setDeleteDialogOpen(false)
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
                  Gerenciador de usuários
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gerencie usuários e permissões
                </p>
              </div>
            </div>

            <Button onClick={handleCreateUser} className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar usuário
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
                {users.length}
              </span>{" "}
              users
            </p>
          </div>

          {isLoading ? (
            <p>Carregando usuários...</p>
          ) : (
            <UserTable
              users={users}
              onView={handleViewUser}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          )}
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

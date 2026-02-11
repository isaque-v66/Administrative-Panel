"use client"


import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

interface UserFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  roleFilter: string
  onRoleFilterChange: (role: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void

}





export function UserFilters({searchQuery, onSearchChange, roleFilter, onRoleFilterChange, statusFilter,onStatusFilterChange
}: UserFiltersProps) {



  
  
  
//   const {data: usersFiltered = [], error} = useQuery({
//     queryKey: ["filterUsers", searchQuery, roleFilter, statusFilter],
//     queryFn: () => fetchUsers({
//       searchQuery,
//       role: roleFilter,
//       status: statusFilter
//     })
//   })
  
  
  
//   useEffect(() => {
//   if (usersFiltered) {
//     onUsersFiltered(usersFiltered)
//   }
// }, [usersFiltered])




  // async function fetchUsers(filters: {searchQuery: string, role: string, status: string}) {

  //   const params = new URLSearchParams(filters)

  //   const res = await fetch(`/api/usersFiltered?${params}`)

  //   if(!res.ok){
  //     throw new Error("Erro ao enviar parâmetros à API")
  //   }

  //   const data = await res.json()

  //   return data.usersFiltered
  // }





  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Procure usuários..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="flex gap-3">
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Cargos</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="EDITOR">Editor</SelectItem>
            <SelectItem value="VIEWER">Viewer</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

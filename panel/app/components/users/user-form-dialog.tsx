"use client"

import React from "react"

import type { User, UserFormData } from "@/app/types/user"
import { CircularProgress, Box } from '@mui/material';
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import z from 'zod'
import { Controller, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";


interface UserFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: User | null
  onSave: (data: User) => void
}



const FormSchema = z.object({
  name: z.string().max(50, "O limite são 50 caracteres").min(2, "No mínimo 2 caracteres"),
  email: z.string().email("Email invalido"),
  role: z.enum(["ADMIN" , "EDITOR" , "VIEWER"]),
  status: z.enum(["ACTIVE" , "INACTIVE" , "PENDING"]),
  departments: z.enum(["ENGINEERING", "MARKETING", "SALES", "PRODUCT", "DESIGN", "FINANCE", "OPERATIONS", "HR",])

})

type Formtype = z.infer<typeof FormSchema>





export function UserFormDialog({open, onOpenChange, user, onSave}: UserFormDialogProps) {  
  const [dataForm, setDataForm] = useState<Formtype>()
  const [cardSuccess, setCardSuccess] = useState<boolean>(false)
  const {register, handleSubmit, control, formState: {errors, isSubmitting}, reset} = useForm<Formtype>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
       name: "", email: "", role: "VIEWER", status: "PENDING", departments: "ENGINEERING",
    }
  })


  const queryClient = useQueryClient()
  const isEditing = !!user



useEffect(() => {
  if (user) {
    reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      departments: user.departments,
    })
  }
}, [user, reset])






  if(cardSuccess) {
    return(
      <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-3"><Check className="bg-green-400"/><span>Usuário criado com sucesso</span></CardTitle>
        </CardHeader>

        <CardContent>
          <Button onClick={() => setCardSuccess(false)}>Voltar</Button>
        </CardContent>
      </Card>
      </div>
    )
  }



  



  const sendForm = async (data: Formtype) => {


    try {

       const isEditing = !!user?.id

       const url = isEditing ? `/api/updateUser?id=${user.id}` : `/api/createUser`

       const method = isEditing ? "PUT" : "POST" 

    
      const send = await fetch(url, {
        method,
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(data)
      })


      if(!send.ok) {
        throw new Error("Erro ao se comunicar com a API")
      }


      const res = await send.json()
      setDataForm(res)
      onSave(res)
      setCardSuccess(true)
      await queryClient.invalidateQueries({queryKey: ["users"]})



    } catch(err) {
      console.error(err)
      setCardSuccess(false)
      return
    }


  }






  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit User" : "Create New User"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the user's information below."
              : "Fill in the details to create a new user account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(sendForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              {errors.name && (<p className="text-red-600">{errors.name.message}</p>)}
              <Label htmlFor="name">Nome completo</Label>
              <Input
                {...register("name")}
                placeholder="Digite o nome completo"
                required
              />
            </div>
            <div className="grid gap-2">
              {errors.email && (<p className="text-red-600">{errors.email.message}</p>)}
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                {...register("email")}
                placeholder="email@company.com"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="role">Cargo</Label>
                <Controller control={control} name="role"
                render={({field}) => 
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Escolha o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="EDITOR">Editor</SelectItem>
                      <SelectItem value="VIEWER">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                }
                />




              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller control={control} name="status"
                 render={({field}) => 
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>
                } />
              </div>
            </div>



            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>

              <Controller control={control} name="departments"
              render={({field}) => 
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ENGINEERING">Engenharia</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="SALES">Sales</SelectItem>
                    <SelectItem value="PRODUCT">Produtor</SelectItem>
                    <SelectItem value="DESIGN">Design</SelectItem>
                    <SelectItem value="FINANCE">Financeiro</SelectItem>
                    <SelectItem value="OPERATIONS">Operações</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>
              } />
            </div>
          </div>





          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{isSubmitting ? (<div><CircularProgress /></div>):("Criar usuário")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

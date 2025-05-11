"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"

type CardActionsProps = {
  onEdit: () => void
  onDelete: () => void
  itemType?: "blog" | "project" // To customize messages
}

export function CardActions({ onEdit, onDelete, itemType = "item" }: CardActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    setIsDeleting(true)

    // Small timeout to show loading state
    setTimeout(() => {
      try {
        onDelete()
        toast({
          title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} deleted`,
          description: `The ${itemType} has been successfully deleted.`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to delete ${itemType}. Please try again.`,
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
        setShowDeleteDialog(false)
      }
    }, 500)
  }

  return (
    <>
      <motion.div
        className="absolute top-2 right-2 flex gap-2 z-10"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="secondary"
          className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
          onClick={handleEdit}
        >
          <Pencil className="h-3.5 w-3.5 text-gray-700" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          size="icon"
          variant="destructive"
          className="h-7 w-7 rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-500 shadow-sm"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="sr-only">Delete</span>
        </Button>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {itemType}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

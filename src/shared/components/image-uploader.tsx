"use client"

import type React from "react"

import { useState, useRef, type DragEvent } from "react"
import { Upload, LinkIcon, X, Loader2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { cn } from "@/shared/lib/utils"

export interface ImageFile {
  id: string
  url: string
  file?: File
}

interface ImageUploaderProps {
  images: ImageFile[]
  onChange: (images: ImageFile[]) => void
  maxImages?: number
  className?: string
}

export function ImageUploader({ images, onChange, maxImages = 10, className }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [isLoadingUrl, setIsLoadingUrl] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))

    if (files.length > 0) {
      await handleFiles(files)
    }
  }

  const handleFiles = async (files: File[]) => {
    const remainingSlots = maxImages - images.length
    const filesToProcess = files.slice(0, remainingSlots)

    const newImages: ImageFile[] = await Promise.all(
      filesToProcess.map(async (file) => {
        const url = URL.createObjectURL(file)
        return {
          id: `${Date.now()}-${Math.random()}`,
          url,
          file,
        }
      }),
    )

    onChange([...images, ...newImages])
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFiles(Array.from(files))
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddFromUrl = async () => {
    if (!urlInput.trim()) return

    setIsLoadingUrl(true)
    try {
      // Validate URL
      const url = new URL(urlInput)

      // Create a new image entry
      const newImage: ImageFile = {
        id: `${Date.now()}-${Math.random()}`,
        url: urlInput,
      }

      onChange([...images, newImage])
      setUrlInput("")
    } catch (error) {
      console.error("Invalid URL:", error)
      alert("Por favor ingresa una URL válida")
    } finally {
      setIsLoadingUrl(false)
    }
  }

  const handleRemoveImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id)
    if (imageToRemove?.url.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.url)
    }
    onChange(images.filter((img) => img.id !== id))
  }

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseLightbox()
    } else if (e.key === "ArrowLeft") {
      handlePrevImage(e as any)
    } else if (e.key === "ArrowRight") {
      handleNextImage(e as any)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50",
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
              isDragging ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium">
              {isDragging ? "¡Suelta las imágenes aquí!" : "Arrastra imágenes o haz clic para seleccionar"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">PNG, JPG, GIF hasta 10MB (máximo {maxImages} imágenes)</p>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="image-url">O agrega desde una URL</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="image-url"
              type="url"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddFromUrl()
                }
              }}
              className="pl-9"
              disabled={isLoadingUrl || images.length >= maxImages}
            />
          </div>
          <Button
            type="button"
            onClick={handleAddFromUrl}
            disabled={!urlInput.trim() || isLoadingUrl || images.length >= maxImages}
          >
            {isLoadingUrl ? <Loader2 className="h-4 w-4 animate-spin" /> : "Agregar"}
          </Button>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={image.id} className="relative group aspect-square">
              <div
                className="w-full h-full overflow-hidden rounded-lg border border-border cursor-pointer relative"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover transition-all duration-200 group-hover:brightness-75"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/60 rounded-full p-3">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveImage(image.id)
                }}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full text-white opacity-0 transform scale-90 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:scale-100 hover:bg-red-600 shadow-lg z-10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {images.length} de {maxImages} imágenes
        </p>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={handleCloseLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image container */}
          <div className="relative max-w-7xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentImageIndex]?.url || "/placeholder.svg"}
              alt={`Imagen ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

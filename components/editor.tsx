"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"
import { filesize } from "filesize"
import { blobToURL, fromURL } from "image-resize-compress"
import { ArrowDown, ArrowUp, Box, DownloadCloud, Settings } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
} from "@/components/ui/file-uploader"
import { Icons } from "@/components/icons"

export const Editor = () => {
  const [files, setFiles] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const [imageData, setImageData] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState<number | null>(null)

  const [resultData, setResultData] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState<number | null>(null)

  async function getImageSize(url: string) {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      return blob.size
    } catch (error) {
      throw new Error("Error getting image size")
    }
  }

  const handleDataChange = async (file: File[] | null) => {
    if (file) {
      const url = URL.createObjectURL(file[0])

      setImageData(url)
      setImageSize(file[0].size)
      setResultData(null)
    }
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resultData!
    link.download = `optipic-${Date.now()}.webp`
    link.click()
  }

  const optimize = async (ev: FormEvent) => {
    ev.preventDefault()

    if (imageData) {
      setShowDialog(true)

      // quality value for webp and jpeg formats.
      const quality = 80
      // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
      const width = 0
      // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
      const height = 0
      // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
      const format = "webp"

      // note only the blobFile argument is required
      const blob = await fromURL(imageData, quality, width, height, format)
      blobToURL(blob).then(async (url) => {
        setResultSize(await getImageSize(url))
        setResultData(url)

        toast.success(`🚀 Successful operation`)

        sendGAEvent({ event: "optimizeImage", value: "success" })

        setShowDialog(false)
      })
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Input */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <FileUploader
          value={files}
          dropzoneOptions={{
            multiple: false,
            accept: {
              "image/png": [".png"],
              "image/jpg": [".jpg", ".jpeg"],
              "image/webp": [".webp"],
            },
          }}
          onValueChange={handleDataChange}
          className="relative max-w-xs space-y-1 rounded-xl transition-all hover:bg-neutral-200 dark:hover:bg-neutral-900"
        >
          <FileInput>
            <div className="flex w-full flex-col items-center justify-center pb-4 pt-3 ">
              <Icons.SolarCloudUploadBoldDuotone className="size-8"></Icons.SolarCloudUploadBoldDuotone>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
                &nbsp; or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or WEBP file
              </p>
            </div>
          </FileInput>
          <FileUploaderContent></FileUploaderContent>
        </FileUploader>
      </div>

      {/* Images */}
      <div className="flex size-full items-center justify-center gap-16 p-4">
        <>
          {imageData ? (
            <div>
              <Image
                width={300}
                height={150}
                className="flex max-h-80 max-w-80  rounded-xl"
                src={imageData}
                alt="Selected image"
              />

              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <Box size={18}></Box>
                <p>{filesize(imageSize!)}</p>
              </div>
            </div>
          ) : (
            <div className="flex h-80 w-[36rem] max-w-80 items-center justify-center rounded-xl bg-neutral-200  dark:bg-neutral-900">
              <Icons.SolarGalleryBoldDuotone className="size-16 text-neutral-500"></Icons.SolarGalleryBoldDuotone>
            </div>
          )}
        </>

        <>
          {resultData ? (
            <div>
              <Image
                width={300}
                height={150}
                className="flex max-h-80 max-w-80  rounded-xl"
                src={resultData}
                alt="Selected image"
              />

              <div className="mt-4 flex items-center justify-center gap-1 text-sm">
                {resultSize! < imageSize! ? (
                  <ArrowDown className="text-green-400"></ArrowDown>
                ) : (
                  <ArrowUp className="text-red-400"></ArrowUp>
                )}
                <p
                  className={`${
                    resultSize! < imageSize! ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {filesize(resultSize!)}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex size-full max-w-80 items-center justify-center rounded-xl bg-neutral-200 dark:bg-neutral-900">
              <div className="grid-pattern flex size-full items-center justify-center">
                <Icons.SolarGalleryBoldDuotone className="size-16 text-neutral-500"></Icons.SolarGalleryBoldDuotone>
              </div>
            </div>
          )}
        </>
      </div>

      {/* Tools */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={"ringHover"}
          className="font-bold"
          onClick={optimize}
          disabled={!imageData}
        >
          <Box className="mr-2 size-5"></Box>
          Process
        </Button>

        <Button
          variant={"linkHover2"}
          disabled={!resultData}
          className="font-bold"
          onClick={handleDownload}
        >
          <DownloadCloud className="mr-2 size-5"></DownloadCloud>
          Download
        </Button>
      </div>

      <Dialog>
        <DialogTrigger className="flex gap-2">
          <Settings></Settings> <p>Settings</p>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Processing</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-2">
              <p>Reducing size...</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

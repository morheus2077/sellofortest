'use client'
import { Button } from "./ui/button";
import { File } from "lucide-react"

export function ExportPdfButton(){
    return(
      <div className="flex items-center gap-2 ml-auto">
        <Button 
        className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 cursor-pointer" 
        variant="outline" 
        size="sm">
          Exportar em PDF 
          <File/>
        </Button>
      </div>
    )
}
'use client'

import { Download, FileText, Table } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'

export function ExportMenu() {
  const handleExport = (format: 'pdf' | 'csv') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${format}`)
  }

  return (
    <Dropdown
      trigger={
        <Button variant="ghost" size="sm" aria-label="Export">
          <Download className="h-4 w-4" />
        </Button>
      }
    >
      <DropdownItem onClick={() => handleExport('pdf')} icon={<FileText className="h-4 w-4" />}>
        Export as PDF
      </DropdownItem>
      <DropdownItem onClick={() => handleExport('csv')} icon={<Table className="h-4 w-4" />}>
        Export as CSV
      </DropdownItem>
    </Dropdown>
  )
}

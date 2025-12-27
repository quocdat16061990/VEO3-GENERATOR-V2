import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Upload, MoreVertical, Grid3x3, List, ArrowUpDown } from "lucide-react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function AssetsPage() {
  const [viewMode, setViewMode] = useState("grid")

  return (
    <div className="p-10">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">8c0c43c6-8a69-4a5d-b843-836e3eb372c3's space</h2>
          <div className="text-sm text-muted-foreground mt-1">
            0B / 500GB
          </div>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="creations" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="creations">Creations</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="trash">Trash</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Modified</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Modified</DropdownMenuItem>
                <DropdownMenuItem>Name</DropdownMenuItem>
                <DropdownMenuItem>Size</DropdownMenuItem>
                <DropdownMenuItem>Type</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* View Mode Toggle */}
            <div className="flex border border-border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <TabsContent value="creations" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-4 gap-4">
              {/* Sample Asset Card */}
              <div className="group relative aspect-video rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <div className="absolute top-2 right-2">
                  <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">00:17</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                  <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="text-white text-sm font-medium truncate">
                    Agent_video_Pippit_20251226082942.mp4
                  </div>
                  <div className="text-white/70 text-xs mt-1">
                    Exported 1 day ago
                  </div>
                </div>
              </div>

              {/* Empty state */}
              <div className="col-span-4 flex flex-col items-center justify-center py-20 text-center">
                <div className="text-muted-foreground mb-2">No creations yet</div>
                <Button variant="outline" className="mt-4">
                  Create your first video
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {/* List view item */}
              <div className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="w-32 h-20 rounded bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">00:17</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Agent_video_Pippit_20251226082942.mp4</div>
                  <div className="text-sm text-muted-foreground">Exported 1 day ago</div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts">
          <div className="text-center py-20 text-muted-foreground">No drafts</div>
        </TabsContent>

        <TabsContent value="uploads">
          <div className="text-center py-20 text-muted-foreground">No uploads</div>
        </TabsContent>

        <TabsContent value="products">
          <div className="text-center py-20 text-muted-foreground">No products</div>
        </TabsContent>

        <TabsContent value="trash">
          <div className="text-center py-20 text-muted-foreground">Trash is empty</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


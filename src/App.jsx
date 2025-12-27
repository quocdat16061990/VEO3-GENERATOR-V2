import { useState } from "react"
import { MainLayout } from "@/components/layout/MainLayout"
import { AssetsPage } from "@/pages/AssetsPage"
import { VideoGeneratorPage } from "@/pages/VideoGeneratorPage"

function App() {
  const [currentPage, setCurrentPage] = useState("AiVideoGeneratorV2")

  const renderPage = () => {
    switch (currentPage) {
      case "AiVideoGeneratorV2":
        return <VideoGeneratorPage />
      case "AssetManagementMaterial":
        return <AssetsPage />
      default:
        return <VideoGeneratorPage />
    }
  }

  return (
    <MainLayout selectedMenuId={currentPage} onMenuChange={setCurrentPage}>
      {renderPage()}
    </MainLayout>
  )
}

export default App


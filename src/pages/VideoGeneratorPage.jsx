import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Globe, Search, Upload, ArrowRight, HelpCircle } from "lucide-react"
import { generateVideo } from "@/services/videoService"
import { API_CONFIG } from "@/constants"

const popularTools = [
  {
    id: "avatar-video",
    title: "Avatar video",
    image: "https://p16-text2video-demo-sg.ibyteimg.com/tos-alisg-i-99da5bns7f-sg/commerce-11-1/Ai_Avatars.png",
    href: "/editor?tab_name=video_generator&sub_tab=video&action=addDigitalHuman&__tool_type=ai_character&__tool_position=magic_tools&edit_type=ai_character&scenario=custom&scale=9:16&page_from=smart_ad_url_analyze&enter_from=ai_character"
  },
  {
    id: "ai-talking-photo",
    title: "AI talking photo",
    image: "https://p16-capcut-sg.capcut.com/tos-alisg-i-hk1xnajzr6-sg/ai_talking_photo_video.png~tplv-hk1xnajzr6-webp.webp",
    href: "/ai-talking-photo?tab_name=video_generator&enter_from=ai_talking_photo&entrance_from=video_generator"
  },
  {
    id: "product-showcase",
    title: "Product showcase",
    image: "https://p16-capcut-sg.capcut.com/tos-alisg-i-hk1xnajzr6-sg/20250729-141746.png~tplv-hk1xnajzr6-webp.webp",
    href: "/editor?tab_name=video_generator&sub_tab=video&action=addDigitalHuman&__tool_type=ai_character&__tool_position=magic_tools&edit_type=ai_character&scenario=custom&scale=9:16&page_from=smart_ad_url_analyze&enter_from=ai_character"
  },
  {
    id: "remove-background",
    title: "Remove background",
    image: "https://p16-text2video-demo-sg.ibyteimg.com/tos-alisg-i-99da5bns7f-sg/commerce-11-1/Remove_Background.png",
    href: "/editor?activeSmartTool=1002&tab_name=video_generator&sub_tab=video&edit_type=remove_background&page_from=smart_ad_url_analyze&enter_from=remove_background"
  },
  {
    id: "quick-cut",
    title: "Quick cut",
    image: "https://p16-text2video-demo-sg.ibyteimg.com/tos-alisg-i-99da5bns7f-sg/commerce-11-1/Quick_Cut.png",
    href: "/editor?activeSmartTool=20003&tab_name=video_generator&sub_tab=video&edit_type=quick_cut&page_from=smart_ad_url_analyze&enter_from=quick_cut"
  },
  {
    id: "video-editor",
    title: "Video editor",
    image: "https://p16-text2video-demo-sg.ibyteimg.com/tos-alisg-i-99da5bns7f-sg/commerce-11-1/Video_editor.png",
    href: "/editor?tab_name=video_generator&sub_tab=video&edit_type=edit&page_from=smart_ad_url_analyze&enter_from=edit"
  }
]

const suggestedTopics = [
  "History",
  "TikTok marketing video",
  "Wool-felt winter village",
  "News link to video"
]

export function VideoGeneratorPage() {
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generateMessage, setGenerateMessage] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [error, setError] = useState("")

  // Simulate progress while API is processing
  useEffect(() => {
    if (!isGenerating) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Tăng progress với tốc độ chậm dần, dừng ở 95% để chờ API response
        if (prev >= 95) return 95
        const increment = prev < 50 ? 2 : prev < 80 ? 1.5 : 0.5
        return Math.min(prev + increment, 95)
      })
    }, 200) // Update every 200ms

    return () => clearInterval(interval)
  }, [isGenerating])

  const handleGenerate = async () => {
    if (!inputValue.trim() || isGenerating) return

    // Reset states
    setError("")
    setVideoUrl("")
    setProgress(0)
    
    // Tạo message từ input
    const message = `Alright, I'll generate a video about ${inputValue.trim()} for you now.`
    setGenerateMessage(message)
    setIsGenerating(true)

    try {
      // Gọi API để generate video
      const result = await generateVideo(inputValue.trim(), API_CONFIG.DEFAULT_SETTINGS)
      
      // Set progress to 100% và hiển thị video
      setProgress(100)
      setVideoUrl(result)
      
      // Reset sau 2 giây
      setTimeout(() => {
        setIsGenerating(false)
        setProgress(0)
        setGenerateMessage("")
      }, 2000)
    } catch (err) {
      console.error("Error generating video:", err)
      setError(err.message || "Có lỗi xảy ra khi tạo video. Vui lòng thử lại.")
      setIsGenerating(false)
      setProgress(0)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleGenerate()
    }
  }

  // #region agent log
  useEffect(() => {
    const measureSizes = () => {
      const titleEl = document.querySelector('h1')
      const containerEl = document.querySelector('.flex.flex-col.mx-auto')
      const inputWrapperEl = document.querySelector('.relative.bg-white.rounded-3xl')
      const inputEl = document.querySelector('textarea')
      const cardEl = document.querySelector('.group.relative.p-5')
      
      const measurements = {
        titleFontSize: titleEl ? window.getComputedStyle(titleEl).fontSize : null,
        titleHeight: titleEl ? titleEl.offsetHeight : null,
        containerPadding: containerEl ? {
          top: window.getComputedStyle(containerEl).paddingTop,
          bottom: window.getComputedStyle(containerEl).paddingBottom,
        } : null,
        inputWrapperWidth: inputWrapperEl ? inputWrapperEl.offsetWidth : null,
        inputWrapperMaxWidth: inputWrapperEl ? window.getComputedStyle(inputWrapperEl).maxWidth : null,
        inputMinHeight: inputEl ? window.getComputedStyle(inputEl).minHeight : null,
        inputFontSize: inputEl ? window.getComputedStyle(inputEl).fontSize : null,
        cardPadding: cardEl ? window.getComputedStyle(cardEl).padding : null,
        spaceY: containerEl ? {
          gap: window.getComputedStyle(containerEl).gap,
        } : null,
      }
      
      fetch('http://127.0.0.1:7244/ingest/f2c7b3d4-ae51-4d6c-84c0-861ab6640502', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: 'VideoGeneratorPage.jsx:52',
          message: 'Size measurements - input field width and font',
          data: measurements,
          timestamp: Date.now(),
          sessionId: 'debug-session',
          runId: 'run2',
          hypothesisId: 'B'
        })
      }).catch(() => {})
    }
    
    // Measure after render
    setTimeout(measureSizes, 100)
  }, [])
  // #endregion

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background">
      {/* Main Content Area */}
      <div className="flex items-start justify-center p-4 sm:p-6 md:p-8 relative w-full">
        <div className="flex flex-col mx-auto max-w-full w-full sm:w-[1040px] px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-black font-display leading-[130%]">
              Turn anything into videos
            </h1>
          </div>

          {/* Input Field */}
          <div className="relative flex justify-center w-full">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px,rgba(0,0,0,0.05)_0px_10px_15px_-5px,rgba(0,0,0,0.05)_0px_4px_6px_-2px] hover:shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px,rgba(0,0,0,0.08)_0px_10px_15px_-5px,rgba(0,0,0,0.08)_0px_4px_6px_-2px] transition-all duration-200 w-full max-w-full sm:max-w-[760px]">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me what you want. Add links, media, or docs to generate more precise results."
                className="w-full min-h-[100px] resize-none outline-none text-sm placeholder:text-muted-foreground/70 bg-transparent leading-relaxed"
                disabled={isGenerating}
              />
              
              {/* Input Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/50">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent rounded-lg"
                    title="Add"
                    disabled={isGenerating}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent rounded-lg"
                    title="Language"
                    disabled={isGenerating}
                  >
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent rounded-lg"
                    title="Search"
                    disabled={isGenerating}
                  >
                    <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <div className="h-6 sm:h-7 w-px bg-border mx-1 sm:mx-2 hidden sm:block" />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm font-medium hover:bg-accent rounded-lg"
                    disabled={isGenerating}
                  >
                    9:16
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm font-medium hover:bg-accent rounded-lg"
                    disabled={isGenerating}
                  >
                    EN
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleGenerate}
                    disabled={!inputValue.trim() || isGenerating}
                    className="h-8 sm:h-9 px-3 sm:px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-initial"
                  >
                    {isGenerating ? "Generating..." : "Generate"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-accent rounded-lg"
                    title="Upload"
                    disabled={isGenerating}
                  >
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex flex-col items-center gap-4 w-full max-w-[760px] mx-auto">
              <div className="w-full p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State / Video Result */}
          {(isGenerating || videoUrl) && (
            <div className="flex flex-col items-center gap-3 sm:gap-4 w-full mx-auto">
              {/* Message */}
              {generateMessage && (
                <p className="text-xs sm:text-sm text-foreground text-center px-2">
                  {generateMessage}
                </p>
              )}
              
              {/* Video Preview Box */}
              <div className="relative w-full max-w-[600px] bg-black rounded-lg sm:rounded-xl overflow-hidden mx-auto">
                {/* Progress Badge */}
                {isGenerating && (
                  <div className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-xs font-medium px-2.5 py-1 rounded-md z-10">
                    {Math.round(progress)}%...
                  </div>
                )}
                
                {/* Video or Placeholder */}
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full h-auto object-contain"
                    autoPlay
                    loop
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-[#e8d5ff]">
                    <div className="text-[#8b5cf6] text-sm opacity-50">
                      {isGenerating ? "Generating video..." : "Video preview will appear here"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggested Topics */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center px-2">
            {/* History entry with separator */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border bg-background hover:border-primary hover:bg-accent/50 transition-all duration-200 text-[11px] sm:text-[12px] text-[rgba(0,0,0,0.4)] cursor-pointer leading-[18px] whitespace-nowrap shadow-sm hover:shadow-md">
                History
              </button>
              <div className="h-4 w-px bg-border hidden sm:block"></div>
            </div>
            
            {/* Other suggested topics */}
            {suggestedTopics.slice(1).map((topic, index) => (
              <button
                key={index}
                className="group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-border bg-background hover:border-primary hover:bg-accent/50 transition-all duration-200 text-[11px] sm:text-[12px] text-[rgba(0,0,0,0.4)] cursor-pointer leading-[18px] whitespace-nowrap shadow-sm hover:shadow-md"
              >
                <span className="text-inherit">{topic}</span>
                <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
              </button>
            ))}
          </div>

          {/* Popular Tools */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground px-2 sm:px-0">Popular tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
              {popularTools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.href}
                  className="group relative flex items-center flex-1 h-[60px] sm:h-[70px] p-2 rounded-[12px] bg-[#f5f5f5] hover:bg-[#e8e8e8] transition-all duration-200 overflow-hidden"
                >
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-auto object-contain flex-shrink-0"
                    crossOrigin="anonymous"
                  />
                  <div className="ml-2 flex-1 min-w-0">
                    <div className="font-semibold text-xs sm:text-sm text-foreground truncate">
                      {tool.title}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Help Icon - Fixed Right */}
        <div className="hidden md:block absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10">
          <Button
            size="icon"
            className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/20 transition-all duration-200 hover:scale-105"
            title="Help"
          >
            <HelpCircle className="h-8 w-8 lg:h-10 lg:w-10 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}


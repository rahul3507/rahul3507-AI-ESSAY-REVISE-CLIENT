import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { Share2, Settings, Folder, MessageSquare, PieChart, LinkIcon, BarChart2, ZoomIn, Search, Send, FileText } from 'lucide-react'
import useLoggedUser from "../../../components/hook/useLoggedUser"

const QuickActionsCard = () => {
  const { user } = useLoggedUser([])
  const navigate = useNavigate()

  const handleUploadClick = () => {
    console.log("User:", user)
    console.log("User is_active:", user?.is_active)

    if (!user?.is_active) {
      toast.error("You currently do not have an active subscription plan.", {
        duration: 2000,
        position: 'top-right',
      })
      return
    }

    navigate("/upload_one")
  }

  return (
    <>
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500 pb-3">Common tasks and actions to get started</p>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUploadClick}
          className="w-full flex items-center justify-center gap-2 bg-[#1E2839] cursor-pointer text-white font-medium py-2.5 rounded-md mb-6 transition hover:bg-[#2a3441]"
        >
          <Share2 className="text-white w-4 h-4" />
          Upload New Essay
        </button>

        {/* Feature Grid */}
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Features We Provide</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <FileText className="text-gray-500 w-5 h-5" />
            Document Upload (.docx)
          </div>
          <div className="flex items-start gap-2">
            <LinkIcon className="text-gray-500 w-5 h-5" />
            Source Authenticity Validation
          </div>
          <div className="flex items-start gap-2">
            <Send className="text-gray-500 w-5 h-5" />
            Essay Type Classification
          </div>
          <div className="flex items-start gap-2">
            <Folder className="text-gray-500 w-5 h-5" />
            Draft Comparison (Optional)
          </div>
          <div className="flex items-start gap-2">
            <Search className="text-gray-500 w-5 h-5" />
            Tracked Revisions with Metadata
          </div>
          <div className="flex items-start gap-2">
            <Settings className="text-gray-500 w-5 h-5" />
            Admin Custom Guidelines
          </div>
          <div className="flex items-start gap-2">
            <ZoomIn className="text-gray-500 w-5 h-5" />
            Multi-Pass Grammar & Style Checks
          </div>
          <div className="flex items-start gap-2">
            <MessageSquare className="text-gray-500 w-5 h-5" />
            Inline Comments & Feedback
          </div>
          <div className="flex items-start gap-2">
            <BarChart2 className="text-gray-500 w-5 h-5" />
            Essay-Specific Criteria
          </div>
          <div className="flex items-start gap-2">
            <PieChart className="text-gray-500 w-5 h-5" />
            Analytics Dashboard (Upcoming)
          </div>
        </div>
      </div>
      
      {/* Toast container - this is crucial for toasts to display */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default QuickActionsCard
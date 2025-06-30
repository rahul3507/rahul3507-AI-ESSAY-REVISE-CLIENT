
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  FileText,
  LinkIcon,
  Send,
  Folder,
  Search,
  Settings,
  ZoomIn,
  MessageSquare,
  BarChart2,
  PieChart,
  ExternalLink,
} from "lucide-react"
import useLoggedUser from "../../../components/hook/useLoggedUser"


const ComparisonFile = () => {
  const { user } = useLoggedUser()
  const navigate = useNavigate()

  const handleCompareClick = () => {
    console.log("User:", user)
    console.log("User is_active:", user?.is_active)

    if (!user?.is_active) {
      console.log("Firing toast for comparison...")
      toast.error("You need an active subscription to access comparison tools.")
      return
    }

    // If user is active, navigate to comparison page
    toast.success("Redirecting to comparison tool...")
    navigate("/upload_comparison")
  }

  return (
    <div className="max-w-xl mx-auto rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="border-b border-gray-400 mb-4">
        <h2 className="text-xl font-bold text-gray-800">File Comparison Tools</h2>
        <p className="text-sm text-gray-600 pb-3">Powerful tools to compare & evaluate essays.</p>
      </div>

      <button
        onClick={handleCompareClick}
        className="w-full flex items-center justify-center gap-2 bg-[#394553] text-white font-medium py-2.5 rounded-md mb-6 transition hover:bg-[#4a5563]"
      >
        <ExternalLink className="text-white w-4 h-4" />
        Compare New Essay
      </button>

      <h3 className="text-sm font-semibold text-gray-800 mb-3">Premium Features</h3>

      <div className="space-y-5 text-sm text-gray-800">
        <div className="flex items-center gap-2">
          <FileText className="text-gray-500 w-5 h-5" />
          Document Upload (.docx)
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className="text-gray-500 w-5 h-5" />
          Source Authenticity Validation
        </div>
        <div className="flex items-center gap-2">
          <Send className="text-gray-500 w-5 h-5" />
          Essay Type Classification
        </div>
        <div className="flex items-center gap-2">
          <Folder className="text-gray-500 w-5 h-5" />
          Draft Comparison
        </div>
        <div className="flex items-center gap-2">
          <Search className="text-gray-500 w-5 h-5" />
          Revision Metadata Tracking
        </div>
        <div className="flex items-center gap-2">
          <ZoomIn className="text-gray-500 w-5 h-5" />
          Multi-Pass Grammar Checks
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="text-gray-500 w-5 h-5" />
          Inline Feedback
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="text-gray-500 w-5 h-5" />
          Essay-Specific Criteria
        </div>
        <div className="flex items-center gap-2">
          <PieChart className="text-gray-500 w-5 h-5" />
          Analytics Dashboard
        </div>
        <div className="flex items-center gap-2">
          <Settings className="text-gray-500 w-5 h-5" />
          Admin Guidelines Setup
        </div>
      </div>
    </div>
  )
}

export default ComparisonFile

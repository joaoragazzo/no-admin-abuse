interface CustomToastProps {
    message: {
        title: string,
        description: string
    },
    type: "success" | "error" | "info"
    icon: React.ReactNode
}

export const CustomToast: React.FC<CustomToastProps> = ({ message, type, icon }) => (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        type === 'success' ? 'bg-green-100 text-green-600' : 
        type === 'error' ? 'bg-red-100 text-red-600' : 
        'bg-blue-100 text-blue-600'
      }`}>
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900">{message.title}</p>
        <p className="text-sm text-gray-600">{message.description}</p>
      </div>
    </div>
);
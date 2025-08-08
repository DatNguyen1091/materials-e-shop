export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trang không tồn tại</h2>
        <p className="text-gray-600 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <a 
          href="/" 
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  )
}

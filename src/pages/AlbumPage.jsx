import { useState, useRef } from 'react'

export default function AlbumPage() {
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem('album-photos')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const fileInputRef = useRef(null)

  const handleUpload = (e) => {
    const files = e.target.files
    const newPhotos = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString().split('T')[0],
      description: '',
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
    }))

    setPhotos(prev => [...newPhotos, ...prev])
    localStorage.setItem('album-photos', JSON.stringify([...newPhotos, ...photos]))
  }

  const handleDelete = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id))
    localStorage.setItem('album-photos', JSON.stringify(photos.filter(photo => photo.id !== id)))
  }

  const handleDescriptionChange = (id, description) => {
    setPhotos(prev => prev.map(photo =>
      photo.id === id ? { ...photo, description } : photo
    ))
    localStorage.setItem('album-photos', JSON.stringify(photos.map(photo =>
      photo.id === id ? { ...photo, description } : photo
    )))
  }

  const openFileSelector = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="album-page">
      <h1>📸 相册</h1>
      <p>记录生活中的美好回忆</p>

      {/* 上传区域 */}
      <div className="upload-section">
        <button
          className="upload-btn"
          onClick={openFileSelector}
        >
          📤 上传图片
        </button>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <p>支持 JPG、PNG、GIF 格式，可同时上传多张</p>
      </div>

      {/* 照片网格 */}
      {photos.length > 0 ? (
        <div className="photos-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <div className="photo-wrapper">
                <img
                  src={photo.url}
                  alt={photo.name}
                  onClick={() => setSelectedPhoto(photo)}
                />
              </div>
              <div className="photo-info">
                <h4>{photo.name}</h4>
                <p className="photo-date">{photo.uploadDate} | {photo.size}</p>
                <textarea
                  className="photo-description"
                  placeholder="添加描述..."
                  value={photo.description}
                  onChange={e => handleDescriptionChange(photo.id, e.target.value)}
                />
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(photo.id)}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-album">
          <p>相册还是空的</p>
          <p>上传一些照片来开始记录吧！</p>
        </div>
      )}

      {/* 照片预览模态框 */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedPhoto(null)}>×</button>
            <img src={selectedPhoto.url} alt={selectedPhoto.name} />
            <div className="modal-info">
              <h3>{selectedPhoto.name}</h3>
              <p>上传日期: {selectedPhoto.uploadDate}</p>
              <p>文件大小: {selectedPhoto.size}</p>
              <textarea
                className="photo-description"
                placeholder="添加描述..."
                value={selectedPhoto.description}
                onChange={e => handleDescriptionChange(selectedPhoto.id, e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
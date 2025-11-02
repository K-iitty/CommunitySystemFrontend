/**
 * 通用文件上传工具函数
 */

/**
 * 创建FormData对象用于文件上传
 * @param {File} file - 要上传的文件
 * @returns {FormData} 包含文件的FormData对象
 */
export function createFileFormData(file) {
  const formData = new FormData()
  formData.append('file', file)
  return formData
}

/**
 * 创建FormData对象用于多文件上传
 * @param {FileList|Array} files - 要上传的文件列表
 * @returns {FormData} 包含文件的FormData对象
 */
export function createFilesFormData(files) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i])
  }
  return formData
}

/**
 * 将 ISO 8601 格式时间（带T）转换为显示格式（无T）
 * 例如：2025-01-10T09:00:00 → 2025-01-10 09:00:00
 * @param {string} isoDateTime - ISO 8601 格式的时间字符串
 * @returns {string} 转换后的时间字符串（yyyy-MM-dd HH:mm:ss）
 */
export function formatDateTimeForDisplay(isoDateTime) {
  if (!isoDateTime) return ''
  
  // 如果字符串中包含 T，将其替换为空格
  if (typeof isoDateTime === 'string' && isoDateTime.includes('T')) {
    // 去掉毫秒部分（.后面的内容）
    return isoDateTime.split('.')[0].replace('T', ' ')
  }
  
  return isoDateTime
}

/**
 * 时间字段不需要额外转换，保持显示格式提交给后端
 * 后端期望的格式就是 yyyy-MM-dd HH:mm:ss（中间是空格）
 * @param {string} displayDateTime - 显示格式的时间字符串（yyyy-MM-dd HH:mm:ss）
 * @returns {string} 提交给后端的时间字符串
 */
export function formatDateTimeForSubmit(displayDateTime) {
  if (!displayDateTime) return ''
  
  // 直接返回，不需要做任何转换
  // 因为表单输入的格式已经是后端需要的格式：yyyy-MM-dd HH:mm:ss
  return displayDateTime
}
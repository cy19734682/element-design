/* eslint-disable */
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

/**
 * 压缩并导出text文件
 * @param th
 * @param jsonData
 * @param fileName
 */
export function exportTxtToZip(th, jsonData, fileName) {
	const zip = new JSZip()
	const zip_name = fileName || 'file'
	const data = jsonData
	let txtData = `${th}\r\n`
	data.forEach((row) => {
		let tempStr = ''
		tempStr = row.toString()
		txtData += `${tempStr}\r\n`
	})
	zip.file(`data.txt`, txtData)
	zip
		.generateAsync({
			type: 'blob'
		})
		.then(
			(blob) => {
				saveAs(blob, `${zip_name}.zip`)
			},
			(err) => {
				alert('导出失败')
			}
		)
}

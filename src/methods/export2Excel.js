/* eslint-disable */
import {saveAs} from 'file-saver'
import XLSX from 'xlsx'

/**
 * 通过表格dom导出Excel
 * @param id 表格ID
 * @param b 开始列数
 * @param e 结束列数
 * @param filename 导出名称
 * @param bookType 导出文件格式
 */
export function exportTableToExcel(id, b, e, filename = 'excel-list', bookType = 'xlsx') {
  const theTable = document.getElementById(id)
  const data = generateArray(theTable, b, e)
  const ws_name = "SheetJS"
  const wb = new Workbook(), ws = sheet_from_array_of_arrays(data)
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`)
}

/**
 * 通过JSON数据导出Excel
 * @param multiHeader
 * @param header
 * @param data
 * @param filename
 * @param merges
 * @param autoWidth
 * @param bookType
 */
export function exportJsonToExcel({
  multiHeader = [],
  header,
  data,
  filename = 'excel-list',
  merges = [],
  autoWidth = true,
  bookType = 'xlsx'
} = {}) {
  /* original data */
  data = [...data]
  data.unshift(header)
  for (let i = multiHeader.length - 1; i > -1; i--) {
    data.unshift(multiHeader[i])
  }
  const ws_name = "SheetJS"
  const wb = new Workbook(), ws = sheet_from_array_of_arrays(data)
  if (merges.length > 0) {
    if (!ws['!merges']) {
      ws['!merges'] = []
    }
    merges.forEach(item => {
      ws['!merges'].push(XLSX.utils.decode_range(item))
    })
  }
  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = data.map(row => row.map(val => {
      /*先判断是否为null/undefined*/
      if (val == null) {
        return {
          'wch': 10
        }
      }
      /*再判断是否为中文*/ else if (val.toString().charCodeAt(0) > 255) {
        return {
          'wch': val.toString().length * 2
        }
      }
      else {
        return {
          'wch': val.toString().length
        }
      }
    }))
    /*以第一行为初始值*/
    let result = colWidth[0]
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]['wch'] < colWidth[i][j]['wch']) {
          result[j]['wch'] = colWidth[i][j]['wch']
        }
      }
    }
    ws['!cols'] = result
  }
  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name)
  wb.Sheets[ws_name] = ws
  const wbout = XLSX.write(wb, {
    bookType: bookType,
    bookSST: false,
    type: 'binary'
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), `${filename}.${bookType}`)
}


function generateArray(table, b = 0, e) {
  const out = []
  const rows = table.querySelectorAll('tr')
  for (let R = 0; R < rows.length; ++R) {
    const outRow = []
    const row = rows[R]
    let columns = row.querySelectorAll('td')
    if (!(columns && columns.length > 0)) {
      columns = row.querySelectorAll('th')
    }
    let length = e && (e + 1) || columns.length
    for (let C = b; C < length; ++C) {
      const cell = columns[C]
      let cellValue = cell.innerText
      if (cellValue !== "" && cellValue == +cellValue) {
        cellValue = +cellValue
      }
      outRow.push(cellValue !== "" ? cellValue : null)
    }
    out.push(outRow)
  }
  return out
}

function datenum(v, date1904) {
  if (date1904) {
    v += 1462
  }
  const epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, opts) {
  const ws = {}
  const range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  }
  for (let R = 0; R != data.length; ++R) {
    for (let C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) {
        range.s.r = R
      }
      if (range.s.c > C) {
        range.s.c = C
      }
      if (range.e.r < R) {
        range.e.r = R
      }
      if (range.e.c < C) {
        range.e.c = C
      }
      const cell = {
        v: data[R][C]
      }
      if (cell.v == null) {
        continue
      }
      const cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })
      
      if (typeof cell.v === 'number') {
        cell.t = 'n'
      }
      else if (typeof cell.v === 'boolean') {
        cell.t = 'b'
      }
      else if (cell.v instanceof Date) {
        cell.t = 'n'
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      }
      else {
        cell.t = 's'
      }
      
      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) {
    ws['!ref'] = XLSX.utils.encode_range(range)
  }
  return ws
}

function Workbook() {
  if (!(this instanceof Workbook)) {
    return new Workbook()
  }
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

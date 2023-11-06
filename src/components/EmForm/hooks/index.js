import {isValidVal, myTypeof} from '../../../methods'
import request from '../../../methods/request'
import moment from "moment"
import _ from "lodash"

/**
 * 初始化表单项tempKeys值
 * @param f formData数据
 * @param t tempKeys数据
 * @param d dataGroup数据
 * @param w watchGroup数据
 * @param $this this对象
 */
export function initFormItems(f, t, d, w, $this) {
  for (let root of f) {
    switch (root.type) {
      case 'selectInput':
        const tempKeyF = 'selectInput' + Math.floor(Math.random() * 100000000)
        root.tempKey = tempKeyF
        $this.$set(t, tempKeyF, {
          key: root.defaultKey || null,
          val: root.defaultVal || null
        })
        w.push($this.$watch(() => t[tempKeyF], after => {
          tempKeysWatchHandle(d, after, root)
        }, {immediate: true}))
        break
      case 'bdMap':
        const tempKeyE = 'inputMap' + Math.floor(Math.random() * 100000000)
        if (root.key) {
          root.tempKey = tempKeyE
          $this.$set(t, tempKeyE, root.defaultVal !== undefined && root.defaultVal2 !== undefined ? {
            lng: root.defaultVal,
            lat: root.defaultVal2,
            name: root.defaultVal3 || ''
          } : {
            lng: null,
            lat: null,
            name: null
          })
          w.push($this.$watch(() => t[tempKeyE], after => {
            tempKeysWatchHandle(d, after, root)
          }, {immediate: true}))
        }
        break
      case 'input':
      case 'inputNumber':
      case 'switch':
      case 'slider':
      case 'rate':
      case 'textarea':
        const tempKeyD = 'inputT' + Math.floor(Math.random() * 100000000)
        if (root.key) {
          root.tempKey = tempKeyD
          if (root.type === 'inputNumber' || root.type === 'slider' || root.type === 'rate') {
            $this.$set(t, tempKeyD, root.defaultVal !== undefined ? root.defaultVal : undefined)
          }else if(root.type === 'switch'){
            $this.$set(t, tempKeyD, root.defaultVal !== undefined ? root.defaultVal : false)
          } else {
            $this.$set(t, tempKeyD, root.defaultVal !== undefined ? root.defaultVal : null)
          }
          w.push($this.$watch(() => t[tempKeyD], after => {
            tempKeysWatchHandle(d, after, root)
          }, {immediate: true}))
        }
        break
      case 'select':
      case 'radio':
      case 'checkbox':
        if (!root.options) {
          root.options = []
        }
        if (root.asyncOption) {// 远程查询数据
          if (root.changeOption) {// 需要根据其它选项的值作为条件来查询
            const watchChange = () => {
              let cp = root.changeOption
              let condition = null
              let urlT = root.optionUrl.indexOf('?') !== -1 ? root.optionUrl : root.optionUrl + '?'
              if (myTypeof(cp) === 'Object' && cp.valKey && cp.key) {
                condition = () => d[cp.valKey]
                urlT = urlT + '&' + cp.key + '='
              }
              else if (Array.isArray(cp) && cp.some(e => e.valKey && e.key)) {
                condition = () => {
                  let tUrl = ''
                  for (let cc of cp) {
                    let vT = d[cc.valKey]
                    if (isValidVal(vT)) {
                      /*如果条件有有效值，则拉取待选项*/
                      tUrl += ('&' + cc.key + '=' + vT)
                    }
                    else if (!cc.notRequired) {
                      /*条件为必填（notRequired!==true,默认必填），且没有有效值，则不拉取待选项*/
                      break
                    }
                  }
                  return tUrl
                }
              }
              if (condition) {
                w.push($this.$watch(condition, after => {
                  let tV = _.cloneDeep(t[root.tempKey])
                  if (root.tempKey) {//当触发changeOption时，将选项清空
                    t[root.tempKey] = null
                  }
                  if (isValidVal(after)) {
                    initOption((urlT + after).replace(/\?&/, '?'), root, tV, t)
                  }
                  else {
                    root.options = []
                    if (root.localOption && root.optionLabel && root.optionVal) {
                      root.options = optionAssign(root.localOption, root)
                    }
                    if (isValidVal(tV)) {
                      recoverVal(tV, root, t)
                    }
                  }
                }, {immediate: true}))
              }
            }
            if (root.optionUrl) {
              watchChange()
            }
            else {
              root.options = []
              if (root.localOption && root.optionLabel && root.optionVal) {
                root.options = optionAssign(root.localOption, root)
              }
            }
          }
          else {
            initOption(root.optionUrl, root)
          }
        }
        else if (myTypeof(root.borrowOption) === 'String') {/*借用待选项（只能使用静态数据）*/
          root.options = f.find(e => e.key === root.borrowOption).options
        }
        const tempKeyC = 'opEle' + Math.floor(Math.random() * 100000000)
        if (root.key) {
          root.tempKey = tempKeyC
          if (root.type === 'select' && root.multiple || root.type === 'checkbox') {
            $this.$set(t, tempKeyC, root.defaultVal !== undefined ? root.defaultVal : [])
          }
          else if (root.booleanVal) {
            $this.$set(t, tempKeyC, root.defaultVal !== undefined ? (Boolean(root.defaultVal) ? 1 : 0) : null)
          }
          else {
            $this.$set(t, tempKeyC, root.defaultVal !== undefined ? root.defaultVal : null)
          }
          w.push($this.$watch(() => t[tempKeyC], after => {
            tempKeysWatchHandle(d, after, root, f, t, $this)
          }, {
            immediate: true
          }))
        }
        break
      case 'date':
      case 'time':
        const tempKeyB = 'date' + Math.floor(Math.random() * 100000000)
        if (root.key) {
          root.tempKey = tempKeyB
          if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType === 'monthrange') {
            $this.$set(t, tempKeyB, root.defaultVal && root.defaultVal2 && [
              root.defaultVal, root.defaultVal2
            ] || [])
          }
          else if (root.type === 'time') {
            let constTime = '1970-01-01 ' //时间类型的不能直接赋值，需要拼接年月日
            if (root.isRange) {
              $this.$set(t, tempKeyB, root.defaultVal && root.defaultVal2 && [
                constTime + root.defaultVal, constTime + root.defaultVal2
              ] || null)
            }
            else {
              $this.$set(t, tempKeyB, root.defaultVal && (constTime + root.defaultVal) || null)
            }
          }
          else {
            $this.$set(t, tempKeyB, root.defaultVal || null)
          }
          w.push($this.$watch(() => t[tempKeyB], after => {
            tempKeysWatchHandle(d, after, root)
          }))
        }
        break
    }
  }
}

/**
 * 监听tempKeys项的值，然后赋值给dataGroup
 * @param d dataGroup的值
 * @param a 改变的值
 * @param root form节点
 * @param f formData数据
 * @param t tempKeys数据
 * @param $this this对象
 */
function tempKeysWatchHandle(d, a, root, f, t, $this) {
  switch (root.type) {
    case 'selectInput':
      if (a) {
        if (a.beforeKey) {
          delete d[a.beforeKey]
        }
        if(a.key){
          if(root.selectKey){
            d[root.selectKey] = a.key
            d[root.key] = a.val
          }else {
            d[a.key] = a.val
            d[root.key] = a.key + ':' + a.val
          }
        }else {
          d[root.key] = null
        }
      }else {
        d[root.key] = null
      }
      break
    case 'bdMap':
      if (a) {
        d[root.key] = a.lng
        d[root.key2] = a.lat
        if (root.key3) {
          d[root.key3] = a.name
        }
      }
      else {
        d[root.key] = null
        d[root.key2] = null
        if (root.key3) {
          d[root.key3] = null
        }
      }
      break
    case 'input':
    case 'inputNumber':
    case 'switch':
    case 'slider':
    case 'rate':
    case 'textarea':
      if (a || a === 0) {
        d[root.key] = a
      }
      else {
        if (root.type === 'inputNumber' || root.type === 'slider' || root.type === 'rate') {
          d[root.key] = undefined
        }else if (root.type === 'switch') {
          d[root.key] = false
        }
        else {
          d[root.key] = null
        }
      }
      break
    case 'select':
    case 'radio':
    case 'checkbox':
      if (root.booleanVal && (!root.multiple)) {
        d[root.key] = (isValidVal(a)? Boolean(a): null)
      }
      else if (root.multiple || root.type === 'checkbox') {
        d[root.key] = Object.assign([], a)
      }
      else {
        d[root.key] = a
      }
      /*需要收集额外字段*/
      if (root.collectLabel) {
        let targetOption
        if (root.multiple || root.type === 'checkbox') { //值是数组
          targetOption = root.options.filter(e => a && a.indexOf(e.val) > -1)
        }
        else {
          targetOption = root.options.find(e => e.val === a)
        }
        const setCollectChange = (it) => {
          if (it.key && it.valKey) {
            const collectTemp = f && f.find(e => e.key === it.key)
            let td = null
            if (Array.isArray(targetOption)) {
              td = targetOption.map(e => e[it.valKey])
              $this.$set(d, it.key, td)
              if (collectTemp && collectTemp.tempKey) {
                $this.$set(t, collectTemp.tempKey, td)
              }
            }
            else {
              if (targetOption && isValidVal(targetOption[it.valKey])) {
                td = targetOption[it.valKey]
              }
              $this.$set(d, it.key, td)
              if (collectTemp && collectTemp.tempKey) {
                $this.$set(t, collectTemp.tempKey, td)
              }
            }
          }
        }
        if (myTypeof(root.collectLabel) === 'Object') {
          setCollectChange(root.collectLabel)
        }
        else if (Array.isArray(root.collectLabel)) {
          for (let l of root.collectLabel) {
            setCollectChange(l)
          }
        }
      }
      break
    case 'date':
    case 'time':
      let tp = root.dateType || 'date'
      const fm = {
        year: 'YYYY',
        month: 'MM',
        date: 'YYYY-MM-DD',
        time: 'HH:mm:ss',
        datetime: 'YYYY-MM-DD HH:mm:ss',
        daterange: 'YYYY-MM-DD',
        monthrange: 'YYYY-MM',
        datetimerange: 'YYYY-MM-DD HH:mm:ss',
      }
      if (tp === 'daterange' || tp === 'datetimerange' || tp === 'monthrange' ||
        (root.type === 'time' && root.isRange)) {
        if (a && a[0] && a[1]) {
          if ((root.type === 'time' && root.isRange)) {
            d[root.key] = moment(a[0]).format(root.format || fm[root.type])
            d[root.key2] = moment(a[1]).format(root.format || fm[root.type])
          }
          else {
            d[root.key] = moment(a[0]).format(root.format || fm[tp])
            d[root.key2] = moment(a[1]).format(root.format || fm[tp])
          }
          if (tp === 'daterange' && root.addTime) {
            d[root.key] += ' 00:00:00'
            d[root.key2] += ' 23:59:59'
          }
        }
        else {
          d[root.key] = null
          d[root.key2] = null
        }
      }
      else {
        if (a) {
          if (root.type === 'time') {
            d[root.key] = moment(a).format(root.format || fm[root.type])
          }
          else {
            d[root.key] = moment(a).format(root.format || fm[tp])
          }
          if (tp === 'date' && root.addTime) {
            d[root.key] += ' 00:00:00'
          }
        }
        else {
          d[root.key] = null
        }
      }
      break
  }
}

/**
 * 初始化表单项的选项，如下拉选项，多选、单选组选项（私有）
 * @param url 远程选项接口地址
 * @param root 表单项结构数据对象
 * @param itemVal 表单项缓存的旧值
 * @param t tempKeys对象
 */
function initOption(url, root, itemVal, t) {
  if (url) {
    request.get(url).then(r => {
      if (r && r.code === 0) {
        let tOption = (r.data && r.data.data) || r.data || []
        root.options.length = 0
        if (root.localOption) {
          tOption.unshift(...root.localOption)
        }
        if (myTypeof(root.optionFilter) === 'Function') {
          tOption = root.optionFilter(tOption)
        }
        if (root.optionLabel && root.optionVal) {
          root.options = optionAssign(tOption, root)
        }
        if (isValidVal(itemVal)) {
          recoverVal(itemVal, root, t)
        }
      }
      else {
        console.warn(root.label + '：' + r.msg)
      }
    }).catch(e => {
      console.warn(root.label + '选项请求错误：' + e.message)
    })
  }
  else {
    console.warn(root.label + '选项url地址为空')
  }
}

/**
 * 如果options中选项的值和缓存的表单项旧值相等,则为表单项恢复之前因待选项改变而清除的值（私有）
 * @param itemVal 缓存的旧值
 * @param root 表单项结构数据对象
 * @param t tempKeys对象
 */
function recoverVal(itemVal, root, t) {
  if (Array.isArray(root.options)) {
    if (_.findIndex(root.options, {val: itemVal}) !== -1) {
      t[root.tempKey] = itemVal
    }
  }
}

/**
 * 表单选项重新赋值
 * @param tOption
 * @param root
 * @returns {*[]}
 */
function optionAssign(tOption = [], root) {
  tOption = tOption.map(eP => {
    let rP = {
      label: eP[root.optionLabel],
      val: eP[root.optionVal]
    }
    /*除了要收集绑定值，还要一并收集其他字段,则将其他字段加入到待选列表项*/
    if (root.collectLabel) {
      if (myTypeof(root.collectLabel) === 'Object') {
        if (root.collectLabel.valKey && root.collectLabel.valKey !== 'label') {
          rP[root.collectLabel.valKey] = eP[root.collectLabel.valKey]
        }
      }
      else if (Array.isArray(root.collectLabel)) {
        for (let tC of root.collectLabel) {
          if (tC.valKey && tC.valKey !== 'label') {
            rP[tC.valKey] = eP[tC.valKey]
          }
        }
      }
    }
    if (rP.val !== null && rP.val !== undefined) {
      return rP
    }
  })
  return tOption
}

/**
 * 将使用tempKey的表单项的默认值赋转换成对应格式并储存(私有)
 * @param root 表单项结构数据
 * @param a 储存默认值的容器
 */
export function getTempKeyDefaultVal(root, a) {
  switch (root.type) {
    case 'selectInput':
      a[root.tempKey] = {
        key: root.key,
        val: root.defaultVal
      }
      break
    case 'bdMap':
      a[root.tempKey] = {
        lng: root.defaultVal || 0,
        lat: root.defaultVal2 || 0
      }
      if (root.key3) {
        a[root.tempKey]['name'] = root.defaultVal3 || ''
      }
      break
    case 'input':
    case 'switch':
    case 'inputNumber':
    case 'slider':
    case 'rate':
    case 'textarea':
      a[root.tempKey] = root.defaultVal
      break
    case 'radio':
    case 'select':
    case 'checkbox':
      if (root.booleanVal) {
        a[root.tempKey] = Boolean(root.defaultVal) ? 1 : 0
      }
      else {
        a[root.tempKey] = root.defaultVal
      }
      break
    case 'date':
    case 'time':
      if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType === 'monthrange') {
        a[root.tempKey] = root.defaultVal && root.defaultVal2 && [
          root.defaultVal, root.defaultVal2
        ] || []
      }
      else if (root.type === 'time') {
        let constTime = '1970-01-01 ' //时间类型的不能直接赋值，需要拼接年月日
        if (root.isRange) {
          a[root.tempKey] = root.defaultVal && root.defaultVal2 && [
            constTime + root.defaultVal, constTime + root.defaultVal2
          ] || null
        }
        else {
          a[root.tempKey] = root.defaultVal && (constTime + root.defaultVal) || null
        }
      }
      else {
        a[root.tempKey] = root.defaultVal
      }
      break
  }
}

/**
 * 更新tampKey
 * @param f formDataT 数据
 * @param t tempKeys 临时数据
 * @param d 新数据
 * @param notClearOthers 是否清空其他表单项，默认清空
 */
export function updateTempKeys(f, t, d, notClearOthers = false) {
  for (let root of f) {
    if ((notClearOthers && (d[root.key] !== undefined || d[root.key2] !== undefined) || !notClearOthers) &&
      root.tempKey) {
      switch (root.type) {
        case 'bdMap':
          if (myTypeof(d[root.key]) === 'Number' && myTypeof(d[root.key2] === 'Number')) {
            t[root.tempKey] = {
              lng: d[root.key],
              lat: d[root.key2]
            }
            if (root.key3) {
              t[root.tempKey]['name'] = d[root.key3] || ''
            }
          }
          else {
            t[root.tempKey] = {
              lng: null,
              lat: null
            }
            if (root.key3) {
              t[root.tempKey]['name'] = ''
            }
          }
          break
        case 'selectInput':
        case 'input':
        case 'inputNumber':
        case 'switch':
        case 'slider':
        case 'rate':
        case 'textarea':
          if (d[root.key] || d[root.key] === 0) {
            t[root.tempKey] = d[root.key]
          }
          else {
            if (root.type === 'inputNumber' || root.type === 'slider' || root.type === 'rate') {
              t[root.tempKey] = undefined
            }
            else if (root.type === 'switch') {
              t[root.tempKey] = false
            }
            else {
              t[root.tempKey] = null
            }
          }
          break
        case 'select':
        case 'radio':
        case 'checkbox':
          if (isValidVal(d[root.key])) {
            if (root.multiple || root.type === 'checkbox') {
              t[root.tempKey] = [...d[root.key]]
            }
            else if (root.booleanVal) {
              t[root.tempKey] = Boolean(d[root.key]) ? 1 : 0
            }
            else {
              t[root.tempKey] = d[root.key]
            }
          }
          else {
            if (root.multiple || root.type === 'checkbox') {/*当notClearOthers为false时用来清空*/
              t[root.tempKey] = []
            }
            else {
              t[root.tempKey] = null
            }
          }
          break
        case 'date':
        case 'time':
          if (root.dateType === 'daterange' || root.dateType === 'datetimerange' || root.dateType === 'monthrange') {
            t[root.tempKey] = d[root.key] && d[root.key2] && [d[root.key], d[root.key2]] || []
          }
          else if (root.type === 'time') {
            let constTime = '1970-01-01 ' //时间类型的不能直接赋值，需要拼接年月日
            if (root.isRange) {
              t[root.tempKey] =
                d[root.key] && d[root.key2] && [constTime + d[root.key], constTime + d[root.key2]] || null
            }
            else {
              t[root.tempKey] = d[root.key] && (constTime + d[root.key]) || null
            }
          }
          else {
            t[root.tempKey] = d[root.key] || null
          }
          break
      }
    }
  }
}


/**
 * 初始化表单默认值
 * @param f formDataT数据
 * @param t formDataT的临时key
 * @param d 初始化对象
 * @param k key值
 */
export function initClearFormData(f, t, d, k) {
  if (Array.isArray(d[k])) {
    d[k] = []
  }
  else {
    const formItem = f.find(e => e[t] === k)
    if (formItem && (formItem.type === 'editor')) {
      d[k] = ''
    }
    else if (formItem && (formItem.type === 'inputNumber' || formItem.type === 'slider' || formItem.type === 'rate')) {
      d[k] = undefined
    }
    else if (formItem && (formItem.type === 'switch')) {
      d[k] = false
    }
    else {
      d[k] = null
    }
  }
}

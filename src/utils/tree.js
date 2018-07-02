export default {
  getTree(parmas) {
    var start = new Date().getTime() //起始时间
    //准备数据
    let testData = {
      "department": [
        {
          "departmentName": "测试1",
          "departmentDesc": "盛达康网络",
          "parentId": "",
          "id": "594a28fb1c8652a01f0301"
        }
      ]
    }
    // var data = this.treeDate // 数组
    let treedata = [] // 建空数组
    //查找最顶层-------一级部门
    let len = parmas.length
    for (let j = 0; j < len; j++) {
      // data[j].expand = false
      data[j].deptName = data[j].name
      data[j].label = data[j].name
      if (data[j].parentId == "0") {
        treedata.push({
          "expand": true,
          "deptName": data[j].name,
          "label": data[j].name,
          "deptId": data[j].deptId
        })
      }
    }
    // 找到跟最高层id相关的子子孙孙，并给子孙添加lev
    var treedataLevs = []
    for (let h = 0, ls = treedata.length; h < ls; h++) {
      treedataLevs.push({
        treedataLev: sonsTree(data, treedata[h].deptId)
      })
    }
    console.log(treedataLevs)
    for (let p = 0, lq = treedataLevs.length; p < lq; p++) {
      var treedataLev = treedataLevs[p].treedataLev
      // 找到最高层的lev
      var maxLev = 0
      for (let i = 0, lt = treedataLev.length; i < lt; i++) {
        if (parseInt(treedataLev[i].lev) > maxLev) {
          maxLev = parseInt(treedataLev[i].lev)
        } else {
          maxLev = maxLev
        }
      }
      // 比较当前层和上一层的数据，然后做处理
      var needLev = maxLev
      var maxLevTree = []
      var maxLevTreePrev = []
      for (let m = 0; m < maxLev; m++) {
        maxLevTree = getLevArr(treedataLev, needLev)
        maxLevTreePrev = getLevArr(treedataLev, needLev - 1)
        for (var j = 0, lp = maxLevTreePrev.length; j < lp; j++) {
          maxLevTreePrev[j].children = new Array()
          for (var i = 0, lm = maxLevTree; i < lm.length; i++) {
            if (maxLevTree[i].parentId == maxLevTreePrev[j].deptId) {
              maxLevTreePrev[j].children.push(maxLevTree[i])
            }
          }
        }
        needLev--
      }
      treedata[p].children = maxLevTreePrev
    }
    this.baseData = treedata
    // 找出同一级的数据
    function getLevArr(arr, lev) {
      var newarr = []
      for (let i = 0, la = arr.length; i < la; i++) {
        // 这里对arr 的children 做处理
        arr.children = new Array()
        if (parseInt(arr[i].lev) === lev) {
          newarr.push(arr[i])
        }
      }
      return newarr
    }
    // 给每个数据添加一个lev
    function sonsTree(arr, deptId) {
      var temp = []
      var lev = 0
      var forFn = function(arr, deptId, lev) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.parentId === deptId) {
            item.lev = lev
            temp.push(item)
            forFn(arr, item.deptId, lev + 1)
          }
        }
      }
      forFn(arr, deptId, lev)
      return temp
    }
    var end = new Date().getTime() // 结束时间
    return treedata
    // this.data = treedata
    console.log('Tree初始化的时间是' + (end - start) + 'ms') // 返回函数执行需要时间
  }
}

// Generate an Array with each button properties
const paginate = callAPI => {
  const pagesCount = Math.ceil(count / limit)
  let paginate = []

  if (pagesCount <= 5) {
    for (let i = 1; i <= pagesCount; i++) {
      paginate.push({
        page: i,
        offset: (i - 1) * limit,
        current: i === currentPage
      })
    }
  } else {
    if (currentPage > 3) {
      paginate.push({
        page: 'first',
        offset: 0
      })
    }
    if (currentPage > 1) {
      paginate.push({
        page: 'prev',
        offset: (currentPage - 2) * limit
      })
    }
    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        paginate.push({
          page: i,
          offset: (i - 1) * limit,
          current: i === currentPage
        })
      }
    } else if (currentPage > pagesCount - 2) {
      for (let i = pagesCount - 4; i <= pagesCount; i++) {
        paginate.push({
          page: i,
          offset: (i - 1) * limit,
          current: i === currentPage
        })
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        paginate.push({
          page: i,
          offset: (i - 1) * limit,
          current: i === currentPage
        })
      }
    }
    if (currentPage < pagesCount) {
      paginate.push({
        page: 'next',
        offset: currentPage * limit
      })
    }
    if (currentPage < pagesCount - 2) {
      paginate.push({
        page: 'last',
        offset: (pagesCount - 1) * limit
      })
    }
  }

  createPaginateElements(paginate, 'top', callAPI)
  createPaginateElements(paginate, 'bottom', callAPI)
}

// Use to create each Pagination Buttons
const createPaginateElements = (paginate, position, callAPI) => {
  let pages = document.querySelectorAll(`.pages-${position}`)
  let pagesElements = document.querySelectorAll(`.pages-${position} *`)
  if (pagesElements) pagesElements.forEach(el => el.remove())

  for (let i = 0; i < paginate.length; i++) {
    let page = paginate[i]
    let element
    if (!page.current) {
      element = document.createElement('button')
      element.className = 'select-page'
      element.addEventListener('click', () => {
        offset = page.offset
        currentPage = Math.ceil(offset / limit) + 1
        callAPI()
      })
    } else {
      element = document.createElement('span')
      element.className = 'current-page'
    }
    element.innerHTML = page.page
    pages.forEach(el => el.appendChild(element))
  }
}

// Generate rows for table with a given object
const generateTable = (obj, baseRowId = '', link = '') => {
  let table = document.querySelector('.table')
  let rows = document.querySelectorAll('.table-row')
  if (rows) rows.forEach(row => row.remove())

  for (let i = 0; i < obj.length; i++) {
    let row = document.createElement('div')
    row.className = 'table-row'
    let values = Object.entries(obj[i])
    let idRow

    for (let j = 0; j < values.length; j++) {
      let col = document.createElement('span')
      let name = values[j][0]
      let value = values[j][1]
      if (/(id_).+/.test(name))
        idRow = value
      if (name === 'duree_minutes')
        col.innerHTML = `${Math.floor(value / 60)}h${value % 60}`
      else if (name === 'genre' || name === 'distributeur')
        col.innerHTML = value && value.nom ? value.nom : 'Undefined'
      else if (value === null || value === undefined)
        col.innerHTML = 'Undefined'
      else col.innerHTML = value
      row.appendChild(col)
    }

    let actions = document.createElement('span')
    let show = document.createElement('a')
    show.innerHTML = 'Show'
    show.href = `/cinema/${link}/${idRow}`
    actions.appendChild(show)
    row.appendChild(actions)
    row.id = `${baseRowId}_${idRow}`

    table.appendChild(row)
  }
}
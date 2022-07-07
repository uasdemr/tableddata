type ThProps = {
  name: string
  setSort: (evt: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void,
  sort: string
  parametr: string
}

const Th = ({ name, setSort, sort, parametr }: ThProps) => {

  const makeSortString = (name: string) => {
    let tmpArr = name.split(' ')
    tmpArr[0] = tmpArr[0].toLowerCase()
    const newName = tmpArr.join('')
    return newName
  }

  const setSortArrow = () => {
    if (sort === 'asc') {
      return <svg className="bi bi-arrow-up th-svg" xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
      </svg>
    } else if (sort === 'desc')
      return <svg className="bi bi-arrow-down th-svg" xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
      </svg>
  }

  return (
    <th
      className="position-relative"
      onClick={evt => setSort(evt)}
      data-sort={makeSortString(name)}
    >
      {name}
      {parametr === makeSortString(name) && setSortArrow()}
    </th>
  )
}

export { Th }

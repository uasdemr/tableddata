type PaginationProps = {
  usersPerPage: number
  totalRows: number
  paginate: (pageNumber: number) => void
  currentPage: number
}

type CreatePagesPops = {
  pagesCount: number
  currentPage: number
}

const Pagination = ({ usersPerPage, totalRows, paginate, currentPage }: PaginationProps) => {
  const pageNumbers: number[] = []



  function createPages({ pagesCount, currentPage }: CreatePagesPops) {
    if (pagesCount > 10) {
      if (currentPage > 5) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          pageNumbers.push(i)
          if (i === pagesCount) break
        }
      }
      else {
        for (let i = 1; i <= 10; i++) {
          pageNumbers.push(i)
          if (i === pagesCount) break
        }
      }
    } else {
      for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i)
      }
    }
  }

  createPages(
    {
      pagesCount: Math.ceil(totalRows / usersPerPage),
      currentPage: currentPage
    })

  return (
    <div className="order-1 order-sm-0 mt-2 mt-sm-0">
      <ul className="pagination mb-0 justify-content-center flex-wrap">
        <li className="page-item">
          <button
            className="page-link"
            onClick={(evt) => {
              evt.preventDefault()
              paginate(1)
            }}
          >
            {'<<'}
          </button>
        </li>
        {
          pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <button
                className={`page-link ${currentPage === number ? 'page-link--active' : ''}`}
                onClick={(evt) => {
                  evt.preventDefault()
                  paginate(number)
                }}
              >
                {number}
              </button>
            </li>
          ))
        }
        <li className="page-item">
          <button
            className="page-link"
            onClick={(evt) => {
              evt.preventDefault()
              paginate(Math.ceil(totalRows / usersPerPage))
            }}
          >
            {'>>'}
          </button>
        </li>
      </ul>
    </div>
  )
}

export { Pagination }

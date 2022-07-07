import { useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { fetchBigDataAction, fetchLittleDataAction } from "../../stote/api-action"
import { store } from "../../stote/store"
import { toggleAddFormVisible } from "../../stote/table-slice"
import { MyButton } from "../Button"
import { Find } from "../Find"

const MyNavbar = () => {
  const isLittleDataLoading = useAppSelector(state => state.users.isLittleDataLoading)
  const isBigDataLoading = useAppSelector(state => state.users.isBigDataLoading)

  const addTableRowHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    store.dispatch(toggleAddFormVisible())
  }

  const getLittleData = () => {
    store.dispatch(fetchLittleDataAction())
  }

  const getBigData = () => {
    store.dispatch(fetchBigDataAction())
  }

  const [visibleMenu, setVisibleMenu] = useState(false)

  return (
    <nav className="navbar navbar-expand-md bg-light">
      <div className="container-fluid">

        <p className="navbar-brand mb-0">TABLED DATA</p>

        <button
          onClick={() => { setVisibleMenu(!visibleMenu) }}
          className="navbar-toggler navbar p-0"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </span>

        </button>

        <div
          className={`collapse navbar-collapse mt-2-md ${visibleMenu ? 'show' : ''}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item d-flex">
              <MyButton
                mb={2}
                onClick={getLittleData}
                text='LittleData' isLoading={isLittleDataLoading}
              />
            </li>
            <li className="nav-item d-flex">
              <MyButton
                mb={2}
                ms={2}
                onClick={getBigData}
                text='BigData' isLoading={isBigDataLoading}
              />
            </li>
            <li className="nav-item d-flex">
              <MyButton
                mb={2}
                ms={2}
                onClick={evt => addTableRowHandler(evt)}
                text='Добавить'
              />
            </li>
          </ul>
          <Find text="Поиск" />
        </div>
      </div>
    </nav>
  )
}

export { MyNavbar }

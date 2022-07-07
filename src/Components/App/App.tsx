import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { fetchLittleDataAction } from '../../stote/api-action';
import { store } from '../../stote/store';
import { MyTable } from '../Table';
import { useAppSelector } from '../../app/hooks';
import MySpinner from '../Spinner/Spinner';
import { UserCard } from '../Card';
import { MyNavbar } from '../Navbar';
import { Pagination } from '../Pagination/Pagination';
import { setCurrentPage, setSorting, setSortingRows } from '../../stote/table-slice';
import { Select } from '../Select/Select';
import { filterByValue } from '../../utils';
import { AddForm } from '../AddRowForm';

function App() {
  const setSort = (evt: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    const sort = evt.currentTarget.dataset.sort
    if (sort) {

      if (!sorting.sort) {
        store.dispatch(setSorting({
          sort: 'asc',
          parametr: sort
        }))
      }

      else if (sorting.sort === 'asc' && sorting.parametr === sort) {
        store.dispatch(setSorting({
          sort: 'desc',
          parametr: sort
        }))
      }
      else if (sorting.sort === 'desc' && sorting.parametr === sort) {
        store.dispatch(setSorting({
          sort: '',
          parametr: ''
        }))
      }
      else {
        store.dispatch(setSorting({
          sort: 'asc',
          parametr: sort
        }))
      }
    }
    store.dispatch(setSortingRows())
  }
  const uniqUsers = useAppSelector(state => state.users.uniqUsers)
  const isDataLoaded = useAppSelector(state => state.users.isDataLoaded)
  const activeUser = useAppSelector(state => state.users.activeUser)
  const usersPerPage = useAppSelector(state => state.users.usersPerPage)
  const sorting = useAppSelector(state => state.users.sorting)
  const userFilter = useAppSelector(state => state.users.userFilter)
  const isAddForm = useAppSelector(state => state.users.isAddForm)
  const currentPage = useAppSelector(state => state.users.currentPage)

  // const [currentPage, setCurrentPage] = useState<number>(currPage)

  const paginate = (pageNumber: number) => {
    store.dispatch(setCurrentPage(pageNumber))
  }

  useEffect(() => {
    store.dispatch(fetchLittleDataAction())
  }, [])


  const lastUsersIndex = currentPage * usersPerPage
  const firstUsersIndex = lastUsersIndex - usersPerPage

  const currentUsers = userFilter ? filterByValue(uniqUsers.slice(firstUsersIndex, lastUsersIndex), userFilter)
    : uniqUsers.slice(firstUsersIndex, lastUsersIndex)

  return (
    <div className="app container-fluid">
      {!isDataLoaded && <MySpinner />}
      <MyNavbar />
      {isDataLoaded &&
        <MyTable
          rows={currentUsers}
          setSort={setSort}
          sorting={sorting}
        />
      }
      <div className='table-navigate d-flex flex-column flex-sm-row justify-content-sm-between'>
        {usersPerPage < uniqUsers.length && <Pagination
          usersPerPage={usersPerPage}
          totalRows={uniqUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />}
        <Select
          usersPerPage={usersPerPage}
        />
      </div>
      {activeUser && <UserCard user={activeUser} />}
      {isAddForm && <AddForm />}
    </div>
  );
}

export default App;

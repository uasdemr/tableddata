import { store } from "../../stote/store"
import { setTableRows } from "../../stote/table-slice"


const Select = ({ usersPerPage }: { usersPerPage: number }) => {
  const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    store.dispatch(setTableRows(parseInt(evt.currentTarget.value)))
  }

  return (
    <div className="select-wrapper order-0 order-sm-1">
      <select
        className="form-select"
        onChange={onSelectChange}
        defaultValue={usersPerPage}
        title='Количество строк таблицы'
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </div>
  )
}

export { Select }

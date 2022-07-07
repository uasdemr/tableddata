import { store } from "../../stote/store"
import { setUserFilter, setUniqUserFilter } from "../../stote/table-slice"
import { MyButton } from "../Button"

type FindProps = {
  text: string
}

const Find = ({ text }: FindProps) => {
  const onInputKeyPressHandler = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      store.dispatch(setUniqUserFilter())
    }
  }

  const userFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const userFilter = evt.currentTarget.value
    store.dispatch(setUserFilter(userFilter))
  }

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        onKeyDown={onInputKeyPressHandler}
        onChange={userFilter}
        type="text"
        aria-label="Text input with dropdown button"
        placeholder={text}
      />
      <MyButton
        ms={2}
        onClick={() => { store.dispatch(setUniqUserFilter()) }}
        text='Найти'
      />
    </div>
  )
}

export { Find }

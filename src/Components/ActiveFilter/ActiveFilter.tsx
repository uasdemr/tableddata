type ActiveFilterProps = {
  userFilter: string[];
}

const ActiveFilter = ({ userFilter }: ActiveFilterProps) => {
  return (
    <div className="active-filter__wrapper">
      {userFilter.map(item => {
        return (
          <span key={item} className="badge bg-success position-relative">
            {item}
            <button
              data-filter={item}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </span>
        )
      })}
    </div>
  )
}

export { ActiveFilter }

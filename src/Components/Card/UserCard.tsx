import { ActiveUser } from "../../types/table"

type UserCardProps = {
  user: ActiveUser
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <article className="container-fluid">
      <div className="card-header" style={{ borderBottom: 'none', background: 'none' }}>
        Выбран пользователь <b>{user.firstName} {user.lastName}</b>
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Описание</label>
            <textarea
              className="form-control" id="exampleFormControlTextarea1" rows={3}
              value={user.description}
              onChange={evt => console.log(evt)}
            ></textarea>
          </div>
        </form>
        <p className="card-text">
          Адрес проживания: <b>{user.address ? user.address.streetAddress : ''}</b>
        </p>
        <p className="card-text">
          Город: <b>{user.address ? user.address.state : ''}</b>
        </p>
        <p className="card-text">
          Провинция/штат: <b>{user.address ? user.address.state : ''}</b>
        </p>
        <p className="card-text">
          Индекс: <b>{user.address ? user.address.zip : ''}</b>
        </p>
      </div>
    </article>
  )
}

export { UserCard }

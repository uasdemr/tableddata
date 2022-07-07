import React, { useEffect, useState } from "react"
import { store } from "../../stote/store"
import { setActiveUser } from "../../stote/table-slice"
import { TableType } from "../../types/table"
import { Th } from "../Th/Th"
import { User } from "../../const"

const MyTable = ({ rows, setSort, sorting }: TableType) => {
  const [componentRows, setComponentsRows] = useState(rows)
  const { sort, parametr } = sorting

  const setUser = (evt: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const id = evt.currentTarget.children[0].firstChild?.textContent
    if (id) {
      const newId = parseInt(id)
      const user = componentRows.find(row => newId === row.id)
      if (user) {
        store.dispatch(setActiveUser(user))
      }
    }
  }

  useEffect(() => {
    setComponentsRows(rows)
  }, [rows])

  return (
    <section className="table-responsive tabler-wrapper">
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            {
              User.map((item, index) => {
                return <Th
                  name={item}
                  setSort={setSort}
                  sort={sort}
                  parametr={parametr}
                  key={index}
                />
              })
            }
          </tr>
        </thead>
        <tbody style={{ maxHeight: '67vh' }}>
          {
            componentRows.map((componentRow) => {
              return (
                <tr
                  onClick={evt => setUser(evt)}
                  key={componentRow.id}
                >
                  <td>{componentRow.id}</td>
                  <td>{componentRow.firstName}</td>
                  <td>{componentRow.lastName}</td>
                  <td>{componentRow.email}</td>
                  <td>{componentRow.phone}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </section>
  )
}

export { MyTable }

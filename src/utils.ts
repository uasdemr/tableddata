import { UserType } from "./types/table"

const filterByValue = (array: UserType, string: string) => {
  const tmpString = string.toLowerCase()
  const filtered = array.filter(item => {
    return item.id.toString().toLowerCase().includes(tmpString)
      || item.description.toLowerCase().includes(tmpString)
      || item.email.toLowerCase().includes(tmpString)
      || item.firstName.toLowerCase().includes(tmpString)
      || item.firstName.toLowerCase().includes(tmpString)
      || item.lastName.toLowerCase().includes(tmpString)
      || item.phone.toLowerCase().includes(tmpString)
  })
  return filtered
}

export { filterByValue }

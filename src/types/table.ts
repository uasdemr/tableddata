
export type AddressType = {
  streetAddress: string,
  city: string,
  state: string,
  zip: string
}

export type UserType = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: AddressType,
  description: string,
}[]

export type ActiveUser = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: AddressType,
  description: string,
}

export type NewUser = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  description: string,
  address: AddressType
}

export type SortType = {
  sort: string
  parametr: string
}

export type TableType = {
  rows: UserType,
  setSort: (evt: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void,
  sorting: {
    sort: string
    parametr: string
  }
}

export type AppType = {
  users: UserType,
  uniqUsers: UserType,
  userFilter: string,
  isDataLoaded: boolean,
  isLittleDataLoading: boolean,
  isBigDataLoading: boolean,
  isAddForm: boolean,
  currentPage: number,
  activeUser: ActiveUser,
  usersPerPage: number,
  sorting: SortType,
}

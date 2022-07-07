import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActiveUser, AppType, NewUser, UserType } from '../types/table'
import { fetchBigDataAction, fetchLittleDataAction } from './api-action'
import { uniqBy, shuffle } from 'lodash'
import { filterByValue } from '../utils'

const initialState: AppType = {
  users: [],
  uniqUsers: [],
  userFilter: '',
  isDataLoaded: false,
  isLittleDataLoading: false,
  isBigDataLoading: false,
  isAddForm: false,
  currentPage: 1,
  activeUser: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: ''
    },
    description: '',
  },
  usersPerPage: 10,
  sorting: {
    sort: '',
    parametr: ''
  }
}

const getUniqUsers = (users: UserType): UserType => {
  let uniqUsers: UserType = uniqBy(users, 'id')
  return uniqUsers
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    toggleAddFormVisible(state) {
      state.isAddForm = !state.isAddForm
    },
    setUniqUserFilter(state) {
      state.uniqUsers = filterByValue(getUniqUsers(state.users), state.userFilter)
      state.sorting = {
        sort: '',
        parametr: ''
      }
    },
    setUserFilter(state, action: PayloadAction<string>) {
      state.userFilter = action.payload
    },
    setActiveUser(state, action: PayloadAction<ActiveUser>) {
      state.activeUser = action.payload
    },
    setTableRows(state, action: PayloadAction<number>) {
      state.usersPerPage = action.payload
    },
    setSorting(state, action: PayloadAction<{ sort: string, parametr: string }>) {
      state.sorting = action.payload
    },
    setSortingRows(state) {
      const { sort, parametr } = state.sorting
      if (sort === '') {
        state.uniqUsers = shuffle(state.uniqUsers)
      }
      state.uniqUsers = state.uniqUsers.sort((a, b) => {
        if (sort === 'desc') {
          if (a[parametr] < b[parametr]) {
            return -1
          } else {
            return 1
          }
        }
        if (sort === 'asc') {
          if (a[parametr] > b[parametr]) {
            return -1
          } else {
            return 1
          }
        }
        return 0
      })
    },
    addNewRow(state, action: PayloadAction<NewUser>) {
      const possibleUser: NewUser = action.payload
      state.uniqUsers.unshift(possibleUser)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLittleDataAction.pending, (state) => {
        state.isLittleDataLoading = true
      })
      .addCase(fetchLittleDataAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload
          state.uniqUsers = getUniqUsers(action.payload)
          state.isDataLoaded = true
          state.isLittleDataLoading = false
          state.currentPage = 1
          state.sorting = {
            sort: '',
            parametr: ''
          }
        }
      })
      .addCase(fetchBigDataAction.pending, (state) => {
        state.isBigDataLoading = true
      })
      .addCase(fetchBigDataAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload
          state.uniqUsers = getUniqUsers(action.payload)
          state.isDataLoaded = true
          state.isBigDataLoading = false
          state.currentPage = 1
          state.sorting = {
            sort: '',
            parametr: ''
          }
        }
      })
  }
})

export const { setActiveUser,
  setTableRows,
  setSorting,
  setSortingRows,
  setUserFilter,
  setUniqUserFilter,
  toggleAddFormVisible,
  addNewRow,
  setCurrentPage,
} = usersSlice.actions
export default usersSlice.reducer

import React, { useEffect, useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { visuallyHidden } from '@mui/utils'
import { Box, TableSortLabel } from '@mui/material'
import styles from './UsersTable.module.scss'
import Link from '@mui/material/Link'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersList } from '../store/actions/data'
import { ReducerData, UserData } from '../types/reducers'
import { ThunkDispatch } from 'redux-thunk'
import CustomAxios from '../utility/customAxios'
import AlertModal from './AlertModal'

/**
 * Generic sort Function to compare number and string datatypes
 * @param a first parameter in JS Sort function
 * @param b second parameter in JS Sort function
 * @returns -1 or 1 based on lexicographical order
 */
const compareFnForSorting = (a: number | string, b: number | string) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b
    } else if (typeof a === 'number') {
        return -1
    } else if (typeof b === 'number') {
        return 1
    } else {
        return a > b ? 1 : -1
    }
}

const UsersTable: React.FC = () => {
    const addFileInputRef = React.useRef<HTMLInputElement>(null) // Ref for add user image input box

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
    const { data: users, loading } = useSelector((state: { data: ReducerData }) => state.data.users) || []

    const newUserID = users?.reduce((maxId, user) => Math.max(user.id, maxId), -1) + 1

    // State variables
    const [alertModalData, setAlertModalData] = useState({ open: false, message: '' })

    const initialNewUserData = { first_name: '', last_name: '', email: '', image: undefined }
    const [newUserData, setNewUserData] = useState(initialNewUserData)

    const initialNewUserDataValid = { first_name: true, last_name: true, email: true }
    const [newUserDataValid, setNewUserDataValid] = useState(initialNewUserDataValid)

    const [sortType, setSortType] = useState({ key: 'id', type: 'asc' })

    // Function to update `newUserData` state variable
    const updateField = (type: string, value: string | File | undefined) => setNewUserData((prevState) => ({ ...prevState, [type]: value }))

    // Memoized sorted users list
    const sortedUsersData = useMemo(() => {
        return users.sort((a: UserData, b: UserData) => {
            const key = sortType.key as keyof UserData
            if (sortType.type == 'asc') return compareFnForSorting(a[key], b[key])
            else return compareFnForSorting(b[key], a[key])
        })
    }, [users, sortType])

    // Helper function to get sort type of table column
    const getSortType = (key: string): 'asc' | 'desc' => (sortType.key == key && sortType.type == 'asc' ? 'desc' : 'asc')

    /** Validator function to check data in `newUserData` state variable
     * @returns validity of `newUserData` state
     */
    const isNewUserDataValid = (): boolean => {
        const valid = { ...newUserDataValid }

        const firstNameValid = Boolean(newUserData.first_name.length)
        const lastNameValid = Boolean(newUserData.last_name.length)
        const emailValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(newUserData.email)

        valid.first_name = firstNameValid
        valid.last_name = lastNameValid
        valid.email = emailValid

        setNewUserDataValid(valid)
        return !Object.values(valid).some((validity) => !validity)
    }

    // Function to refresh user data, called on mount and when new user is added
    const refreshUserData = () => dispatch(getUsersList())

    // Function to Add user, validate details and refresh data on success or show error modal on failure
    const addNewUser = () => {
        if (isNewUserDataValid()) {
            const options = {
                method: 'POST',
                url: 'http://localhost:3001/api/v1/user',
                headers: { 'Content-Type': 'application/json' },
                data: { id: newUserID, first_name: newUserData.first_name, last_name: newUserData.last_name, email: newUserData.email }
            }

            CustomAxios.request(options)
                .then((response) => {
                    console.log(response.data)
                    refreshUserData()
                    setNewUserData(initialNewUserData)
                })
                .catch((error) => {
                    console.error(error)
                    setAlertModalData({ open: true, message: error.response?.data?.message || 'Could not add User to Database.' })
                })
        }
    }

    // To dispatch users data on mount
    useEffect(() => {
        refreshUserData()
    }, [])

    return (
        <>
            <AlertModal open={alertModalData.open} message={alertModalData.message} setOpen={(open) => setAlertModalData({ open, message: '' })} />
            <TableContainer color="secondary" className={styles['table']} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>
                                <TableSortLabel direction={getSortType('id')} onClick={() => setSortType({ key: 'id', type: getSortType('id') })}>
                                    ID
                                    <Box sx={visuallyHidden}>{'sorted ascending'}</Box>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    direction={getSortType('first_name')}
                                    onClick={() => setSortType({ key: 'first_name', type: getSortType('first_name') })}
                                >
                                    First Name
                                    <Box sx={visuallyHidden}>{'sorted ascending'}</Box>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    direction={getSortType('last_name')}
                                    onClick={() => setSortType({ key: 'last_name', type: getSortType('last_name') })}
                                >
                                    Last Name
                                    <Box sx={visuallyHidden}>{'sorted ascending'}</Box>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel direction={getSortType('email')} onClick={() => setSortType({ key: 'email', type: getSortType('email') })}>
                                    Email
                                    <Box sx={visuallyHidden}>{'sorted ascending'}</Box>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsersData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row" align="center" className={styles['profile-picture-container']}>
                                    <img src={row.avatar} alt={`UserID - ${row.id}`} className={styles['profile-picture']} />
                                </TableCell>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>
                                    <Link href={'mailto:' + row.email}>{row.email}</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className={`${styles['table-last-row']}`}>
                            <TableCell component="th" scope="row" align="center" className={styles['profile-picture-container']}>
                                <input
                                    type="file"
                                    hidden={true}
                                    ref={addFileInputRef}
                                    accept="image/*"
                                    onChange={(e) => updateField('image', e?.target?.files?.[0])}
                                />
                                {newUserData.image ? (
                                    <img
                                        src={window.URL.createObjectURL(newUserData.image)}
                                        className={styles['profile-picture']}
                                        onClick={() => addFileInputRef?.current?.click()}
                                    />
                                ) : (
                                    <Fab color="primary" aria-label="add" onClick={() => addFileInputRef?.current?.click()}>
                                        <AddIcon />
                                    </Fab>
                                )}
                            </TableCell>
                            <TableCell>
                                <TextField
                                    disabled={true}
                                    value={newUserID}
                                    onChange={(e) => updateField('id', e.target.value)}
                                    label="ID"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={newUserData.first_name}
                                    onChange={(e) => updateField('first_name', e.target.value)}
                                    error={!newUserDataValid.first_name}
                                    label="First Name"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={newUserData.last_name}
                                    onChange={(e) => updateField('last_name', e.target.value)}
                                    error={!newUserDataValid.last_name}
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    value={newUserData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    error={!newUserDataValid.email}
                                    label="Email"
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter className={`${styles['table-last-row']}`}>
                        <TableRow className={`${styles['table-last-row']}`}>
                            <TableCell colSpan={5} className={styles['save-button']}>
                                <Button variant="contained" onClick={addNewUser}>
                                    Save
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default UsersTable

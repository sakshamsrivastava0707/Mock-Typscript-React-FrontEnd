import UsersTable from '../../components/UsersTable'
import { renderWithProviders } from '../../utility/renderWithProviders'
import { preloadedState } from '../reduxMock'

test('UsersTable headers names', () => {
    // Test to check table header labels
    const wrapper = renderWithProviders(<UsersTable />, { preloadedState })
    const tableHeaders = wrapper.container.querySelectorAll('thead tr th')
    const icon = tableHeaders?.[0]?.innerHTML,
        id = tableHeaders?.[1]?.innerHTML,
        firstName = tableHeaders?.[2]?.innerHTML,
        lastName = tableHeaders?.[3]?.innerHTML,
        email = tableHeaders?.[4]?.innerHTML

    expect(id).toContain('ID')
    expect(firstName).toContain('First Name')
    expect(lastName).toContain('Last Name')
    expect(email).toContain('Email')
})

test('UsersTable first row data', () => {
    // Test to check table first row values from mock
    const wrapper = renderWithProviders(<UsersTable />, { preloadedState })
    const tableData = wrapper.container.querySelectorAll('tbody tr td, tbody tr th')
    const icon = tableData[0].innerHTML,
        id = tableData[1].innerHTML,
        firstName = tableData[2].innerHTML,
        lastName = tableData[3].innerHTML,
        email = tableData[4].innerHTML

    expect(icon).toContain('https://reqres.in/img/faces/1-image.jpg')
    expect(id).toContain('1')
    expect(firstName).toContain('George')
    expect(lastName).toContain('Bluth')
    expect(email).toContain('george.bluth@reqres.in')
})

test('inputs in last row of UserTable to add user', () => {
    // Test to check label and input boxes of add user in footer
    const wrapper = renderWithProviders(<UsersTable />, { preloadedState })
    const addUserContainer = wrapper.container.querySelectorAll('tbody tr:last-child td')
    const id = addUserContainer[0],
        firstName = addUserContainer[1],
        lastName = addUserContainer[2],
        email = addUserContainer[3]

    const [idLabel, idInput] = [id.querySelector('label')?.innerHTML, id.querySelector('input')?.outerHTML]
    expect(idLabel).toContain('ID')
    expect(idInput).toBeDefined()
    expect(idInput).toContain('disabled')

    const [firstNameLabel, firstNameInput] = [firstName.querySelector('label')?.innerHTML, firstName.querySelector('input')?.innerHTML]
    expect(firstNameLabel).toContain('First Name')
    expect(firstNameInput).toBeDefined()

    const [lastNameLabel, lastNameInput] = [lastName.querySelector('label')?.innerHTML, lastName.querySelector('input')?.innerHTML]
    expect(lastNameLabel).toContain('Last Name')
    expect(lastNameInput).toBeDefined()

    const [emailLabel, emailInput] = [email.querySelector('label')?.innerHTML, email.querySelector('input')?.innerHTML]
    expect(emailLabel).toContain('Email')
    expect(emailInput).toBeDefined()
})

test('save button in UserTable', () => {
    // Test to check if save button exists in table
    const wrapper = renderWithProviders(<UsersTable />, { preloadedState })
    const saveBtn = wrapper.container.querySelector('[class*=save-button] button')?.innerHTML

    expect(saveBtn).toContain('Save')
})

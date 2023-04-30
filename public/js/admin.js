const BASEURL = 'http://localhost:3030'
async function addStaff() {
    const btn = document.getElementById('add-staff')
    btn.innerHTML = 'Loading...'
    const regNo = document.getElementById('regNo').value
    const name = document.getElementById('name').value
    const department = document.getElementById('department').value
    const level = document.getElementById('level').value
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Add Staff'
        alert('Not Authorised!')
        return
    }
    const res = await fetch(`${BASEURL}/admin/add-staff?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({ regNo, name, department, level }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        console.log('Something went wrong')
        alert('Something went wrong')
        btn.innerHTML = 'Add Staff'
        return
    }
    const resData = await res.json()
    if (!resData.status) {
        btn.innerHTML = 'Add Staff'
        alert(resData.message)
        return
    }
    btn.innerHTML = 'Add Staff'
    alert(resData.message)


}

async function addDepartment() {
    const btn = document.getElementById('add-department')
    btn.innerHTML = 'Loading...'
    const code = document.getElementById('code').value
    const name = document.getElementById('name').value
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Add Department'
        alert('Not Authorised!')
        return
    }
    const res = await fetch(`${BASEURL}/admin/add-department?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({ name, code }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        console.log('Something went wrong')
        alert('Something went wrong')
        btn.innerHTML = 'Add Department'
        return
    }
    const resData = await res.json()
    if (!resData.status) {
        btn.innerHTML = 'Add Department'
        alert(resData.message)
        return
    }
    btn.innerHTML = 'Add Department'
    alert(resData.message)


}

async function addCourse() {
    const btn = document.getElementById('add-course')
    btn.innerHTML = 'Loading...'
    const code = document.getElementById('code').value
    const name = document.getElementById('name').value
    const department = document.getElementById('department-value').value
    const level = document.getElementById('level-value').value
    const semester = document.getElementById('semester-value').value
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Add Course'
        alert('Not Authorised!')
        return
    }
    const res = await fetch(`${BASEURL}/admin/add-course?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({ name, code, department, semester, level }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        console.log('Something went wrong')
        alert('Something went wrong')
        btn.innerHTML = 'Add Course'
        return
    }
    const resData = await res.json()
    if (!resData.status) {
        btn.innerHTML = 'Add Course'
        alert(resData.message)
        return
    }
    btn.innerHTML = 'Add Course'
    alert(resData.message)


}


async function getCourse() {
    const btn = document.getElementById('search')
    btn.innerHTML = 'Loading...'
    const department = document.getElementById('department').value
    const level = document.getElementById('level').value
    const semester = document.getElementById('semester').value
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Search'
        alert('Not Authorised!')
        return
    }
    const res = await fetch(`${BASEURL}/admin/get-courses?token=${token}&department=${department}&semester=${semester}&level=${level}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        btn.innerHTML = 'Search'
        return
    }
    const resData = await res.json()
    console.log(resData)
    addCoursesCard(resData.courses)
    btn.innerHTML = 'Search'

}

function addCoursesCard(courses) {
    const itemsDiv = document.getElementById('items')
    if (courses.length <= 0) {
        itemsDiv.innerHTML = `<h2 id="not-found">No Course Found!</h2>`
        return
    }
    const notFound = document.getElementById('not-found')
    if (notFound) notFound.remove()
    for (let course of courses) {
        const article = document.createElement('article')
        article.classList.add('card')
        article.classList.add('product-item')
        article.innerHTML = `<header class="card__header">
        <h1 class="product__title">
           Name: ${course.name}
        </h1>
    </header>
    <div class="card__content">
        <h2 class="product__price">
          Code: ${course.code} 
        </h2>
        <h2 class="product__price">
          Code: ${course.department.name} 
        </h2>
        <h2 class="product__price">
          Code: ${course.level.name} 
        </h2>
        <h2 class="product__price">
          Code: ${course.semester.name} 
        </h2>
    </div>
    <div class="card__actions">
        <a class="btn">Manage</a>
        <button class="btn" type="button" >Delete</button>
    </div>`
        itemsDiv.appendChild(article)
    }
}


function addErrorMessage(message, error) {
    let messageDiv = document.getElementsByClassName('user-message')
    const mainElement = document.getElementById('body')
    const form = document.getElementsByClassName('login-form')
    if (messageDiv[0]) {
        messageDiv[0].innerHTML = message
        mainElement.insertBefore(messageDiv, form[0])
        return
    }
    messageDiv = document.createElement('div')
    messageDiv.classList.add('user-message')
    if (error) {
        messageDiv.classList.add('user-message--error')
    }
    messageDiv.innerHTML = message
    mainElement.insertBefore(messageDiv, form[0])
}

function removeMessage() {
    let messageDiv = document.getElementsByClassName('user-message')
    if (messageDiv[0]) {
        messageDiv[0].remove()
    }
}
const BASEURL = 'http://localhost:3030'

let currentCourse = ''

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
          Name: ${course.department.name} 
        </h2>
        <h2 class="product__price">
          Level: ${course.level.name} 
        </h2>
        <h2 class="product__price">
          Semester: ${course.semester.name} 
        </h2>
    </div>
    <div class="card__actions">
        <button id="${course._id}" onclick="getAssignModal(this)" class="btn">Assign</button>
        <button id="${course._id}" onclick="getAddMaterialModal(this)" class="btn" type="button" >Add Material</button>
    </div>`
        itemsDiv.appendChild(article)
    }
}

function getAssignModal(assignBtn) {
    console.log(assignBtn.id)
    currentCourse = assignBtn.id
    const assignModal = document.getElementById('assign')
    const span = document.getElementsByClassName("close")[0];

    assignModal.style.display = 'block'

    span.onclick = function () {
        assignModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == assignModal) {
            assignModal.style.display = "none";
        }
    }
}

function getAddMaterialModal(materialBtn) {
    console.log(materialBtn.id, 'material')
    currentCourse = materialBtn.id
    const materialModal = document.getElementById('material')
    const span = document.getElementsByClassName("close")[0];

    materialModal.style.display = 'block'
    
    span.onclick = function () {
        materialModal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == materialModal) {
            materialModal.style.display = "none";
        }
    }
}


async function assignStaff() {
    const btn = document.getElementById('assign-staff')
    btn.innerHTML = 'Loading...'
    const staff = document.getElementById('staff-value').value
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Assign Staff'
        alert('Not Authorised!')
        return
    }
    const res = await fetch(`${BASEURL}/admin/assign-staff?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({staff, course: currentCourse }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok) {
        console.log('Something went wrong')
        alert('Something went wrong')
        btn.innerHTML = 'Assign Staff'
        return
    }
    const resData = await res.json()
    if (!resData.status) {
        btn.innerHTML = 'Assign Staff'
        alert(resData.message)
        return
    }
    btn.innerHTML = 'Assign Staff'
    alert(resData.message)


}

async function addMaterial() {
    const btn = document.getElementById('add-material')
    btn.innerHTML = 'Loading...'
    const files = document.getElementById('material-value')
    console.log(files.files)
    const token = localStorage.getItem('token')
    if (!token) {

        btn.innerHTML = 'Add Material'
        alert('Not Authorised!')
        return
    }
    const formData = new FormData()
    formData.append('file', files.files[0])
    formData.append('course', currentCourse)
    const res = await fetch(`${BASEURL}/admin/add-material?token=${token}`, {
        method: 'POST',
        body: formData,
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        // }
    })
    if (!res.ok) {
        console.log('Something went wrong')
        
        alert('Something went wrong')
        btn.innerHTML = 'Add Material'
        return
    }
    const resData = await res.json()
    if (!resData.status) {
        btn.innerHTML = 'Add Material'
        alert(resData.message)
        return
    }
    btn.innerHTML = 'Add Material'
    alert(resData.message)


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
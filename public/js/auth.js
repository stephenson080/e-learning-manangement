const BASEURL = 'http://localhost:3030'
async function login() {
    const btn = document.getElementsByClassName('btn')
    btn[0].innerHTML = 'Loading...'
    const regNo = document.getElementById('regNo').value
    const password = document.getElementById('password').value
    const res = await fetch(`${BASEURL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({regNo, password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!res.ok) {
        console.log('Something went wrong')
        addErrorMessage('Something went wrong', true)
        btn[0].innerHTML = 'Login'
        return
    }
    const resData = await res.json()
    if (!resData.user){
        addErrorMessage(resData.message, true)
        btn[0].innerHTML = 'Login'
        return
    }
    console.log(resData.user)
    removeMessage()
    btn[0].innerHTML = 'Login'
    localStorage.setItem('token', resData.token)
    localStorage.setItem('user', JSON.stringify(resData.user))
    if (resData.user.role === 'ADMIN'){
        location.replace(`/admin?token=${resData.token}`)
        return
    }
    if (resData.user.role === 'USER'){
        
        location.replace(`/user?token=${resData.token}&level=${resData.user.level._id}`)
        return
    }

    if (resData.user.role === 'STAFF'){
        console.log(resData.user._id)
        location.replace(`/staff?token=${resData.token}&level=${resData.user.level._id}&userId=${resData.user._id}`)
        return
    }
    
}


function addErrorMessage(message, error){
    let messageDiv = document.getElementsByClassName('user-message')
    const mainElement = document.getElementById('body')
    const form = document.getElementsByClassName('login-form')
    if (messageDiv[0]){
        messageDiv[0].innerHTML = message
        mainElement.insertBefore(messageDiv, form[0])
        return
    }
    messageDiv = document.createElement('div')    
    messageDiv.classList.add('user-message')
    if (error){
        messageDiv.classList.add('user-message--error')
    }
    messageDiv.innerHTML = message
    mainElement.insertBefore(messageDiv, form[0])
}

function removeMessage(){
    let messageDiv = document.getElementsByClassName('user-message')
    if (messageDiv[0]){
        messageDiv[0].remove()
    }
}
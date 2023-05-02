// const url = window.location.href;

// // Extract the domain name
// const domain = url.split(/[/?#]/)[0];

// // Get the root domain URL
// const rootDomain = domain.split('.').slice(-2).join('.');
// const BASEURL = 'http://localhost:3030'
const BASEURL = 'https://e-learning-manangement-production.up.railway.app'

let currentCourse = ''

function getAddMaterialModal(materialBtn) {
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

async function addMaterial() {
    const btn = document.getElementById('add-material')
    try {
        btn.innerHTML = 'Loading...'
        const files = document.getElementById('material-value')
        const token = localStorage.getItem('token')
        if (!token) {
    
            btn.innerHTML = 'Add Material'
            alert('Not Authorised!')
            return
        }
        const formData = new FormData()
        formData.append('file', files.files[0])
        formData.append('course', currentCourse)
        const res = await fetch(`${BASEURL}/staff/add-material?token=${token}`, {
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
    } catch (error) {
        btn.innerHTML = 'Add Material'
        alert('Something went wrong') 
    }


}
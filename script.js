const topnavDiv = document.getElementById("myTopnav")
const CSContainer = document.getElementById("cs-container")
const grades = {
    "Prelim": {
        "Class Standing": {

        }, "Exam": 0,
        "Grade": 0
    },
    "Midterm": {
        "Class Standing": {

        }, "Exam": 0,
        "Grade": 0
    },
    "Final": {
        "Class Standing": {

        }, "Exam": 0,
        "Grade": 0
    }
}
let currentPeriod = "Prelim"

const classStandingGrade = document.getElementById("class-standing-grade")
const majorExamGrade = document.getElementById("major-exam-grade")
const gradeText = document.getElementById("grade")

function updateGrade() {
    let CS = parseFloat(classStandingGrade.value) || 0
    let ME = parseFloat(majorExamGrade.value) || 0
    gradeText.innerText = "" + (CS/2 + ME/2)
}

setInterval(updateGrade, 500)

function gradePeriod(clickedNode) {    
    topnavDiv.childNodes.forEach((node) => {
        node.id = (node === clickedNode) ? "active" : "";
    })
    currentPeriod = clickedNode.innerHTML
}

function addCategory() {
    const factorDiv = document.createElement('div')
    factorDiv.className = "cs-factor"
    factorDiv.id = "cs-factor"
    const headerDiv = document.createElement('div')
    headerDiv.className = "cs-header"

    const spacer1 = document.createElement('div')
    spacer1.className = "spacer"
    const spacer2 = document.createElement('div')
    spacer2.className = "spacer"
    const spacer3 = document.createElement('div')
    spacer3.className = "spacer"

    const categoryName = document.createElement('input')
    categoryName.type = "text"
    categoryName.placeholder = "*Name*"

    const percentage = document.createElement('input')
    percentage.type = "text"
    percentage.id = "percentage"
    percentage.placeholder = "*Percentage*"

    const categoryGrade = document.createElement('input')
    categoryGrade.type = "text"
    categoryGrade.id = "category-grade"
    categoryGrade.placeholder = "*Grade*"

    const subCategoryButton = document.createElement('h3')
    subCategoryButton.innerText = "."
    subCategoryButton.className = "add-sub-category-button"
    subCategoryButton.addEventListener('click', addSubCategory)

    headerDiv.appendChild(categoryName)
    headerDiv.appendChild(spacer1)
    headerDiv.appendChild(percentage)
    headerDiv.appendChild(spacer2)
    headerDiv.appendChild(subCategoryButton)
    headerDiv.appendChild(spacer3)
    headerDiv.appendChild(categoryGrade)

    factorDiv.appendChild(headerDiv)
    CSContainer.appendChild(factorDiv)
}

function addSubCategory(node) {
    const parentNode = node.srcElement.parentNode.parentNode

    const headerDiv = document.createElement('div')
    headerDiv.className = "cs-factor-container"

    const spacer1 = document.createElement('div')
    spacer1.className = "spacer"

    const subCategoryName = document.createElement('input')
    subCategoryName.type = "text"
    subCategoryName.placeholder = "*Name*"

    const categoryGrade = document.createElement('input')
    categoryGrade.type = "text"
    categoryGrade.id = "sub-category-grade"
    categoryGrade.placeholder = "*Grade*"

    headerDiv.appendChild(subCategoryName)
    headerDiv.appendChild(spacer1)
    headerDiv.appendChild(categoryGrade)

    parentNode.appendChild(headerDiv)
}
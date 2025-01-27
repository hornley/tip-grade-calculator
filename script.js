const topnavDiv = document.getElementById("myTopnav")
const CSContainer = document.getElementById("cs-container")
const grades = {
    "Prelim": {
        "Class Standing": {
            "Grade": 0
        },
        "Exam": 0,
        "Grade": 0
    },
    "Midterm": {
        "Class Standing": {
            "Grade": 0
        },
        "Exam": 0,
        "Grade": 0
    },
    "Final": {
        "Class Standing": {
            "Grade": 0
        },
        "Exam": 0,
        "Grade": 0
    }
}
let currentPeriod = "Prelim"

const classStandingGrade = document.getElementById("class-standing-grade")
const majorExamGrade = document.getElementById("major-exam-grade")
const gradeText = document.getElementById("grade")

function updateGrade() {
    let total_cs_percentage = 0

    grades[currentPeriod]["Class Standing"] = {"Grade": 0}

    CSContainer.childNodes.forEach((node) => {
        if (node.className === "cs-factor") {
            const nodeName = node.firstChild.firstChild.value
            grades[currentPeriod]["Class Standing"][nodeName] = {"Percentage": 0, "Grade": 0}
            
            let grade = 0

            let factor_node_count = 1
            node.childNodes.forEach((factor_node) => { // The header for the factor "Quiz"
                if (factor_node.className === "cs-factor-container") { // Factor name/number "Quiz 1"
                    factor_node.firstChild.value = nodeName + "#" + factor_node_count
                    grades[currentPeriod]["Class Standing"][nodeName][factor_node.firstChild.value] = parseFloat(factor_node.lastChild.value) || 0
                    grade += parseFloat(factor_node.lastChild.value) || 0
                    factor_node_count++
                }
            })

            grades[currentPeriod]["Class Standing"][nodeName]["Percentage"] = parseFloat(node.firstChild.childNodes[2].value)
            grades[currentPeriod]["Class Standing"][nodeName]["Grade"] = grade / (Object.keys(grades[currentPeriod]["Class Standing"][nodeName]).length - 2)
            node.firstChild.lastChild.value = grades[currentPeriod]["Class Standing"][nodeName]["Grade"]
            total_cs_percentage += parseFloat(node.firstChild.childNodes[2].value) || 0
        }
    })
    if (0 >= total_cs_percentage <= 100) {
        grades[currentPeriod]["Class Standing"]["Grade"] = 0
        Object.keys(grades[currentPeriod]["Class Standing"]).forEach((factor) => {
            if (factor !== "Grade") {
                grades[currentPeriod]["Class Standing"]["Grade"] += grades[currentPeriod]["Class Standing"][factor]["Grade"] * grades[currentPeriod]["Class Standing"][factor]["Percentage"] / 100
            }
        })
        classStandingGrade.value = grades[currentPeriod]["Class Standing"]["Grade"]

        let CS = parseFloat(classStandingGrade.value) || 0
        let ME = parseFloat(majorExamGrade.value) || 0
        gradeText.innerText = "" + (CS/2 + ME/2)
    
        grades[currentPeriod]["Exam"] = ME
        grades[currentPeriod]["Grade"] = (currentPeriod === "Prelim") ? (CS/2 + ME/2) : 0
    }
}

setInterval(updateGrade, 500)

function loadPeriod() {
    Object.keys(grades[currentPeriod]["Class Standing"]).forEach((factor) => {
        if (factor !== "Grade") {
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
            categoryName.className = "category-name"
            categoryName.value = factor
            categoryName.type = "text"
            categoryName.placeholder = "*Name*"
        
            const percentage = document.createElement('input')
            percentage.type = "text"
            percentage.id = "percentage"
            percentage.className = "percentage"
            percentage.placeholder = "*Percentage*"
            percentage.value = grades[currentPeriod]["Class Standing"][factor]["Percentage"]
        
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

            let count = 1
            Object.keys(grades[currentPeriod]["Class Standing"][factor]).forEach((factor_node) => {
                if (factor_node !== "Percentage" && factor_node !== "Grade") {
                    const headerDiv = document.createElement('div')
                    headerDiv.className = "cs-factor-container"
    
                    const spacer1 = document.createElement('div')
                    spacer1.className = "spacer"
    
                    const subCategoryName = document.createElement('input')
                    subCategoryName.value = factor_node
                    subCategoryName.type = "text"
                    subCategoryName.placeholder = "*Name*"
    
                    const categoryGrade = document.createElement('input')
                    categoryGrade.value = grades[currentPeriod]["Class Standing"][factor][factor_node]
                    categoryGrade.type = "text"
                    categoryGrade.id = "sub-category-grade"
                    categoryGrade.placeholder = "*Grade*"
    
                    headerDiv.appendChild(subCategoryName)
                    headerDiv.appendChild(spacer1)
                    headerDiv.appendChild(categoryGrade)
    
                    factorDiv.appendChild(headerDiv)
                    count++
                }
            })

            CSContainer.appendChild(factorDiv)
        }
    })
}

function gradePeriod(clickedNode) {    
    topnavDiv.childNodes.forEach((node) => {
        node.id = (node === clickedNode) ? "active" : "";
    })
    grades[currentPeriod]["innerHTML"] = CSContainer.innerHTML
    currentPeriod = clickedNode.innerHTML
    CSContainer.innerHTML = ''
    loadPeriod()
    console.log(grades)
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
    categoryName.className = "category-name"
    categoryName.value = "CS-" + CSContainer.childNodes.length
    categoryName.type = "text"
    categoryName.placeholder = "*Name*"

    const percentage = document.createElement('input')
    percentage.type = "text"
    percentage.id = "percentage"
    percentage.className = "percentage"
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

    grades[currentPeriod]["Class Standing"]["CS-" + CSContainer.childNodes.length] = {}

    factorDiv.appendChild(headerDiv)
    CSContainer.appendChild(factorDiv)
}

function addSubCategory(node) {
    const parentNode = node.srcElement.parentNode.parentNode
    const percentage = parentNode.firstChild.childNodes[2].value
    
    if (percentage === "") {
        // alert("Fill enter a percentage first!")
        // return
    }

    grades[currentPeriod]["Class Standing"][parentNode.firstChild.firstChild.value]["Percentage"] = parseFloat(percentage)

    const headerDiv = document.createElement('div')
    headerDiv.className = "cs-factor-container"

    const spacer1 = document.createElement('div')
    spacer1.className = "spacer"

    const subCategoryName = document.createElement('input')
    subCategoryName.value = parentNode.firstChild.firstChild.value + "#" + parentNode.childNodes.length
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
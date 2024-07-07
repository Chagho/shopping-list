const closeBtn = document.querySelectorAll('.close-btn');
const addInput = document.querySelector('.add-input');
const submitBtn = document.querySelector('.submit-btn');
const listContainer = document.querySelector('.list-container');
const clearBtn = document.querySelector('.clear-btn');
const filterContainer = document.querySelector('.filter-container');
const filterInput = document.querySelector('.filter-input');
const itemText = document.querySelectorAll('.item-text');


listContainer.textContent = '';
listContainer.style.display = 'none';
filterContainer.style.display = 'none';


function removeItem(e) {
    const closeBtnElement = e.target.parentElement.parentElement;
    closeBtnElement.remove();

    if(listContainer.children.length === 0){
        
            listContainer.textContent = '';
            listContainer.style.display = 'none';
            filterContainer.style.display = 'none';

    }

}



function addItem(e) {
    const input = addInput.value;
    
        if(editMode) {
            null
        }else {
            if(input === '') {
                alert('Please Enter Something')
            } else {
                const itemCon = document.createElement('div');
                itemCon.classList.add('item-container')
            
                const containerP = document.createElement('p');
                containerP.classList.add('item-text');
                const textP = document.createTextNode(input);
                const closeIcon = document.createElement('button')
                closeIcon.classList.add('close-btn')
                closeIcon.innerHTML = "<i class='bx bx-x'></i>"
            
            
                containerP.appendChild(textP);
                itemCon.appendChild(containerP);
                itemCon.appendChild(closeIcon);
            
                closeIcon.addEventListener('click', removeItem);
            
                listContainer.style.display = 'flex';
                filterContainer.style.display = 'flex';
            
                listContainer.appendChild(itemCon);
                addInput.value = '';
            }
        }

          
    

        
    

}



function addEnter(e) {
    if(e.key === 'Enter'){
        addItem();
    }
}




function clearAll() {

    if(listContainer.textContent === ''){
        alert('List already empty!')
    }else {
        const sureness = confirm('Are you sure to delete all list ?');

        if(sureness){
            listContainer.textContent = '';
            listContainer.style.display = 'none';
            filterContainer.style.display = 'none';
            filterInput.value = '';
        }
    }
 
}


function filterItems(e) {
    const text = e.target.value.toLowerCase();
    const itemContainer = document.querySelectorAll('.item-container');
    itemContainer.forEach(item => {
        const itemName = item.querySelector('p').textContent.toLowerCase();
        
        if(itemName.includes(text)) {
            item.style.display = 'flex';
        }else {
            item.style.display = 'none';
        }
    })
}

listContainer.addEventListener('click', function(e) {
    console.log(e)
    if (e.target && e.target.matches('.item-text')) {
        editText(e);
    }
});


let editMode = false;
let currentText = null; 

function editText(e) {
    const text = e.target;
    const itemName = document.querySelectorAll('.item-text');
    
    itemName.forEach(item => {
        item.style.color = 'black';
    });

    text.style.color = 'gray';
    addInput.focus();
    addInput.value = text.textContent;

    editMode = true;
    currentText = text; 
    submitBtn.innerHTML = "<i class='bx bx-pencil'></i>Edit Item";
}

function submitItem() {
    if (editMode) {
        if (currentText) {
            currentText.textContent = addInput.value;
            currentText.style.color = 'black';
        }
        editMode = false;
        currentText = null;
        addInput.value = '';
        submitBtn.innerHTML = "<i class='bx bx-plus'></i>Add Item";
    }
}

    




itemText.forEach(item => {item.addEventListener('click',editText)})
filterInput.addEventListener('input',filterItems);
addInput.addEventListener('keydown',addEnter);
clearBtn.addEventListener('click',clearAll);
submitBtn.addEventListener('click', addItem);
submitBtn.addEventListener('click', submitItem);
closeBtn.forEach(btn => btn.addEventListener('click', removeItem));
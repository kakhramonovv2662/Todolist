// Elementlarni caqirvomiz
let elForm = findElement(document, '.js-form')
let elInput = findElement(elForm, '.js-input')
let elList = findElement(document, '.js-list')
let elCounter = findElement(document, '.js-counter')

let todoTamplate = findElement(document, '#todo-template').content

let localData = JSON.parse(localStorage.getItem('todos'))
//qiymatni bitta arrayga olib qoyvomiz
let allTodo = localData || [];

// idni bittaga owib boriwi uchun elon qib qoyvomiz
let i = localData?.at(-1).id || 0

// bu functioni vazifasi ocirib tawaw ucun
let deleteTodo = (id) => {

  // bu bizada allTodo kegan qiymatlarni filtrlab bervoti
  let deletedTodo = allTodo.filter((todo) => todo.id !== id)

  // tenglab qoygandan maqsad arrayni ichiga todolar qowilganda tozalab ketiwi ucun
  allTodo = deletedTodo

    localStorage.setItem('todos', JSON.stringify(allTodo))

  // counter delete boganda kamayvoti
  elCounter.textContent = allTodo.length

  // bu listni icidigi li larni tozalab bervoti
  elList.innerHTML = null
  // buyoda arrayni icidagi hamma qiymatni aylanib ciqmayapti
  // faqat deletedTodo icidagi qiymatlarni aylanb ciqvoti
  deletedTodo.forEach((todo) => {
    createTodoItem(todo)
  });
}

let complatedTodo = (id, checked) => {
  let foundIndex = allTodo.findIndex((todo) => todo.id === id)

  allTodo[foundIndex].isCompleted = checked

  // localStorage.setItem('todos', JSON.stringify(allTodo))
  localStorage.setItem('todos', JSON.stringify(allTodo))
} 

let eventDelegation = (evt) => {

  let todoId = evt.currentTarget.dataset.id - 0

  if (evt.target.matches('.js-delete-btn')) {
    deleteTodo(todoId)
  }

  if (evt.target.matches('.js-input')) {
    
    let elClosest = evt.target.closest('.form-check');
    let isChecked = evt.target.checked

    complatedTodo(todoId, isChecked)

    if (isChecked === true) {
      elClosest.classList.add('bg-dark')
    }else {
      elClosest.classList.remove('bg-dark')
    }
  }
}

let createTodoItem = (todo) => {
  // templateni ozidan clone ovoti
  let templateClone = todoTamplate.cloneNode(true)


  let elItem = findElement (templateClone, '.js-item')
  
  let inputWrapper = findElement (templateClone, '.form-check')

  let elCheckbox = findElement(templateClone, '.js-checkbox')
  // labelni ozini tanlavomiz
  let elLabel = findElement(templateClone, '.js-label')
  
  elItem.id = todo.id
  elLabel.htmlFor = todo.id
  //label textini inputdan kevotgan malumotga tenglab qoyvomiz
  elLabel.textContent = todo.text

  if (todo.isCompleted === true) {
    inputWrapper.style.backgroundColor = 'green'
    elCheckbox.checked = true
  } else {
    inputWrapper.style.backgroundColor = 'none';  
    elCheckbox.checked = false
  }

  // btni oziga id qowib qoyvomiz, tanlavolish ucun
  elItem.dataset.id = todo.id

  // elDeleteBtn.addEventListener('click', deleteTodo)
  elItem.addEventListener('click', eventDelegation)
  //itemlarni ulga birlawtirvomiz
  elList.appendChild(templateClone)
}

// Formlarimiz abnavleniya bob ketmasligi uchun functionga qoyb ketvomiz
let handleSubmit = (evt) => {
  evt.preventDefault()

  //bizaga kevotgan malumotlarni objectga aylantrvomiz
  let newTodo = {
    // idni qiymati bittaga owib borvoti
    id: ++i,
    // objectni textiga inputdan keladgan qiymatni tenglawtrb qoydik
    text: elInput.value,
    isCompleted: false,
  }

  //har bitta objectni arrayga push qivomiz
  allTodo.push(newTodo)

  // allTodolar qowilganda qancha qowildi, wuni ifodalab beradi
  elCounter.textContent = allTodo.length

  // bu listni icidigi li larni tozalab bervoti
  elList.innerHTML = null

  // arrayni aylanb chiqiw ucun
  allTodo.forEach((todo) => {
    createTodoItem(todo)
  });

  localStorage.setItem('todos', JSON.stringify(allTodo))
  console.log(allTodo);
  elInput.value = null
}

// formni submit holatiga quloq sovomiz
elForm.addEventListener('submit', handleSubmit)

allTodo.forEach((todo) => {
  createTodoItem(todo)
})
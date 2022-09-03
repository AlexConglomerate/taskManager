const tasks = [
    {
        id: "1138465078061",
        completed: false,
        text: "Проснуться"
    },
    {
        id: "1138465078062",
        completed: false,
        text: "Принять душ"
    },
    {
        id: "1138465078063",
        completed: false,
        text: "Завоевать мир!"
    }
];

const createTaskItem = (taskId, taskText) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.dataset.taskId = taskId;

    const taskItemMainContainer = document.createElement("div");
    taskItemMainContainer.className = "task-item__main-container";

    const taskItemMainContent = document.createElement("div");
    taskItemMainContent.className = "task-item__main-content";

    taskItem.append(taskItemMainContainer);
    taskItemMainContainer.append(taskItemMainContent);

    const checkboxForm = document.createElement("form");
    checkboxForm.className = "checkbox-form";

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.className = "checkbox-form__checkbox";
    const inputId = `task-${taskId}`;
    inputCheckbox.id = inputId;

    const labelCheckbox = document.createElement("label");
    labelCheckbox.htmlFor = inputId;

    const taskItemText = document.createElement("span");
    taskItemText.className = "task-item__text";
    taskItemText.innerText = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.className =
        "task-item__delete-button default-button delete-button";
    deleteButton.innerText = "Удалить";

    taskItemMainContent.append(checkboxForm, taskItemText);
    checkboxForm.append(inputCheckbox, labelCheckbox);
    taskItemMainContainer.append(deleteButton);

    return taskItem;
};

const createErrorBlock = (errorMessage) => {
    const errorBlock = document.createElement("span");
    errorBlock.innerText = errorMessage;
    errorBlock.className = "error-message-block";
    return errorBlock;
};

const createTaskForm = document.querySelector(".create-task-block");
createTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newTaskText = (event.target.taskName.value || "").trim();
    const isTaskExists = tasks.some((task) => task.text === newTaskText);
    const errorMessageBlockFromDOM = createTaskForm.querySelector(
        ".error-message-block"
    );

    if (!newTaskText) {
        const errorBlock = createErrorBlock(
            "Название задачи не должно быть пустым"
        );
        createTaskForm.append(errorBlock);
    } else if (isTaskExists) {
        const errorBlock = createErrorBlock(
            "Задача с таким названием уже существует."
        );
        createTaskForm.append(errorBlock);
    } else if (newTaskText && !isTaskExists) {
        const newTask = {
            id: Date.now().toString(),
            text: newTaskText
        };
        tasks.push(newTask);
        const taskItem = createTaskItem(newTask.id, newTask.text);
        tasksListContainer.append(taskItem);
    }
    if (errorMessageBlockFromDOM) {
        errorMessageBlockFromDOM.remove();
    }
});

const tasksListContainer = document.querySelector(".tasks-list");
tasks.forEach((task) => {
    const taskItem = createTaskItem(task.id, task.text);
    tasksListContainer.append(taskItem);
});


let overlay = document.querySelector('#overlay')
let idToDelete

// if pressed on button "Delete"
document.querySelector('.tasks-list').addEventListener('click', event => {
    idToDelete = event.path[2].getAttribute("data-task-id")
    if (event.target.className == 'task-item__delete-button default-button delete-button') {
        overlay.className = "modal-overlay"
    }
})

// if pressed on button "Cancel"
document.querySelector('.delete-modal__cancel-button').addEventListener('click', event => {
    overlay.className = "modal-overlay_hidden"
})

// if pressed on button "Delete" in modal overlay
document.querySelector('.delete-modal__button.delete-modal__confirm-button').addEventListener('click', event => {
    overlay.className = "modal-overlay_hidden"
    let a = document.querySelectorAll('.task-item')
    a.forEach(item => {
        if (item.getAttribute("data-task-id") == idToDelete) item.remove()
    })
})

// — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —
// This 6 task

function changeTheme() {

    let objTheme = {
        body: {
            dark: '#24292E',
            white: 'initial',
        },
        tasks: {
            dark: '#ffffff',
            white: 'initial',
        },
        buttons: {
            dark: '1px solid #ffffff',
            white: 'none',
        },
    }

    let bodyStyle = document.body.style
    let theme = bodyStyle.background == 'initial' ? 'dark' : 'white'

    // change body theme
    bodyStyle.background = objTheme.body[theme]

    // change task theme
    document.querySelectorAll('.task-item').forEach(item => {
        item.style.color = objTheme.tasks[theme]
    })

    // change buttons theme
    document.querySelectorAll('button').forEach(item => {
        item.style.border = objTheme.buttons[theme]
    })
}

document.addEventListener("keydown", (event) => {
    if (event.key == 'Tab') {
        changeTheme()
    }
})
// Issue block open/close content

const dropdownBlocks = document.querySelectorAll('.dropdown-block');
const openedBlockContentSelector = 'dropdown-block__content_opened';

dropdownBlocks.forEach(dropdownBlock => {
  dropdownBlock.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('dropdown-block__button')) {
      evt.stopPropagation();
      const dropdownButton = dropdownBlock.querySelector('.dropdown-block__button');
      const dropdownContent = dropdownBlock.querySelector('.dropdown-block__content')

      if (dropdownContent.classList.contains(openedBlockContentSelector)) {
        dropdownContent.classList.remove(openedBlockContentSelector);
        dropdownButton.classList.remove('dropdown-block__button_opened');
      } else {
        dropdownContent.classList.add(openedBlockContentSelector);
        dropdownButton.classList.add('dropdown-block__button_opened');
      }
    }
  });
});

// Open all issue blocks
const dropdownBlocksButtons = document.querySelectorAll('.dropdown-block__button');

dropdownBlocksButtons.forEach(dropdownBlocksButton => {
  dropdownBlocksButton.click();
});

// Navigate through tabs
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('tab__link')) {
      evt.stopPropagation();
      
      const tabContentBlocks = tab.querySelectorAll('.tab__content');
      const tabLinks = tab.querySelectorAll('.tab__link');
      const currentTabId = evt.target.id;

      for (let i = 0; i < tabContentBlocks.length; i++) {
        tabContentBlocks[i].style.display = 'none';
      }
    
      for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(' tab__link_active', '');
      }
    
      tab.querySelector(`#tab-content-${currentTabId}`).style.display = 'block';
      evt.target.className += ' tab__link_active'; 
    }
  });

  // Get the first tab link and click on it
  tab.querySelector('.tab__link').click();
});


// Render progress for each progress meter

const progressMeters = document.querySelectorAll(".progress__meter");

progressMeters.forEach((progressMeter) => {
  const progressBar = progressMeter.querySelector("span");

  progressBar.style.width = `${progressBar.getAttribute("data-progress")}%`;
});

// Todo list
// Add todo to a list, update counter
const todoElement = document.querySelector('.todo');
const todoListItemTemplate = document.querySelector("#todo-list-item").content;
const todoFormElement = todoElement.querySelector('.todo__form');
const todoInputElement = todoFormElement.querySelector('.todo__input');
const todoListElement = todoElement.querySelector(".todo__list");
const todoTotalCounterElement = todoElement.querySelector('#todo-total-counter');
let todoTotalCounter = 0;

todoFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const todoListItemElement = todoListItemTemplate.querySelector(".todo__list-item").cloneNode(true);
  todoListItemElement.textContent = todoInputElement.value;
  todoListElement.append(todoListItemElement);

  todoTotalCounter++;
  todoTotalCounterElement.textContent = todoTotalCounter;

  todoFormElement.reset();
});

// Attach files
const dropZone = document.getElementById('drop-zone');
const attachmentListElement = document.querySelector('.attachments');
const attachmentItemTemplate = document.querySelector("#attachment-template").content;
const attachmentItemSelector = ".attachment";

function createAttachment(reader, file) {
  const attachmentElement = attachmentItemTemplate.querySelector(attachmentItemSelector).cloneNode(true);
  const thumbnailElement = attachmentElement.querySelector(".attachment__thumb");
  const titleElement = attachmentElement.querySelector(".attachment__title");
  const dateElement = attachmentElement.querySelector(".attachment__date");
  const sizeElement = attachmentElement.querySelector(".attachment__size");
  
  thumbnailElement.src = reader.result;
  thumbnailElement.alt = file.name;
  titleElement.textContent = file.name;
  dateElement.textContent = getFormattedDate();
  sizeElement.textContent = `${Math.floor(file.size / 100)} kB`;
  
  return attachmentElement;
}

function handleFile(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onerror = () => {
    console.error('Error reading file:', file.name);
  };

  reader.onload = () => {
    const newAttachment = createAttachment(reader, file);
    attachmentListElement.appendChild(newAttachment);
  };
}

function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear().toString().substring(2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = (now.getHours() % 12).toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
  return `${day}/${month}/${year} ${hours}:${minutes} ${amPm}`;
}

// Delete attachment
function handleAttachmentDelete(evt) {
  const attachmentElement = evt.target.closest('.attachment');
  attachmentElement.remove();
}

// Drag and drop files
function dropHandler(evt) {
  evt.preventDefault();

  if (evt.dataTransfer.items) {
    for (const item of evt.dataTransfer.items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        handleFile(file);
      }
    };
  } else {
    [...evt.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(evt) {
  evt.preventDefault();
};

// Browse and attach files
const fileInput = document.querySelector("#drop-zone-input");

fileInput.addEventListener('change', function(evt) {
  const files = evt.target.files;

  for (const file of files) {
    handleFile(file); 
  }
});

// Modal
function closeStructureSettingsHandler() {
  const structureSettingsToggle = document.querySelector("input[id=structure-settings]");
  structureSettingsToggle.checked = false;
};

// Disable auto switch options when the toggle is off
const structureSettingsModal = document.querySelector('#structure-settings-modal');
const autoSwitchToggle = structureSettingsModal.querySelector('#structure-settings-auto-switch-toggle');
const autoSwitchOptions = structureSettingsModal.querySelectorAll('input[name="auto-switch-type"]');

autoSwitchToggle.addEventListener('change', function(evt) {
  if (autoSwitchToggle.checked) {
    for (const option of autoSwitchOptions) {
      option.disabled = false;
    }
  } else {
    for (const option of autoSwitchOptions) {
      option.disabled = true;
    }
  };
});
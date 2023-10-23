// Navigation menu
const sideNavButton = document.querySelector('.sidebar__nav-button')
const sideMenu = document.querySelector('.side-menu')
const sideMenuContainer = sideMenu.querySelector('.side-menu__container')
const openedNavButtonClass = 'sidebar__nav-button_opened'
const openedSideMenuClass = 'side-menu_opened'
const openedSideMenuContainerClass = 'side-menu__container_opened'

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup()
        closeSideMenu()
    }
}

function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup()
    }

    if (evt.target.classList.contains('side-menu')) {
        closeSideMenu()
    }
}

const openSideMenu = function() {
    sideMenu.classList.add(openedSideMenuClass)
    sideMenuContainer.classList.add(openedSideMenuContainerClass)
    sideNavButton.classList.add(openedNavButtonClass)
    document.addEventListener('keydown', handleEscClose)
    sideMenu.addEventListener('mousedown', handleOverlayClose)
}

// TODO: close menu with ESC/overlay click
const closeSideMenu = function() {
    sideMenu.classList.remove(openedSideMenuClass)
    sideMenuContainer.classList.remove(openedSideMenuContainerClass)
    sideNavButton.classList.remove(openedNavButtonClass)
    document.removeEventListener('keydown', handleEscClose)
    sideMenu.removeEventListener('mousedown', handleOverlayClose)
}

sideNavButton.addEventListener('click', function() {
    const sideMenuIsOpen = sideNavButton.classList.contains(openedNavButtonClass)

    if (sideMenuIsOpen) {
        closeSideMenu()
    } else {
        openSideMenu()
    }
})

// Open/close image popup
const expandableImages = document.querySelectorAll('.image_expandable')
const popup = document.querySelector('.popup')
const openedPopupClass = 'popup_opened'
const popupImageSelector = '.popup__image'
const popupImageCaptionSelector = '.popup__image-caption'
const popupCloseButtonSelector = '.popup__close-button'

const openPopup = function() {
    popup.classList.add(openedPopupClass)
    document.addEventListener('keydown', handleEscClose)
    popup.addEventListener('mousedown', handleOverlayClose)
}

const closePopup = function() {
    popup.classList.remove(openedPopupClass)
    document.removeEventListener('keydown', handleEscClose)
    popup.removeEventListener('mousedown', handleOverlayClose)
}

expandableImages.forEach(image => {
    image.addEventListener('click', function(evt) {
        const popupImage = popup.querySelector(popupImageSelector)
        const popupImageCaption = popup.querySelector(popupImageCaptionSelector)
        const popupCloseButton = popup.querySelector(popupCloseButtonSelector)

        popupImage.src = `${evt.target.src}`
        popupImage.alt = `${evt.target.alt}`
        popupImageCaption.textContent = `${evt.target.alt}`

        popupCloseButton.addEventListener('click', () => closePopup())

        openPopup()
    })
})

// Resizer 
if (document.querySelector('.resizer')) {
    const theorySection = document.querySelector('.theory')
    const trainerSection = document.querySelector('.trainer')
    const resizer = document.querySelector('.resizer')

    let isResizing = false

    resizer.addEventListener('mousedown', startResize)
    window.addEventListener('mouseup', stopResize)
    window.addEventListener('mousemove', resize)

    function startResize(evt) {
        isResizing = true
        document.body.style.cursor = 'ew-resize'
    }

    function stopResize(evt) {
        isResizing = false
        document.body.style.cursor = 'auto'
    }

    function resize(evt) {
        if (!isResizing) return

        const onboardingWidth = window.innerWidth - 156

        const mouseX = evt.pageX

        const theorySectionWidth = mouseX - theorySection.getBoundingClientRect().left

        theorySection.style.width = `${theorySectionWidth}px`
        trainerSection.style.width = `${onboardingWidth - theorySectionWidth}px`
    }
}


// Trainer description panel
const trainerDescriptions = {
    header: {
        title: 'This is issue header',
        text: 'In this section, you\'ll find a brief overview of the issue header, including its intent and functionality.',
    },
    controls: {
        title: 'This is issue controls',
        text: 'In this section, you\'ll find a brief overview of the issue controls, including its intent and functionality.',
        accentGroup: 'controls-accent',
    },
    details: {
        title: 'This is issue details',
        text: 'In this section, you\'ll find a brief overview of the issue details block, including its intent and functionality.',
        accentGroup: 'details-accent',
    },
    people: {
        title: 'This is issue people',
        text: 'In this section, you\'ll find a brief overview of the issue people section, including its intent and functionality.',
        accentGroup: 'people-accent',
    },
}


function onImageInfoButtonClick(id) {
    const trainerDescriptionPanel = document.querySelector('.trainer__description-panel')
    trainerDescriptionPanel.innerHTML = ''

    const trainerDescriptionTemplate = document.querySelector('#trainer-description-template').content
    const trainerDescriptionElement = trainerDescriptionTemplate.querySelector('.trainer__description-wrapper').cloneNode(true)
    const trainerDescriptionTitleElement = trainerDescriptionElement.querySelector('.theory__subtitle')
    const trainerDescriptionParagraphElement = trainerDescriptionElement.querySelector('.paragraph')

    // Ugly hardcode 
    switch (id) {
        case 'header-description':
            trainerDescriptionTitleElement.textContent = trainerDescriptions.header.title
            trainerDescriptionParagraphElement.textContent = trainerDescriptions.header.text
            break
        case 'controls-description':
            trainerDescriptionTitleElement.textContent = trainerDescriptions.controls.title
            trainerDescriptionParagraphElement.textContent = trainerDescriptions.controls.text
            trainerDescriptionTitleElement.classList.add(trainerDescriptions.controls.accentGroup)
            break
        case 'details-description':
            trainerDescriptionTitleElement.textContent = trainerDescriptions.details.title
            trainerDescriptionParagraphElement.textContent = trainerDescriptions.details.text
            trainerDescriptionTitleElement.classList.add(trainerDescriptions.details.accentGroup)
            break
        case 'details-people':
            trainerDescriptionTitleElement.textContent = trainerDescriptions.people.title
            trainerDescriptionParagraphElement.textContent = trainerDescriptions.people.text
            trainerDescriptionTitleElement.classList.add(trainerDescriptions.people.accentGroup)
            break
        default:
            trainerDescriptionParagraphElement.textContent = 'Elements description will pop up here 👇'
      }

    trainerDescriptionPanel.append(trainerDescriptionElement)
}

// Editable Text Elements
const editableTextButtons = document.querySelectorAll('.editable-text__edit-button')

if (editableTextButtons.length > 0) {
    const editableTextInputTemplate = document.querySelector('#editable-text-input-template').content
    const editableTextInputWrapperSelector = '.editable-text__input-wrapper'

    editableTextButtons.forEach(button => {
        button.addEventListener('click', enableEditing)
    })

    function enableEditing(evt) {
        const originalElement = evt.target.parentNode
        const originalElementClassName = originalElement.classList[0]
        const originalElementTextContent = originalElement.textContent

        const inputWrapper = editableTextInputTemplate.querySelector(editableTextInputWrapperSelector).cloneNode(true)
        const input = inputWrapper.querySelector('.editable-text__input')
        const inputSubmitButton = inputWrapper.querySelector('.editable-text__submit-button')
        const inputCancelButton = inputWrapper.querySelector('.editable-text__cancel-button')

        input.classList.add(originalElementClassName)
        input.value = originalElement.textContent.trim()

        originalElement.parentNode.replaceChild(inputWrapper, originalElement)

        input.focus()

        inputSubmitButton.addEventListener('click', () => saveChanges(input.value, originalElementClassName))
        inputCancelButton.addEventListener('click', () => saveChanges(originalElementTextContent, originalElementClassName))
    }

    function saveChanges(newTextContent, originalElementClassName) {
        if (!newTextContent) {
            alert('Field cannot be empty')
        } else {
            const inputWrapper = document.querySelector('.editable-text__input-wrapper')

            const newTextElement = document.createElement('p')
            newTextElement.classList.add(originalElementClassName, 'editable-text')
            newTextElement.textContent = newTextContent
        
            const newEditableTextButton = document.createElement('span')
            newEditableTextButton.classList.add('editable-text__edit-button')
            newTextElement.append(newEditableTextButton)
        
            inputWrapper.parentNode.replaceChild(newTextElement, inputWrapper)

            newEditableTextButton.addEventListener('click', enableEditing)
        }
    }
}

// Chat Bot
const chatBotToggle = document.querySelector('.chat-bot-toggle')
const chatBot = document.querySelector('.chat-bot')
const chat = chatBot.querySelector('.chat-bot__body')
const openedChatBotToggleClass = 'chat-bot-toggle_opened'
const openedChatBotClass = 'chat-bot_opened'

const chatBotAgentMessageGroupTemplate = document.querySelector('#chat-bot-agent-message').content
const chatBotOptionsTemplate = document.querySelector('#chat-bot-options').content
const chatBotUserMessageGroupTemplate = document.querySelector('#chat-bot-user-message').content

const workWorkAudio = document.querySelector('#work-work')
const iCanDoThatAudio = document.querySelector('#i-can-do-that')
const meBusyAudio = document.querySelector('#me-busy')
const ughAudio = document.querySelector('#ugh')
const workCompleteAudio = document.querySelector('#work-complete')

function toggleChatBot() {
    const chatBotIsOpen = chatBotToggle.classList.contains(openedChatBotToggleClass)

    if (!chatBotIsOpen) {
        showChatBot()
    } else {
        hideChatBot()
    }
}

function createAgentMessage(text) {
    const chatBotAgentMessageGroup = chatBotAgentMessageGroupTemplate.querySelector('.chat-bot__message-group').cloneNode(true)
    const message = chatBotAgentMessageGroup.querySelector('.chat-bot__message')
    message.textContent = text

    chat.append(chatBotAgentMessageGroup)
    showOptionsMenu()
    scrollChatToBottom()
}

function createUserMessage(text) {
    const chatBotUserMessageGroup = chatBotUserMessageGroupTemplate.querySelector('.chat-bot__message-group').cloneNode(true)
    const message = chatBotUserMessageGroup.querySelector('.chat-bot__message')
    message.classList.add('label')
    message.textContent = text

    return chatBotUserMessageGroup
}

function showOptionsMenu() {
    const chatBotOptions = chatBotOptionsTemplate.querySelector('.chat-bot__message-group').cloneNode(true)
    const chatBotSupportButton = chatBotOptions.querySelector('#chat-bot-support')
    const chatBotHelpButton = chatBotOptions.querySelector('#chat-bot-help')
    const chatBotFaqButton = chatBotOptions.querySelector('#chat-bot-faq')

    chatBotSupportButton.addEventListener('click', function() {
        handleOptionButtonClick(
            'Support',
            'I can certainly connect you with a human, but I am much more intelligent!',
            iCanDoThatAudio,
        )
    })

    chatBotHelpButton.addEventListener('click', function() {
        handleOptionButtonClick(
            'Help',
            'Me busy, leave me alone!',
            meBusyAudio,
        )
    })

    chatBotFaqButton.addEventListener('click', function() {
        handleOptionButtonClick(
            'FAQ',
            'FAQ? Me no know, me just here to have fun!',
            ughAudio,
        )
    })

    chat.append(chatBotOptions)
    scrollChatToBottom()
}

function handleOptionButtonClick(userMessageText, agentMessageText, audioElement) {
    const currentElement = chat.lastElementChild
    const newElement = createUserMessage(userMessageText)

    chat.replaceChild(newElement, currentElement)

    createAgentMessage(agentMessageText)
    audioElement.play()
}

function showChatBot() {
    createAgentMessage('What do you want?')
    workWorkAudio.play()
    chatBotToggle.classList.add(openedChatBotToggleClass)
    chatBot.classList.add(openedChatBotClass)
}

function hideChatBot() {
    chat.innerHTML = ''
    workCompleteAudio.play()
    chatBotToggle.classList.remove(openedChatBotToggleClass)
    chatBot.classList.remove(openedChatBotClass)
}

function scrollChatToBottom() {
    chat.scrollTop = chat.scrollHeight
}

chatBotToggle.addEventListener('click', toggleChatBot)

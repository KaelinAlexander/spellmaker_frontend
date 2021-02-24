class Spell {

    static all = [];
    static editedSpellId = null;


constructor(id, name, process, intention, description, components) {
    this.id = id;
    this.name = name;
    this.process = process;
    this.intention = intention;
    this.description = description;
    this.components = components
}

display() {

    const innerDiv = document.createElement('div')
    innerDiv.id = this.id
    innerDiv.classList.add("col", "s6")
    const cardDiv = document.createElement('div')
    cardDiv.classList.add("card", "medium")
    const cardImageDiv = document.createElement('div')
    cardImageDiv.classList.add("card-image", "waves-effect", "waves-block", "waves-light")
    cardImageDiv.innerHTML = `<img class="activator" src="images/processes/${this.process}.jpg">`
    const cardContent = document.createElement('div')
    cardContent.classList.add("card-content")
    const cardNameSpan = document.createElement('span')
    cardNameSpan.classList.add("card-title", "activator", "grey-text", "text-darken-4")
    const activatorIcon = document.createElement('i')
    activatorIcon.classList.add("material-icons", "right")
    activatorIcon.innerText = "more_vert"

    const pProcess = document.createElement('p')
    const pIntention = document.createElement('p')

    const componentList = document.createElement('ul')
    const componentSelectorForm = document.createElement('form')
    componentSelectorForm.classList.add("component-selector-form")
    const componentSelectorDropDown = loadComponentSelectors();

    const componentAddSubmit = document.createElement('button')
    componentAddSubmit.innerText = "Add Component"
    componentAddSubmit.id = this.id
    componentAddSubmit.addEventListener('click', Spell.addComponent)
    
    const editIcon = document.createElement('i')
    editIcon.classList.add("material-icons", "right")
    editIcon.id = this.id
    editIcon.innerText = "edit"
    editIcon.addEventListener('click', Spell.editSpell)

    const deleteIcon = document.createElement('i')
    deleteIcon.classList.add("material-icons", "right")
    deleteIcon.id = this.id
    deleteIcon.innerText = "delete"
    deleteIcon.addEventListener('click', Spell.deleteSpell)

    const cardRevealDiv = document.createElement('div')
    cardRevealDiv.classList.add("card-reveal")

    const spanName = document.createElement('span')
    spanName.classList.add("card-title", "grey-text", "text-darken-4")

    const pDescription = document.createElement('p')


    cardNameSpan.innerText = this.name
    spanName.innerText = this.name

    pProcess.innerText = this.process
    pIntention.innerText = this.intention
    pDescription.innerText = this.description

    this.components.forEach(spellcomponent => {
        const componentItem = document.createElement('li')    
        componentItem.innerText = `${spellcomponent.name}   `
        componentItem.id = spellcomponent.id
        componentItem.classList.add("component-li")
    
        const componentRemove = document.createElement('i')
        componentRemove.classList.add("material-icons")
        componentRemove.id = spellcomponent.id
    
        componentRemove.innerText = "clear"
        componentRemove.addEventListener('click', Spell.removeComponent)
    
        componentItem.append(componentRemove)
    
        componentList.appendChild(componentItem)
    })

        innerDiv.appendChild(cardDiv)
            cardDiv.appendChild(cardImageDiv)
            cardDiv.appendChild(cardContent)
                cardContent.appendChild(cardNameSpan)
                cardContent.appendChild(pProcess)
                cardContent.appendChild(pIntention)
                cardContent.appendChild(editIcon)
                cardContent.appendChild(deleteIcon)
            cardDiv.appendChild(cardRevealDiv)
            cardRevealDiv.appendChild(spanName)
            cardRevealDiv.appendChild(componentList)
            cardRevealDiv.appendChild(pDescription)
            cardRevealDiv.appendChild(componentSelectorForm)
            componentSelectorForm.appendChild(componentSelectorDropDown)
            componentSelectorForm.appendChild(componentAddSubmit)

    spellList().appendChild(innerDiv)
}

displayOld () {
    const div = document.createElement('div');
    const h4 = document.createElement('h4');
    const h5process = document.createElement('h5');
    const h5intention = document.createElement('h5');
    const p = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const componentList = document.createElement('ul')
    const componentSelectorForm = document.createElement('form')
    componentSelectorForm.classList.add("component-selector-form")
    const componentSelectorDropDown = loadComponentSelectors();
    const componentAddSubmit = document.createElement('button')

// Build out delete and edit functions here.

h4.innerText = this.name
h5process.innerText = this.process
h5intention.innerText = this.intention
p.innerText = this.description
div.id = this.id

editButton.innerText = "Edit"
editButton.id = this.id
editButton.addEventListener('click', Spell.editSpell)

deleteButton.innerText = "Delete"
deleteButton.id = this.id
deleteButton.addEventListener('click', Spell.deleteSpell)

componentAddSubmit.innerText = "Add Component"
componentAddSubmit.id = this.id
componentAddSubmit.addEventListener('click', Spell.addComponent)

this.components.forEach(spellcomponent => {
    const componentItem = document.createElement('li')    
    componentItem.innerText = `${spellcomponent.name}   `
    componentItem.id = spellcomponent.id
    componentItem.classList.add("component-li")

    const componentRemove = document.createElement('i')
    componentRemove.classList.add("material-icons")
    componentRemove.id = spellcomponent.id

    componentRemove.innerText = "clear"
    componentRemove.addEventListener('click', Spell.removeComponent)

    componentItem.append(componentRemove)

    componentList.appendChild(componentItem)
})

div.appendChild(h4)
div.appendChild(h5process)
div.appendChild(h5intention)
div.appendChild(p)
div.appendChild(componentList)
div.appendChild(editButton)
div.appendChild(deleteButton)
div.appendChild(componentSelectorForm)

componentSelectorForm.appendChild(componentSelectorDropDown)
componentSelectorForm.appendChild(componentAddSubmit)

// loadComponentSelectors(componentSelectorDropDown)

spellList().appendChild(div)

}

static createSpells(spellsData) {
    spellsData.forEach(spell => Spell.create(spell.id, spell.name, spell.process, spell.intention, spell.description, spell.components))
}

static create(id, name, process, intention, description, components) {
    let spell = new Spell(id, name, process, intention, description, components);

    Spell.all.push(spell);

    return spell;
}

static displaySpells() {
    spellList().innerHTML = '';
    Spell.all.forEach(spell => {
        spell.display()
    })
}

static createFromForm(e) {
    e.preventDefault();

    if (editingSpell && Spell.validateForm() == true ) {
        Spell.updateSpell()
    } else if (Spell.validateForm() == true ) {
        const strongParams = {
            spell: {
                name: spellName().value,
                process: spellProcess().value,
                intention: spellIntention().value,
                description: spellDescription().value,
            }
        }
        fetch(baseUrl + '/spells.json', {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let spell = Spell.create(data.id, data.name, data.process, data.intention, data.description, data.components);
            spell.display();
        })
        .catch(function(error) {
            alert("Sometimes things go bad just because.");
            alert(error);
        })

        resetInputs();
    }
}

static editSpell() {
    editingSpell = true;
    const spellToEdit = Spell.all.find(spell => spell.id == this.id)

    spellName().value = spellToEdit.name
    spellDescription().value = spellToEdit.description

    M.updateTextFields();

    spellProcess().innerHTML = 
    `
    <option value="" disabled>--Choose a Process--</option>
    <option value="Charm" ${ spellToEdit.process == "Charm" ? 'selected' : ''}>Charm</option>
    <option value="Infusion" ${ spellToEdit.process == "Infusion" ? 'selected' : ''}>Infusion</option>
    <option value="Bath" ${ spellToEdit.process == "Bath" ? 'selected' : ''}>Bath</option>
    <option value="Ointment" ${ spellToEdit.process == "Ointment" ? 'selected' : ''}>Ointment</option>
    <option value="Incense" ${ spellToEdit.process == "Incense" ? 'selected' : ''}>Incense</option>
    `
    $('select').formSelect();

    spellIntention().innerHTML =
    `
    <option value="">--Choose an Intention--</option>
    <option value="Clairvoyance" ${ spellToEdit.intention == "Clairvoyance" ? 'selected' : ''}>Clairvoyance</option>
    <option value="Exorcism" ${ spellToEdit.intention == "Exorcism" ? 'selected' : ''}>Exorcism</option>
    <option value="Fertility" ${ spellToEdit.intention == "Fertility" ? 'selected' : ''}>Fertility</option>
    <option value="Fidelity" ${ spellToEdit.intention == "Fidelity" ? 'selected' : ''}>Fidelity</option>
    <option value="Healing" ${ spellToEdit.intention == "Healing" ? 'selected' : ''}>Healing</option>
    <option value="Hex Breaking" ${ spellToEdit.intention == "Hex Breaking" ? 'selected' : ''}>Hex Breaking</option>
    <option value="Love" ${ spellToEdit.intention == "Love" ? 'selected' : ''}>Love</option>
    <option value="Luck" ${ spellToEdit.intention == "Luck" ? 'selected' : ''}>Luck</option>
    <option value="Lust" ${ spellToEdit.intention == "Lust" ? 'selected' : ''}>Lust</option>
    <option value="Money" ${ spellToEdit.intention == "Money" ? 'selected' : ''}>Money</option>
    <option value="Mood" ${ spellToEdit.intention == "Mood" ? 'selected' : ''}>Mood</option>
    <option value="Protection" ${ spellToEdit.intention == "Protection" ? 'selected' : ''}>Protection</option>
    <option value="Purification" ${ spellToEdit.intention == "Purification" ? 'selected' : ''}>Purification</option>
    <option value="Sleep" ${ spellToEdit.intention == "Sleep" ? 'selected' : ''}>Sleep</option>
    <option value="Spirituality" ${ spellToEdit.intention == "Spirituality" ? 'selected' : ''}>Spirituality</option>         
    <option value="Wisdom" ${ spellToEdit.intention == "Wisdom" ? 'selected' : ''}>Wisdom</option>    
    `

    $('select').formSelect();

    submitSpell().value = "Update Spell"

    Spell.editedSpellId = this.id

    window.location.hash = "spell-form-jump"
    removeHash();
}

static updateSpell() {

    const strongParams = {
        spell: {
            name: spellName().value,
            process: spellProcess().value,
            intention: spellIntention().value,
            description: spellDescription().value,
        }
    }

    fetch(baseUrl + '/spells/' + Spell.editedSpellId, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {

        let editedSpell = Spell.all.find(spell => spell.id == data.id)
        editedSpell.name = data.name
        editedSpell.process = data.process
        editedSpell.intention = data.intention
        editedSpell.description = data.description

        Spell.displaySpells()

        resetInputs()
        editingSpell = false
        Spell.editedSpellId = null
        submitSpell().value = "Create Spell"
    })
}

static deleteSpell() {

    fetch(baseUrl + '/spells/' + this.id, {
        method: "DELETE"
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        this.parentNode.parentNode.parentNode.remove();
    })
}

static validateForm() {
    
    let validationValue = true

    if (spellName().value == "") {
        alert("Spell needs a name!");
        validationValue = false;
    } 

    if (spellProcess().value == "") {
        alert("Spell needs a process!");
        validationValue = false;
    }

    if (spellIntention().value == "") {
        alert("Spell needs an intention!");
        validationValue = false;
    }

    return validationValue

}

static addComponent(e) {
    e.preventDefault()

    const componentId = this.parentNode.querySelector('select').value

    if ( componentId != "" && Spell.validateAdd(this.id, componentId) == true ) {

        const strongParams = {
            spells_component: {
                spell_id: this.id,
                component_id: componentId
            }
        }

        fetch(baseUrl + '/spells_components.json', {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => { 

            const existingUl = this.parentNode.parentNode.querySelector('ul')
            const componentItem = document.createElement('li')
            componentItem.innerText = `${data.component.name}   `
            componentItem.id = data.component_id
            componentItem.classList.add("component-li")
        
            const componentRemove = document.createElement('i')
            componentRemove.classList.add("material-icons")
            componentRemove.id = data.component_id

            componentRemove.innerText = "clear"
            componentRemove.addEventListener('click', Spell.removeComponent)
        
            componentItem.append(componentRemove)

            existingUl.appendChild(componentItem)
        })
        .catch(function(error) {
            alert("Sometimes things go bad just because.");
            alert(error);
        })
    } else {
        alert("Please select a component.")
    }

    resetInputs();

}

static removeComponent() {

    const componentId = this.id
    const spellId = this.parentNode.parentNode.parentNode.parentNode.parentNode.id

    const strongParams = {
        spells_component: {
            spell_id: spellId,
            component_id: componentId
        }
    }

    fetch(baseUrl + '/spells_components/deletion', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {
        this.parentNode.remove();
    })
    .catch(function(error) {
        alert("Sometimes things go bad just because.");
        alert(error);
    })

}

static validateAdd (spell_id, component_id) {
    
    let validationValue = true
    const spellToCheck = Spell.all.find(spell => spell.id == spell_id)
    const componentToCheck = parseInt(component_id)

    spellToCheck.components.forEach(component => {
        
        if (component.id == componentToCheck) {
            alert("That component is already part of this spell!");
            validationValue = false;
        }
    })

    return validationValue
}


}


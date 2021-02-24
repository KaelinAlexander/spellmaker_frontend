class Reagent {

    static all = [];
    static editedComponentId = null;

    constructor(id, name, latin, planet, element, description, toxic, synonyms, deities, uses) {
        this.id = id;
        this.name = name;
        this.latin = latin;
        this.planet = planet;
        this.element = element;
        this.description = description;
        this.toxic = toxic
        this.synonyms = synonyms;
        this.deities = deities;
        this.uses = uses;
    }

    display() {

        const innerDiv = document.createElement('div')
        innerDiv.classList.add("col", "s4")
        const cardDiv = document.createElement('div')
        cardDiv.classList.add("card", "medium")
        const cardImageDiv = document.createElement('div')
        cardImageDiv.classList.add("card-image", "waves-effect", "waves-block", "waves-light")
        cardImageDiv.innerHTML = `<img class="activator" src="images/components/${this.name}.jpg" onerror="this.onerror=null; this.src='images/components/Default.jpg'">`
        const cardContent = document.createElement('div')
        cardContent.classList.add("card-content")
        const cardNameSpan = document.createElement('span')
        cardNameSpan.classList.add("card-title", "activator", "grey-text", "text-darken-4")
        const activatorIcon = document.createElement('i')
        activatorIcon.classList.add("material-icons", "right")
        activatorIcon.innerText = "more_vert"

        const pElement = document.createElement('p')
        const pPlanet = document.createElement('p')
        
        const editIcon = document.createElement('i')
        editIcon.classList.add("material-icons", "right")
        editIcon.id = this.id
        editIcon.innerText = "edit"
        editIcon.addEventListener('click', Reagent.editComponent)

        const deleteIcon = document.createElement('i')
        deleteIcon.classList.add("material-icons", "right")
        deleteIcon.id = this.id
        deleteIcon.innerText = "delete"
        deleteIcon.addEventListener('click', Reagent.deleteComponent)

        const cardRevealDiv = document.createElement('div')
        cardRevealDiv.classList.add("card-reveal")

        const spanLatin = document.createElement('span')
        spanLatin.classList.add("card-title", "grey-text", "text-darken-4")


        const pDescription = document.createElement('p')
        const pSynonyms = document.createElement('p')

        const usesList = document.createElement('ul')
        const deitiesList = document.createElement('ul')

        cardNameSpan.innerText = this.name
        if (this.latin != "" && this.latin != null ) {
        spanLatin.innerText = this.latin
        } else {
            spanLatin.innerText = this.name
        }

        pPlanet.innerText = this.planet
        pElement.innerText = this.element
        pDescription.innerText = this.description

        let synArray = []

        this.synonyms.forEach(syn => {
            synArray.push(syn.name)
        })

        pSynonyms.innerText = synArray.join(', ')

        this.deities.forEach(deity => {
            const deityItem = document.createElement('li')
            deityItem.innerText = deity.name
            deityItem.id = deity.id
            deitiesList.appendChild(deityItem)
        })

        this.uses.forEach(use => {
            const useItem = document.createElement('li')
            useItem.innerText = use.name
            useItem.id = use.id
            usesList.appendChild(useItem)
        })

        // editIcon.id = this.id
        // editIcon.addEventListener('click', Reagent.editComponent)

        // deleteIcon.id = this.id
        // deleteIcon.addEventListener('click', Reagent.deleteComponent)

            innerDiv.appendChild(cardDiv)
                cardDiv.appendChild(cardImageDiv)
                cardDiv.appendChild(cardContent)
                    cardContent.appendChild(cardNameSpan)
                    cardContent.appendChild(pElement)
                    cardContent.appendChild(pPlanet)
                    if (this.toxic == true) {
                        const toxicFlag = document.createElement('p');
                        toxicFlag.innerText = "DO NOT CONSUME"
                        cardContent.appendChild(toxicFlag)
                    }
                    cardContent.appendChild(editIcon)
                    cardContent.appendChild(deleteIcon)
                cardDiv.appendChild(cardRevealDiv)
                cardRevealDiv.appendChild(spanLatin)
                cardRevealDiv.appendChild(deitiesList)
                cardRevealDiv.appendChild(usesList)
                cardRevealDiv.appendChild(pDescription)

        componentList().appendChild(innerDiv)
    }

    displayOld() {
        
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const h5latin = document.createElement('h5');
        const h5planet = document.createElement('h5');
        const h5element = document.createElement('h5');
        const h5synonyms = document.createElement('h5');
        const p = document.createElement('p');
        const usesList = document.createElement('ul')
        const deitiesList = document.createElement('ul')
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        h4.innerText = this.name
        h5latin.innerText = this.latin
        h5planet.innerText = this.planet
        h5element.innerText = this.element
        p.innerText = this.description

        let synArray = []

        this.synonyms.forEach(syn => {
            synArray.push(syn.name)
        })

        h5synonyms.innerText = synArray.join(', ')

        this.deities.forEach(deity => {
            const deityItem = document.createElement('li')
            deityItem.innerText = deity.name
            deityItem.id = deity.id
            deitiesList.appendChild(deityItem)
        })

        this.uses.forEach(use => {
            const useItem = document.createElement('li')
            useItem.innerText = use.name
            useItem.id = use.id
            usesList.appendChild(useItem)
        })

        editButton.innerText = "Edit"
        editButton.id = this.id
        editButton.addEventListener('click', Reagent.editComponent)

        deleteButton.innerText = "Delete"
        deleteButton.id = this.id
        deleteButton.addEventListener('click', Reagent.deleteComponent)

        div.appendChild(h4)
        div.appendChild(h5latin)
        if (this.toxic == true) {
            const toxicFlag = document.createElement('h5');
            toxicFlag.innerText = "DO NOT CONSUME"
            div.appendChild(toxicFlag)
        }
        div.appendChild(h5planet)
        div.appendChild(h5element)
        div.appendChild(h5synonyms)
        div.appendChild(p)
        div.appendChild(deitiesList)
        div.appendChild(usesList)
        div.appendChild(editButton)
        div.appendChild(deleteButton)

        componentList().appendChild(div)

    }

    static createComponents(componentsData) {
        componentsData.forEach(com => Reagent.create(com.id, com.name, com.latin, com.planet, com.element, com.description, com.toxic, com.synonyms, com.deities, com.uses))
    }
    static create(id, name, latin, planet, element, description, toxic, synonyms, deities, uses) {
        let newComponent = new Reagent(id, name, latin, planet, element, description, toxic, synonyms, deities, uses);

        Reagent.all.push(newComponent);

        return newComponent;
    }

    static displayComponents() {
        componentList().innerHTML = '';
        Reagent.all.forEach(com => {
            com.display()
        })
    }

    static createFromForm(e) {
        
        e.preventDefault();

        if (editingComponent && Reagent.validateForm() == true ) {
            Reagent.updateComponent()
        } else if ( Reagent.validateForm() == true ) {

            const componentsDeitiesAttributes = []
            const rawComponentsDeities = getSelectValues(componentDeities())
            rawComponentsDeities.forEach(assoc => {
                let newAssoc = {}
                newAssoc["deity_id"] = assoc
                componentsDeitiesAttributes.push(newAssoc)
            })

            const componentsUsesAttributes = []
            const rawComponentsUses = getSelectValues(componentUses())
            rawComponentsUses.forEach(assoc => {
                let newAssoc = {}
                newAssoc["use_id"] = assoc
                componentsUsesAttributes.push(newAssoc)
            })

            const synonymsAttributes = []
            const rawSynonyms = componentSynonyms().value.split(', ')
            rawSynonyms.forEach(synonym => {
                let newSynonym = {}
                newSynonym["name"] = synonym
                synonymsAttributes.push(newSynonym)
            })

            const strongParams = {
                component: {
                    name: componentName().value,
                    latin: componentLatin().value,
                    planet: componentPlanet().value,
                    element: componentElement().value,
                    description: componentDescription().value,
                    toxic: componentToxic().value,
                    synonyms_attributes: synonymsAttributes,
                    components_deities_attributes: componentsDeitiesAttributes,
                    components_uses_attributes: componentsUsesAttributes
                }
            }
        fetch(baseUrl + '/components.json', {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            let createComponent = Reagent.create(data.id, data.name, data.latin, data.planet, data.element, data.description, data.toxic, data.synonyms, data.deities, data.uses);
            createComponent.display();
            Spell.displaySpells();
        })

        resetInputs();
        }
    }

static editComponent() {

    const componentToEdit = Reagent.all.find(component => component.id == this.id)
    
    editingComponent = true
    componentName().value = componentToEdit.name
    componentLatin().value = componentToEdit.latin
    componentPlanet().value = componentToEdit.planet
    componentElement().value = componentToEdit.element

    let synArray = []

    componentToEdit.synonyms.forEach(syn => {
        synArray.push(syn.name)
    })

    let synString = synArray.join(', ')

    componentSynonyms().value = synString
    componentDescription().value = componentToEdit.description
    // Add logic for check boxes and select boxes here.
    submitComponent().value = "Update Component";

    const deityOptions = []
 
    componentToEdit.deities.forEach(deity => {
        deityOptions.push(deity.id)
    })

    deityOptions.forEach(deityId => {
        select("component-deities", deityId)
    })
    $('select').formSelect();

    const useOptions = []

    componentToEdit.uses.forEach(use => {
        useOptions.push(use.id)
    })

    useOptions.forEach(useId => {
        select("component-uses", useId)
    })
    $('select').formSelect();

    singleSelect("component-planet", componentToEdit.planet)
    $('select').formSelect();
    singleSelect("component-element", componentToEdit.element)
    $('select').formSelect();
    singleSelect("component-toxic", componentToEdit.toxic)
    $('select').formSelect();
    componentToxic().value = componentToEdit.toxic
    $('select').formSelect();

    M.updateTextFields();
    Reagent.editedComponentId = this.id

    window.location.hash = "component-form-jump"
    removeHash();
}

static updateComponent() {

    const componentsDeitiesAttributes = []
    const rawComponentsDeities = getSelectValues(componentDeities())
    rawComponentsDeities.forEach(assoc => {
        let newAssoc = {}
        newAssoc["deity_id"] = assoc
        newAssoc["component_id"] = Reagent.editedComponentId
        componentsDeitiesAttributes.push(newAssoc)
    })

    const componentsUsesAttributes = []
    const rawComponentsUses = getSelectValues(componentUses())
    rawComponentsUses.forEach(assoc => {
        let newAssoc = {}
        newAssoc["use_id"] = assoc
        componentsUsesAttributes.push(newAssoc)
    })

    const synonymsAttributes = []
    const rawSynonyms = componentSynonyms().value.split(', ')
    rawSynonyms.forEach(synonym => {
        let newSynonym = {}
        newSynonym["name"] = synonym
        synonymsAttributes.push(newSynonym)
    })

    const strongParams = {
        component: {
            name: componentName().value,
            latin: componentLatin().value,
            planet: componentPlanet().value,
            element: componentElement().value,
            description: componentDescription().value,
            toxic: componentToxic().value,
            synonyms_attributes: synonymsAttributes,
            components_deities_attributes: componentsDeitiesAttributes,
            components_uses_attributes: componentsUsesAttributes
        }
    }

    fetch(baseUrl + '/components/' + Reagent.editedComponentId, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(data => {
        
        let editedComponent = Reagent.all.find(component => component.id == data.id)
        editedComponent.name = data.name
        editedComponent.latin = data.latin
        editedComponent.planet = data.planet
        editedComponent.element = data.element
        editedComponent.toxic = data.toxic
        editedComponent.synonyms = data.synonyms
        editedComponent.deities = data.deities
        editedComponent.uses = data.uses

        Reagent.displayComponents()

        resetInputs();
        editingComponent = false
        Reagent.editedComponentId = null
        submitComponent().value = "Create Component"
    })
}

static deleteComponent() {
    fetch(baseUrl + '/components/' + this.id, {
        method: "DELETE"
    })
    .then(resp => {
        return resp.json();
    })
    .then(data => {
        
        this.parentNode.parentNode.parentNode.remove();

        // TO DO: Find a workaround for this; it's kind of a nuclear option.

        // spellList().innerHTML = ""
        Spell.displaySpells();
        removeComponentLis(data.id);
        resetInputs(); 
    })
    
}

static validateForm() {
    
    let validationValue = true

    if (componentName().value == "") {
        alert("Component needs a name!");
        validationValue = false;
    } 

    if (componentToxic().value == "") {
        alert("Please indicate whether this component is toxic.");
        validationValue = false;
    }

    if (componentElement().value == "") {
        alert("Component needs an element!");
        validationValue = false;
    }

    return validationValue

}

}
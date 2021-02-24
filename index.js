const spellList = () => document.getElementById("spell-list")
const componentList = () => document.getElementById("component-list")

const spellForm = () => document.querySelector("form#spell-form")
const spellName = () => document.querySelector("input#spell-name")
const spellProcess = () => document.querySelector("select#spell-process")
const spellIntention = () => document.querySelector("select#spell-intention")
const spellDescription = () => document.querySelector("textarea#spell-description")
const submitSpell = () => document.getElementById("submit-spell")

const componentForm = () => document.querySelector("form#component-form")
const componentName = () => document.querySelector("input#component-name")
const componentLatin = () => document.querySelector("input#component-latin")
const componentSynonyms = () => document.querySelector("input#component-synonyms")
const componentPlanet = () => document.querySelector("select#component-planet")
const componentElement = () => document.querySelector("select#component-element")
const componentDescription = () => document.querySelector("textarea#component-description")
const componentToxic = () => document.querySelector("select#component-toxic")
const componentDeities = () => document.querySelector("select#component-deities")
const componentUses = () => document.querySelector("select#component-uses")
const submitComponent = () => document.getElementById("submit-component")

const makerNav = () => document.getElementById("maker-nav")
const spellsNav = () => document.getElementById("spells-nav")
const componentsNav = () => document.getElementById("components-nav")

const baseUrl = 'http://localhost:3000'
let editingSpell = false
let editingComponent = false

document.addEventListener("DOMContentLoaded", callOnLoad)

function callOnLoad() {
    loadSpells();
    loadComponents();
    loadSelectors();
    submitSpell().addEventListener('click', Spell.createFromForm);
    submitComponent().addEventListener('click', Reagent.createFromForm);
    makerNav().addEventListener('click', makerJump);
    spellsNav().addEventListener('click', spellsJump);
    componentsNav().addEventListener('click', componentsJump);
}

function loadSpells() {
    fetch(baseUrl + '/spells.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            Spell.createSpells(data)
            Spell.displaySpells();
        })
        .catch(errors => console.log(errors))
}

function loadComponents() {
    fetch(baseUrl + '/components.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            Reagent.createComponents(data);
            Reagent.displayComponents();
        })
        .catch(errors => console.log(errors))
}

function loadSelectors() {
    loadComponentUseSelectors();
    loadComponentDeitySelectors();
    loadComponentSelectors();
    $('select').formSelect();
}

function loadComponentUseSelectors() {
    fetch(baseUrl + '/uses.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            data.forEach(use => {
                let useOption = document.createElement('option')
                useOption.value = use.id
                useOption.innerText = use.name
                componentUses().appendChild(useOption)
            })
            $('select').formSelect();
        })
        .catch(errors => console.log(errors))

}

function loadComponentDeitySelectors() {
    fetch(baseUrl + '/deities.json')
        .then(resp => {
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        })
        .then(data => {
            data.forEach(use => {
                let useOption = document.createElement('option')
                useOption.value = use.id
                useOption.innerText = use.name
                componentDeities().appendChild(useOption)
            })
            $('select').formSelect();
        })
        .catch(errors => console.log(errors))

}

function loadComponentSelectors() {

    let componentSelector = document.createElement('select')
    defaultOption = document.createElement('option')
    defaultOption.value = ""
    defaultOption.innerText = ""
    componentSelector.appendChild(defaultOption)

    const componentsToSelect = Reagent.all

    componentsToSelect.forEach( component => {
        let componentOption = document.createElement('option')
        componentOption.value = component.id
        componentOption.innerText = component.name
        componentOption.class = "component-selector"
        componentSelector.appendChild(componentOption)
    })

    $('select').formSelect();

    return componentSelector

}

// function loadComponentSelectors() {
//     let componentSelector = document.createElement('select')
//     defaultOption = document.createElement('option')
//     defaultOption.value = ""
//     defaultOption.innerText = ""
//     componentSelector.appendChild(defaultOption)
//     fetch(baseUrl + '/components.json')
//         .then(resp => {
//             if (resp.status !== 200) {
//                 throw new Error(resp.statusText);
//             }
//             return resp.json();
//         })
//         .then(data => {
//             data.forEach(component => {
//                 let componentOption = document.createElement('option')
//                 componentOption.value = component.id
//                 componentOption.innerText = component.name
//                 componentOption.class = "component-selector"
//                 componentSelector.appendChild(componentOption)
//             })
//             $('select').formSelect();
//         })
//         .catch(errors => console.log(errors))
//     return componentSelector
// }

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;
  
    for (var i=0, iLen=options.length; i<iLen; i++) {
      opt = options[i];
  
      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    return result;
  }

function select(selectId, optionValToSelect){
   
    var selectElement = document.getElementById(selectId);
    var selectOptions = selectElement.options;
    
    for (var opt, j = 0; opt = selectOptions[j]; j++) {
        if (opt.value == optionValToSelect) {
            opt.selected = true
            break;
        }
    }
}

function singleSelect(selectId, optionValToSelect){

    var selectElement = document.getElementById(selectId);
    var selectOptions = selectElement.options;

    for (var opt, j = 0; opt = selectOptions[j]; j++) {
        if (opt.value == optionValToSelect) {
            selectElement.selectedIndex = j;
            break;
        }
    }
}

function removeComponentLis(componentId) {

    const liTags = document.getElementsByClassName("component-li");
    const searchId = componentId

    for (var i = 0; i < liTags.length; i++) {
    if (liTags[i].id == searchId) {
       liTags[i].remove();
    }
    }

}

function removeComponentOptions(componentId) {

    const optionTags = document.getElementsByClassName("component-selector");
    const searchId = componentId

    for (var i = 0; i < optionTags.length; i++) {
    if (optionTags[i].id == searchId) {
       optionTags[i].remove();
    }
    }

}

function resetInputs() {
    // const componentSelectorForms = document.getElementsByClassName("component-selector-form")

    // componentSelectorForms.forEach(form => {
    //     form.innerHTML = ""
    // })

    spellForm().reset();
    componentForm().reset();
}

function removeHash () { 
    history.pushState("", document.title, window.location.pathname
                                                       + window.location.search);
}

function makerJump () {
    window.scrollTo(0, 0);
    removeHash();
}

function spellsJump () {
    window.location.hash = "spell-nav-jump";
    removeHash();
}

function componentsJump () {
    window.location.hash = "component-nav-jump";
    removeHash();
}
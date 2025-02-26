const reponses_v = ['b','c','a','b','b']
const reponse = document.querySelectorAll(".question-bloc div input")
const envoyer = document.querySelector(".submit")
const affichage = document.querySelector(".score")
// console.log(reponse)
// console.log(envoyer)
// console.log(affichage)
// fonction à utiliser dans le corps 
function recuperer_reponse(champs) {
    let resp = []

    champs.forEach(proposition => {
        if (proposition.checked) {
            resp.push(proposition)    
        }
    });

    return resp;
}

function verify(elt,a){
    for (let i = 0; i < elt.length; i++) {
        
        if(elt[i].value === a[i]){
            correct(elt[i])
        }else{
            wrong(elt[i])
        }
    }
}

function score(checklist,elt,reponses_v){
    let good = 0
    for (let i = 0; i < checklist.length; i++) {
        if (checklist[i].value === reponses_v[i]) {
            good = good+1
        }
    }

    if (good === checklist.length) {
        let message = "bravo tu as fois un sans faute tu as eu une note de <span class='focus'>"+good+"/"+checklist.length+"</span>"
        elt.innerHTML='<h4>'+message+'</h4>'
    } else if(good < checklist.length && good >= checklist.length-2){
        let message = "tu y étais presque continues ainsi. Tu as eu une note de <span class='focus'>"+good+"/"+checklist.length+"</span>"
        elt.innerHTML='<h4>'+message+'</h4>'
    }else{
        let message = "Oh lala tu dois te mettre au travail car tu as eu une note de <span class='focus'>"+good+"/"+checklist.length+"</span>"
        elt.innerHTML='<h4>'+message+'</h4>'
    }
}

function correct(element){
    if (element.closest('.question-bloc').classList.contains("right") || element.closest('.question-bloc').classList.contains("danger")) {
        element.closest('.question-bloc').classList.remove("right")
        element.closest('.question-bloc').classList.remove("danger")
    }
    element.closest('.question-bloc').classList.add("right")
}

function wrong(element){
    if (element.closest('.question-bloc').classList.contains("danger") || element.closest('.question-bloc').classList.contains("right")) {
        element.closest('.question-bloc').classList.remove("right")
        element.closest('.question-bloc').classList.remove("danger")
    }
    setTimeout(()=>{
        element.closest('.question-bloc').classList.add("danger")
    },10)
}

// commençons maintenant à monter notre verification et l'affichage du score 

envoyer.addEventListener('click',(e)=>{
    e.preventDefault()
    let comp = 0
    const resultat = recuperer_reponse(reponse)
    // resultat.forEach(input => {
    //     verify(input,reponses_v[comp])
    //     comp++
    // });

    verify(resultat,reponses_v)
    score(resultat,affichage,reponses_v)
})
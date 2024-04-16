// elementi html statici
const utenteOk = document.querySelector("#utenteOk");
const textArea = document.querySelector("#textArea");
const btnInviaTweet = document.querySelector("#btnInviaTweet");
const contatore = document.querySelector("#contatore");
const btnLogout = document.querySelector('#btnLogout');

// richiamo funzioni
btnInviaTweet.addEventListener("click", inserisciTweet);
textArea.addEventListener('input', contaCaratteri);
btnLogout.addEventListener('click', logout);

// archivio locale dal html 1
let username = localStorage.getItem("Nome Utente");
let password = localStorage.getItem("Password");

// logo username
utenteOk.innerHTML = `<i class="fa-solid fa-user me-2"></i> @${username}`;

function inserisciTweet() {
    // oggetto tweet
    let tweet = {
        username: username,
        dataInvio: new Date().toLocaleString(),
        tweetTesto: textArea.value,
    };

    // TODO BETTER: array tweets vuoto, aggiunta tweet nell'array, aggiunta nel localStorage
    let tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    tweets.push(tweet);
    localStorage.setItem("tweets", JSON.stringify(tweets));

    // elemento dinamico contenitore tweets e contenitore tweet, e collegamento, e mostra in pagina proprieta dell'oggetto tweet
    let tweetContainer = document.querySelector("#tweetContainer");
    let tweetSingoloContainer = document.createElement("div");
    tweetSingoloContainer.setAttribute("class", "container bg-light rounded-2 border border-3 mb-3");
    tweetContainer.appendChild(tweetSingoloContainer);
    if(textArea.value==0){
        tweetSingoloContainer.textContent="errore"
    }else{
        tweetSingoloContainer.innerHTML = `
    <p><i class="fa-solid fa-user me-2"></i> ${tweet.username} ${tweet.dataInvio}</p>
    <p>${tweet.tweetTesto}</p>
    `;
    }
    

    textArea.value = "";
    contatore.textContent="Caratteri rimanenti 50/50"
}



function contaCaratteri() {
    let testo=textArea.value;
    let conteggio=(50 - testo.length);
    contatore.textContent ="Caratteri rimanenti "+conteggio+"/50";

    if (conteggio==0) {
        contatore.textContent="Caratteri finiti"  
    }
    
}

function logout() {

    // conversione del json (localStorage) in oggetto
    let tweetsObj = JSON.parse(localStorage.getItem("tweets"));

    // oggetto datiUtente
    let datiUtente = {
        username: username,
        password: password,
        tweets: tweetsObj
    };

    // conversione dell'oggetto e aggiunta nel finto db (formato json)
    fetch('http://localhost:3000/datiUtente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datiUtente)
    })
        .then(response => {
            if (response.ok) {
                console.log('Dati utente salvati correttamente.');
            } else {
                console.error('Dati utenti non salvati.');
            }
            window.location.href = "twitter1.html";
        })
        .catch(error => {
            console.error('Errore di rete durante il logout:', error);
            window.location.href = "twitter1.html";
        });

    localStorage.removeItem('Nome Utente');
    localStorage.removeItem('Password');
}

/* Creare un'interfaccia di Twitter nella quale ci si può registrare (username: min 4 caratteri, max 15; password: almeno una minuscola, almeno una maiuscola, almeno un numero, almeno un carattere speciale, minimo 8 caratteri). Consiglio: REGEX

        Una volta registrato , l'utente viene salvato in local storage e sarà reindirizzato a una pagina che riporterà il suo username e dove potrà scrivere e postare un tweet di massimo 50 caratteri. All'invio del tweet, questo verrà stampato sotto al form con tanto di nome utente e ora di pubblicazione. Sarà anche presente un bottone di logout che al click prenderà username, password e tutti i tweet postati dall'utente e li salverà su un file JSON (finto db) tramite json-server.

        Punti in più  se:
            
viene aggiunto un contatore di caratteri rimanenti che si aggiorna man mano che l'utente scrive il tweet
se viene aggiunto anche un avatar di default per l'utente, che verrà visualizzato a fianco dello username nella pagina del tweet
*/
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    loading();
    const proxyUrl='https://still-oasis-04690.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data =  await response.json();

        // if there is no author 

        if(data.quoteAuthor===''){
            authorText.innerText = 'Unknown'
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }

        // larger quote

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
       quoteText.innerText = data.quoteText;
       console.log(data);
       complete();

    }catch(error){
        getQuote();
        console.log('whoops,no quote',error);
    }
}
// tweet Function
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}--${author}`;
    window.open(twitterUrl,'_blank');
}
//Event Listners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// load data
getQuote();
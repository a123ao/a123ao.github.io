//Dumb Javascript
let files = ["adj1.txt", "adj2.txt", "adv1.txt", "adv2.txt"];
//DOM
let body = document.getElementById("body");
let user_input = document.getElementById("user_input");
let word_background = document.getElementById("word_background");
let log_background = document.getElementById("log_background");
let log_element = document.getElementById("log");
let answer = document.getElementById("answer");
let hint = document.getElementById("hint");
let file = document.getElementById("file");
let word_list_background = document.getElementById("word_list_background");
let word_list = document.getElementById("word_list");
let bfile = document.getElementById("bfile");
//Class
class Word {
    constructor(word_0 = 0, word_1 = 0, romaji = 0)
    {
        this.word_0 = word_0;
        this.word_1 = word_1;
        this.romaji = romaji;
    }
}
let words = [];
//Varible
let input = "";
let word_index = 0;
let file_index = 0;
let filename = "adj1.txt";
let show_answer = false;
let show_hint = false;
let show_file = false;
//Function
open_file();
user_input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        input = user_input.value;
        if(input == words[word_index].romaji || input == '>') {
            word_index = Math.floor(Math.random() * (words.length - 1));
            word_background.innerHTML = `<h1>${words[word_index].word_0}</h1>`;
            log_element.innerText = "紀錄:\n";
            user_input.placeholder = "請輸入羅馬字";
            show_answer = false;
            show_hint = false;
        }
        else if(input == '?') {
            log_element.innerText += `[${word_index + 1}, ${words[word_index].word_0} ${words[word_index].romaji}]\n`;
        }
        else if(input) {
            log_element.innerText += input + '\n';
        }
        while(log_element.scrollHeight > log_background.clientHeight) {
            log_element.innerText = log_element.innerText.slice(log_element.innerText.indexOf('\n') + 1);
        }
        user_input.value = "";
    }
});
function open_file() {
    fetch("data/" + filename)
    .then(response => response.text().then(initial()))
    .then(text => {
        const lines = text.split('\r\n');
        lines.forEach(line => {
            const fields = line.split('\t');
            let word_0 = fields[1].split('(')[0], word_1 = fields[1].split('(')[1];
            if(word_1)
                word_1 = word_1.toString().replace(')', '');
            words[parseInt(fields[0]) - 1] = new Word(word_0, word_1, fields[2]);
            //console.log(words[parseInt(fields[0]) - 1]);
        });
    })
    .then(() => {
        file.innerText = filename;
        word_index = Math.floor(Math.random() * (words.length - 1));
        word_background.innerHTML += `<h1>${words[word_index].word_0}</h1>`;
        write_list();
    })
    .catch(error => console.log(error));
}
function initial() {
    console.log(filename);
    user_input.value = "";
    user_input.placeholder = "請輸入羅馬字"
    word_background.innerHTML = "";
    log_element.innerText = "紀錄:\n";
    show_answer = false;
    show_hint = false;
    words = [];
}
answer.addEventListener("click", function() {
    if(!show_answer) {
        user_input.placeholder = words[word_index].romaji;
    }
    else {
        user_input.placeholder = "請輸入羅馬字";
    }
    show_answer = !show_answer;
})
hint.addEventListener("click", function() {
    if(!show_hint && words[word_index].word_1) {
        word_background.innerHTML += `<h1>(${words[word_index].word_1})</h1>`;
    }
    else {
        word_background.innerHTML = `<h1>${words[word_index].word_0}</h1>`;
    }
    show_hint = !show_hint;
})
file.addEventListener("click", function() {
    if(!show_file) {
        word_background.style.display = "none";
        user_input.style.display = "none";
        log_background.style.display = "none";
        answer.style.display = "none";
        hint.style.display = "none";
        word_list_background.style.display = "flex";
    }
    else {
        word_background.style.display = "flex";
        user_input.style.display = "block";
        log_background.style.display = "block";
        answer.style.display = "flex";
        hint.style.display = "flex";
        word_list_background.style.display = "none";
    }
    show_file = !show_file;
})
ffile.addEventListener("click", function() {
    if(file_index - 1 >= 0)
    {
        filename = files[--file_index];
        open_file();
    }
})
bfile.addEventListener("click", function() {
    if(file_index + 1 < files.length) {
        filename = files[++file_index];
        console.log(filename);
        open_file();
    }
})
function write_list()
{
    word_list.innerHTML = "";
    for(let i = 0; i < words.length; i++) {
        let word_data = words[i].word_1 ? `<li>${i + 1},${words[i].word_0}(${words[i].word_1})&nbsp;&nbsp;&nbsp;${words[i].romaji}</li>` : `<li>${i + 1},${words[i].word_0}&nbsp;&nbsp;&nbsp;${words[i].romaji}</li>`
        word_list.innerHTML += word_data;
    }
}
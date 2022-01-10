var data = {
    easy: [
            {
                name: "1-ая буква ",
                len: 3,
                answer: []
            }
        ],
    medium: [
            {
                name: "3-ья буква ",
                len: 3,
                answer: []
            }
        ],
    hard: [
            {
                name: "3-ья буква ",
                len: 4,
                answer: []
            }
        ],
}

function taskEasy() {
    let num = ["А","Б","В","Г","Д","З","К","М","Н","О","П","Р","С","Т","Ш"];
    let item = Math.floor(Math.random() * num.length);
    return num[item];
}

function taskMedium() {
    let num = ["А","В","Д","Е","И","Й","К","Л","М","О","П","Р","Т","У","Ш","Ю"];
    let item = Math.floor(Math.random() * num.length);
    return num[item];
}

function taskHard() {
    let num = ["А","В","Д","Е","И","Й","К","Л","М","О","П","Р","Т","У","Ш","Ю"];
    let item = Math.floor(Math.random() * num.length);
    return num[item];
}
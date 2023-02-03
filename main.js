let i = 0;
const typeWriter = (txt='sdasd',speed=20) => {
    if (i < txt.length) {
        document.querySelector("#chat__container__chat__bot__message p").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();
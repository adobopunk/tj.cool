const copyLink = document.getElementById('copy-link');
console.log(copyLink);

copyLink.addEventListener('click', (e) => {
    e.preventDefault(); // prevent default link behavior

    const textToCopy = 'hi@tinypond.studio'; // the text you want to copy
    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            console.log('Text copied to clipboard!');
            // Change the inner HTML to "Email copied to clipboard!"
            copyLink.innerHTML = 'Email copied to clipboard!';

            // Delay for 2 seconds before changing it back
            setTimeout(() => {
                copyLink.innerHTML = 'hi@tinypond.studio';
            }, 2000);
        })
        .catch((error) => {
            console.error('Error copying text:', error);
        });
});
function closeMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[action="https://formspree.io/f/mjvnerve"]');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const okButton = document.getElementById('ok-button');

    okButton.addEventListener('click', function() {
        closeMessage();
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente

        const formData = new FormData(form);

        fetch(form.getAttribute('action'), {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                form.reset(); // Limpa os campos do formulário
            } else {
                throw new Error('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
            errorMessage.innerText = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.';
        });
    });
});

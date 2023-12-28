var mySwipers = {};

mySwipers.mySwiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 7000, // Tiempo en milisegundos entre cada slide
        disableOnInteraction: false, // Para que no se detenga al interactuar con el slider
    },
    speed: 1000, // Duración de la transición en milisegundos (1.5 segundos en este caso)

});

mySwipers.mySwiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            slidesPerGroup: 1, // Reducir slidesPerGroup

        },
        520: {
            slidesPerView: 2,
            slidesPerGroup: 1, // Reducir slidesPerGroup

        },
        950: {
            slidesPerView: 3,
            slidesPerGroup: 1, // Reducir slidesPerGroup

        }
    }
});

let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function (input) {
    input.addEventListener('change', function () {
        let id = input.value;
        let thisSwiper = mySwipers['mySwiper' + id];
        if (thisSwiper && thisSwiper[0] && thisSwiper[0].swiper) {
            thisSwiper[0].swiper.update();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu .navbar ul li a');
    const menuToggle = document.getElementById('menu');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.checked = false; 
        });
    });
});











/*chat*/



document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = "none";
    
});

let chatVisible = false;

function toggleChat() {
    const chatContainer = document.getElementById("chatContainer");
    const chatBox = document.getElementById("chatBox");

    if (!chatVisible) {
        // Mostrar el chatbox y enviar mensaje inicial del bot
        chatContainer.style.display = "flex";
        sendInitialBotMessage();
    } else {
        // Ocultar el chatbox y borrar los mensajes
        chatContainer.style.display = "none";
        chatBox.innerHTML = "";
    }

    chatVisible = !chatVisible;
}

function sendInitialBotMessage() {
    const chatBox = document.getElementById("chatBox");
    
    // Simular un mensaje inicial del bot
    const initialBotMessage = '¡Hola! Soy un bot. ¿En qué puedo ayudarte?';

    // Obtener la hora actual
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Formatear la hora como HH:mm
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Mostrar el mensaje del bot con la hora en el chat
    chatBox.innerHTML += `<div class="message-container bot-container">
                            <p class="bot-message">${initialBotMessage}</p>
                            <span class="message-time">${formattedTime}</span>
                        </div>`;

    // Desplazar la vista hacia abajo para mostrar los últimos mensajes
    chatBox.scrollTop = chatBox.scrollHeight;
}


function sendMessageOption(option) {
    const chatBox = document.getElementById("chatBox");

    // Obtener la hora actual
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Formatear la hora como HH:mm
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Mostrar el mensaje del usuario con la hora en el chat
    chatBox.innerHTML += `<div class="message-container user-container">
                            <p class="user-message">${option}</p>
                            <span class="message-time">${formattedTime}</span>
                        </div>`;

    // Mostrar la animación de carga
    chatBox.innerHTML += `<div class="message-container bot-container loading-animation">
                            <p class="bot-message">Cargando...</p>
                        </div>`;

    // Simular una respuesta del chatbot después de un breve retraso
    setTimeout(() => {
        // Eliminar la animación de carga
        const loadingMessage = document.querySelector('.loading-animation');
        loadingMessage.remove();

        const responseMessage = getBotResponse(option);

        // Mostrar la respuesta del chatbot con la hora en el chat
        chatBox.innerHTML += `<div class="message-container bot-container">
                                <p class="bot-message">${responseMessage}</p>
                                <span class="message-time">${formattedTime}</span>
                            </div>`;

        // Desplazar la vista hacia abajo para mostrar los últimos mensajes
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500); // Ajusta el tiempo según sea necesario
}

// Función para obtener la respuesta del bot
function getBotResponse(option) {
    // Implementa lógica para obtener la respuesta del bot según la opción seleccionada
    const responses = {
        '¿Que dias atienden?': 'Atendemos todos los dias desde las 7:00 AM a 6:00 PM',
        '¿Que venden?': 'Golocentro Angie SAC ofrece una gran variedad de productos al por mayor para satisfacer las necesidades de tu negocio',
        '¿Cuantos años cumple la empresa?': 'Con más de 10 años de dedicación en la industria mayorista, Golocentro Angie SAC se ha convertido en sinónimo de calidad y confiabilidad',
        '¿Cuál es su secreto para el exito?': 'El éxito de Golocentro Angie SAC radica en nuestra dedicación a la calidad, la variedad y la satisfacción del cliente.'
    };

    return responses[option] || 'Lo siento, no entendí esa opción.';
}

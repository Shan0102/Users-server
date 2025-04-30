const usersBlock = document.querySelector(".users") as HTMLDivElement;
const errorBlock = document.querySelector(".error") as HTMLDivElement;

const API_USERS_PATH = "./api/users";

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

async function renderUsers() {
    try {
        const response = await fetch(API_USERS_PATH);
        const users: User[] = await response.json();

        const usersHTML = users
            .map(
                (user) =>
                    `<div class="user">
                <p class="value"><span class="title">User ID: </span>${user.id}</p>
                <p class="value"><span class="title">User name: </span>${user.name}</p>
                <p class="value"><span class="title">User username: </span>${user.username}</p>
                <p class="value"><span class="title">User email: </span>${user.email}</p>
            </div>`
            )
            .join("");
        usersBlock.innerHTML = usersHTML;
    } catch (error) {
        errorBlock.style.display = "block";
        if (error instanceof Error) {
            errorBlock.textContent = error.message;
        } else {
            errorBlock.textContent = "Unknown error";
        }
    }
}

window.addEventListener("load", renderUsers);

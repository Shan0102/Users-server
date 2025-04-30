const userForm = document.querySelector(".user-form") as HTMLFormElement;
const successBlock = document.querySelector(".success") as HTMLDivElement;
const errorBlock1 = document.querySelector(".error") as HTMLDivElement;

const API_CREATE_USER_PATH = "../api/users";

interface PostUser {
    name: string;
    username: string;
    email: string;
}

async function postUser(e: Event) {
    e.preventDefault();
    successBlock.style.display = "none";
    errorBlock1.style.display = "none";

    try {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const user: PostUser = {
            name: formData.get("user_name") as string,
            username: formData.get("user_username") as string,
            email: formData.get("user_email") as string,
        };
        const response = await fetch(API_CREATE_USER_PATH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.Error);
        }

        const newUser: PostUser = await response.json();

        console.log(newUser);

        successBlock.style.display = "block";
    } catch (error) {
        errorBlock1.style.display = "block";
        if (error instanceof Error) {
            errorBlock1.textContent = error.message;
        } else {
            errorBlock1.textContent = "Unknown error";
        }
    }
}

userForm.addEventListener("submit", postUser);

import { http, HttpResponse, passthrough } from 'msw';
const USERS_LS_KEY = 'users-db';

const baseApiUrl = 'https://homelist.com/api';

const users = localStorage.getItem(USERS_LS_KEY) ? JSON.parse(localStorage.getItem(USERS_LS_KEY)) : [];


export const handleRegister = http.post(`${baseApiUrl}/users`, async ({ request }) => {
    const user = await request.clone().json();

    const isAlreadyRegistered = users.some((registeredUser) =>
        registeredUser.email.toLowerCase() === user?.email?.toLowerCase());

    if (isAlreadyRegistered) {
        return HttpResponse.json(
            {
                message: 'Invalid user register',
                errors: {
                    email: 'Email already exists'
                }
            },
            { status: 400 }
        );
    }

    user.id = self.crypto.randomUUID()
    user.avatarURL = `https://i.pravatar.cc/300?u=${user.email}`;
    users.push(user)
    localStorage.setItem(USERS_LS_KEY, JSON.stringify(users))

    return HttpResponse.json(user, { status: 201 })

});

export const handleLogin = http.post(`${baseApiUrl}/auth`, async ({ request }) => {
    const user = await request.clone().json();

    const existingUser = users.find((registeredUser) =>
        registeredUser.email.toLowerCase() == user?.email?.toLowerCase()
    );

    if (!existingUser || existingUser.password !== user?.password) {
        return HttpResponse.json(
            {
                message: 'Invalid user login',
                errors: {
                    password: 'invalid email or password'
                }
            },
            { status: 401 }
        )
    } else {
        return HttpResponse.json(existingUser, { status: 201 });
    }
})





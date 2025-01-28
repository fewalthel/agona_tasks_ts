/*

Intro:

    We have asynchronous functions now, advanced technology.
    This makes us a tech startup officially now.
    But one of the consultants spoiled our dreams about
    inevitable future IT leadership.
    He said that callback-based asynchronicity is not
    popular anymore and everyone should use Promises.
    He promised that if we switch to Promises, this would
    bring promising results.

Exercise:

    We don't want to reimplement all the data-requesting
    functions. Let's decorate the old callback-based
    functions with the new Promise-compatible result.
    The final function should return a Promise which
    would resolve with the final data directly
    (i.e. users or admins) or would reject with an error
    (or type Error).

    The function should be named promisify.

Higher difficulty bonus exercise:

    Create a function promisifyAll which accepts an object
    with functions and returns a new object where each of
    the function is promisified.

    Rewrite api creation accordingly:

        const api = promisifyAll(oldApi);

*/

interface IUser {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface IAdmin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

type Person = IUser | IAdmin;

const admins: IAdmin[] = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];

const users: IUser[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];

export type ApiResponse<T> = ({ status: 'success'; data: T; } | { status: 'error'; error: string; });

export function promisify<T>(fn: (callback: (response: ApiResponse<T>) => void) => void): () => Promise<T> {
    return (): Promise<T> => new Promise<T>((resolve: (value: T) => void, reject: (reason: Error) => void) => {
        fn((response: ApiResponse<T>): void => {
            if (response.status === 'success') {
                resolve(response.data);
            } else {
                reject(new Error(response.error));
            }
        });
    });
}

/*
export function promisifyAll<T>(obj: T): Record<keyof T, any> {
    const newObj: Record<keyof T, any> = {} as Record<keyof T, any>;
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            newObj[key] = promisify(obj[key]);
        }
    }
    return newObj;
}
*/

const oldApi = {
    requestAdmins(callback: (response: ApiResponse<IAdmin[]>) => void): void {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback: (response: ApiResponse<IUser[]>) => void): void {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback: (response: ApiResponse<number>) => void): void {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void): void {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};

export const api = {
    requestAdmins: promisify(oldApi.requestAdmins),
        requestUsers: promisify(oldApi.requestUsers),
        requestCurrentServerTime: promisify(oldApi.requestCurrentServerTime),
        requestCoffeeMachineQueueLength: promisify(oldApi.requestCoffeeMachineQueueLength)
};



function logPerson(person: Person): void {
    console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}

async function startTheApp(): Promise<void> {
    console.log('Admins:');
    (await api.requestAdmins()).forEach(logPerson);
    console.log();

    console.log('Users:');
    (await api.requestUsers()).forEach(logPerson);
    console.log();

    console.log('Server time:');
    console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
    console.log();

    console.log('Coffee machine queue length:');
    try {
        console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
    } catch (e) {
        console.log(`Error: ${e.message}`, "but it's fine, sometimes errors are inevitable.");
    }
}

startTheApp().then(
    (): void => {
        console.log('Success!');
    },
    (e: Error): void => {
        console.log(`Error: ${e.message}`, "but it's fine, sometimes errors are inevitable.");
    }
);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/generics.html

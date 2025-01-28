import {IsTypeEqual, typeAssert} from 'type-assertions';
import {TUser, logPerson, users} from './index';

typeAssert<IsTypeEqual<TUser, {name: string, age: number, occupation: string}>>();
typeAssert<IsTypeEqual<typeof users, {name: string, age: number, occupation: string}[]>>();
typeAssert<IsTypeEqual<typeof logPerson, (user: {name: string, age: number, occupation: string}) => void>>();

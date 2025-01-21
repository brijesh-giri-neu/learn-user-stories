import { BankType, AccountType } from './types';

/**
 * This class implements a bank that can
 * maintain accounts and create new accounts
 */

export class Bank implements BankType {
    private accounts: AccountType[] = [];
    private usernames: string[] = [];

    /**
     * The constructor initialized the bank with accounts and usernames
     * @param accounts - array of accounts
     * @param usernames - array of usernames
     */
    public constructor(accounts: AccountType[], usernames: string[]) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * Checks whether given account id exists in the bank
     * @param id - account id
     * @returns - true if account id exists, false otherwise
     */
    private findAccountById(id: number): AccountType | undefined {
        return this.accounts.find(account => account.id === id);
    }

    /**
     * Checks whether given account number is valid
     * @param accountNumber - account number
     * @returns - true if account number is valid, false otherwise
     */
    private isAccountNumberInvalid(accountNumber: number): boolean {
        return accountNumber.toString().length !== 10;
    }

    /**
     * Checks whether given username exists in the bank
     * @param username - username
     * @returns True is username exists, false otherwise
     */
    private isUsernameExisits(username: string): boolean {
        return this.usernames.includes(username);
    }

    /**
     * Create a bank account for a user
     * @param username - username
     * @param age - age of the user
     * @param accountNumber - accountnumber/id to create
     * @returns a new account with a ten-digit unique id and zero balance
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(this.isAccountNumberInvalid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(!this.isUsernameExisits(username)) {
            throw new Error('User not found');
        }
        if(age < 18) {
            throw new Error('User is under 18');
        }
        if(this.findAccountById(accountNumber)) {
            throw new Error('Account already exists');
        }
        const account: AccountType = {
            id: accountNumber,
            balance: 0
        };
        this.accounts.push(account);
        return account;
    }

    /**
     * Deposits money into an account
     * @param accountId - ID of the account
     * @param amount - Amount to deposit
     * @returns Updated account balance
     */
    deposit(accountId: number, amount: number): number {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        const account = this.findAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        account.balance += amount;
        return account.balance;
    }

    /**
     * Withdraws money from an account
     * @param accountId - ID of the account
     * @param amount - Amount to withdraw
     * @returns Updated account balance
     */
    withdraw(accountId: number, amount: number): number {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        const account = this.findAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        if (account.balance < amount) {
            throw new Error('Insufficient balance');
        }
        account.balance -= amount;
        return account.balance;
    }

    /**
     * Checks the balance of an account
     * @param accountId - ID of the account
     * @returns Current account balance
     */
    checkBalance(accountId: number): number {
        const account = this.findAccountById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account.balance;
    }
}
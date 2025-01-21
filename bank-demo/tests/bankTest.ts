import { Bank } from '../src/bank';

const accounts = [{ id: 1234567890, balance: 5000 },
{ id: 1234567891, balance: 10000 }];

const usernames = ['user1', 'user2'];

const bank = new Bank(accounts, usernames);

// Create Account tests
console.log('Create Account tests');
// Scenario 1: successful account created
const acc = bank.createAccount('user1', 20, 1234567892);
if (acc.id !== 1234567892
    || acc.balance !== 0
    || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    bank.createAccount('user1', 20, 1234567892);
    console.log('Scenario 1 failed');
}
catch(e) {
    console.log('Scenario 1 passed');
}

// scenario 2: unsuccessful account creation due to customer being below 18

try {
    bank.createAccount('user1', 17, 1234567899);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

// Scenario 3: unsuccessful account creation due to invalid username

try {
    bank.createAccount('user3', 20, 1234567888);
    console.log('Scenario 3 failed');
}
catch(e) {
    console.log('Scenario 3 passed');
}

// Deposit Money tests
console.log('Deposit Money tests. Account - 1234567890');
try {
    const newBalance = bank.deposit(1234567890, 1500); // Deposit 1500 into account 1234567890
    if (newBalance === 6500) { // Previous balance: 5000
        console.log('Scenario 1: Successful Deposit - Passed');
    } else {
        console.log('Scenario 1: Successful Deposit - Failed');
    }
} catch (e) {
    console.log('Scenario 1: Successful Deposit - Failed');
}

// Scenario 2: Unsuccessful Deposit due to Invalid Account
try {
    bank.deposit(9999999999, 1000); // Invalid account ID
    console.log('Scenario 2: Unsuccessful Deposit due to Invalid Account - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Account not found') {
        console.log('Scenario 2: Unsuccessful Deposit due to Invalid Account - Passed');
    } else {
        console.log('Scenario 2: Unsuccessful Deposit due to Invalid Account - Failed');
    }
}

// Scenario 3: Unsuccessful Deposit due to Negative Amount
try {
    bank.deposit(1234567890, -500); // Negative deposit amount
    console.log('Scenario 3: Unsuccessful Deposit due to Negative Amount - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Deposit amount must be positive') {
        console.log('Scenario 3: Unsuccessful Deposit due to Negative Amount - Passed');
    } else {
        console.log('Scenario 3: Unsuccessful Deposit due to Negative Amount - Failed');
    }
}

// Scenario 3: Unsuccessful Deposit due to Zero Amount
try {
    bank.deposit(1234567890, 0); // Zero deposit amount
    console.log('Scenario 3: Unsuccessful Deposit due to Zero Amount - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Deposit amount must be positive') {
        console.log('Scenario 3 (Zero Amount): Unsuccessful Deposit - Passed');
    } else {
        console.log('Scenario 3 (Zero Amount): Unsuccessful Deposit - Failed');
    }
}

// Withdraw Money tests
console.log('Withdraw Money tests. Account - 1234567891');
// Scenario 1: Success
try {
    const newBalance = bank.withdraw(1234567891, 2000); // Withdraw 2000 from account 1234567891
    if (newBalance === 8000) { // Previous balance: 10000
        console.log('Scenario 1: Successful Withdrawal - Passed');
    } else {
        console.log('Scenario 1: Successful Withdrawal - Failed');
    }
} catch (e) {
    console.log('Scenario 1: Successful Withdrawal - Failed');
}

// Scenario 2: Failure due to Insufficient Balance
try {
    bank.withdraw(1234567891, 15000); // Attempt to withdraw more than the balance
    console.log('Scenario 2: Withdrawal failure due to Insufficient Balance - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Insufficient balance') {
        console.log('Scenario 2: Withdrawal failure due to Insufficient Balance - Passed');
    } else {
        console.log('Scenario 2: Withdrawal failure due to Insufficient Balance - Failed');
    }
}

// Scenario 3: Failure due to Invalid Account
try {
    bank.withdraw(9999999999, 1000); // Non-existent account ID
    console.log('Scenario 3: Withdrawal failure due to Invalid Account - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Account not found') {
        console.log('Scenario 3: Withdrawal failure due to Invalid Account - Passed');
    } else {
        console.log('Scenario 3: Withdrawal failure due to Invalid Account - Failed');
    }
}

// Scenario 4: Failure due to Invalid Amount (Negative)
try {
    bank.withdraw(1234567891, -500); // Negative withdrawal amount
    console.log('Scenario 4 (Negative Amount): Withdrawal failure due to Invalid Amount - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Withdrawal amount must be positive') {
        console.log('Scenario 4 (Negative Amount): Withdrawal failure due to Invalid Amount - Passed');
    } else {
        console.log('Scenario 4 (Negative Amount): Withdrawal failure due to Invalid Amount - Failed');
    }
}

// Scenario 4: Failure due to Invalid Amount (Zero)
try {
    bank.withdraw(1234567891, 0); // Zero withdrawal amount
    console.log('Scenario 4 (Zero Amount): Withdrawal failure due to Invalid Amount - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Withdrawal amount must be positive') {
        console.log('Scenario 4 (Zero Amount): Withdrawal failure due to Invalid Amount - Passed');
    } else {
        console.log('Scenario 4 (Zero Amount): Withdrawal failure due to Invalid Amount - Failed');
    }
}

// Check Balance tests
console.log('Check Balance tests.');
// Scenario 1: Success (Balance Check for Account 1234567891)
try {
    const balance = bank.checkBalance(1234567891); // Check balance for account 1234567891
    if (balance === 8000) { // Expected balance after withdrawal tests
        console.log('Scenario 1: Check balance for Account 1234567891 - Passed');
    } else {
        console.log(`Scenario 1: Failed for Account 1234567891. Expected 8000, but got ${balance}`);
    }
} catch (e) {
    if (e instanceof Error) {
        console.log(`Scenario 1: Failed for Account 1234567891 with error: ${e.message}`);
    } else {
        console.log('Scenario 1: Failed for Account 1234567891');
    }
}

// Scenario 2: Success (Balance Check for Account 1234567890)
try {
    const balance = bank.checkBalance(1234567890); // Check balance for account 1234567890
    if (balance === 6500) { // Expected balance after withdrawal tests
        console.log('Scenario 1: Check balance for Account 1234567890 - Passed');
    } else {
        console.log(`Scenario 1: Failed for Account 1234567890. Expected 6500, but got ${balance}`);
    }
} catch (e) {
    if (e instanceof Error) {
        console.log(`Scenario 1: Failed for Account 1234567890 with error: ${e.message}`);
    } else {
        console.log('Scenario 1: Failed for Account 1234567890');
    }
}

// Scenario 3: Failure due to Invalid Account
try {
    bank.checkBalance(9999999999); // Non-existent account ID
    console.log('Scenario 2: Failure due to Invalid Account - Failed');
} catch (e) {
    if (e instanceof Error && e.message === 'Account not found') { // Type assertion and message check
        console.log('Scenario 2: Failure due to Invalid Account - Passed');
    } else {
        console.log('Scenario 2: Failure due to Invalid Account - Failed');
    }
}